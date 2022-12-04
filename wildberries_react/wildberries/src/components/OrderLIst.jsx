import React from 'react';
import FlipMove from 'react-flip-move';
import CurrentOrder from './CurrentOrder';
import Order from './Order';
import { useContext } from 'react';
import { OrdersContext } from '../context';

const OrderLIst = ({ orders, setOrders, setOrderDetails, setIsPopupVisible, ...props }) => {
    const { orderHistory, setOrderHistory } = useContext(OrdersContext)

    const displayPopup = (orderCell) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        setIsPopupVisible(true)
        setOrderDetails(orderCell)
        document.querySelector('.order__item.current').classList.add('popup_format')
        document.body.classList.add('blocked')
    }

    const onSwipe = () => {
        setOrderHistory([{
            ...orders[0],
            issuing_time: `${new Date().toLocaleTimeString().split(':').slice(0, -1).join(':')}`
        }, ...orderHistory,])
        setOrders(orders.slice(1))
    }

    return (
        <FlipMove className="order__list" leaveAnimation='none'>
            {
                orders.map(order =>
                    orders.indexOf(order) === 0
                        ? <CurrentOrder
                            order={order}
                            onDismiss={onSwipe}
                            displayPopup={displayPopup}
                            key={order.cell}
                        />
                        : <Order order={order} key={order.cell} />
                )
            }
        </FlipMove >
    );
}

export default OrderLIst;
