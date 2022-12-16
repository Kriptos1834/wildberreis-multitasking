import React from 'react';
import FlipMove from 'react-flip-move';
import CurrentOrder from './CurrentOrder';
import Order from './Order';
import { useContext } from 'react';
import { OrdersContext } from '../context';
import { useFetching } from '../hooks/useFetching';
import OrderService from '../api/OrderService';

const OrderLIst = ({ orders, setOrders, setOrderDetails, setIsPopupVisible, ...props }) => {
    const { orderHistory, setOrderHistory } = useContext(OrdersContext)
    const [fetchOrderIssue, isIssueLoading, issuingError] = useFetching(async (orderId) => {
        const respose = await OrderService.issue(orderId)
        if (issuingError)
            console.error(issuingError)
    })

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

    const onSwipe = (orderId) => {
        setOrderHistory([{...orders[0], issuing_time: new Date()}, ...orderHistory,])
        setOrders(orders.slice(1))
        fetchOrderIssue(orderId)
        console.log('ON SWIPE TRIGGERED')
    }

    return (
        <FlipMove className="order__list" leaveAnimation='none'>
            {
                orders.map(order =>
                    orders.indexOf(order) === 0
                        ? <CurrentOrder
                            order={order}
                            onSwipe={onSwipe}
                            displayPopup={displayPopup}
                            key={order.id}
                        />
                        : <Order order={order} key={order.id} />
                )
            }
        </FlipMove >
    );
}

export default OrderLIst;
