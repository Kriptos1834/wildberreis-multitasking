import { useMemo, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderService from "../api/OrderService";
import DetailsPopup from "../components/DetailsPopup";
import OrderLIst from "../components/OrderLIst";
import { OrdersContext } from "../context";
import { useFetching } from "../hooks/useFetching";

import '../styles/conveyor.css'

function Conveyor() {

    const ordersContext = useContext(OrdersContext)
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const [orderDetails, setOrderDetails] = useState()
    const [clearQueue, isClearLoading, error] = useFetching(async () => {
        await OrderService.clear()
    })
    let navigate = useNavigate()


    const closePopup = () => {
        setIsPopupVisible(false)
        document.body.classList.remove('blocked')
        document.querySelector('.order__item.current').classList.remove('popup_format')
    }

    const detailsItems = useMemo(() => {
        if (!orderDetails) {
            return []
        }
        return ordersContext.orders.filter(order => order.cell === orderDetails)[0]['items']
    }, [orderDetails])

    return (
        <div className="Conveyor">
            {ordersContext.orders.length
                ?
                <OrderLIst
                    orders={ordersContext.orders}
                    setOrders={ordersContext.setOrders}
                    setOrderDetails={setOrderDetails}
                    setIsPopupVisible={setIsPopupVisible}
                />
                : <div className="no_orders">
                    <strong>
                        Нет заказов на выдачу
                    </strong>
                </div>
            }
            <DetailsPopup
                isVisible={isPopupVisible}
                items={detailsItems}
                close={closePopup}
            />
            <button className='history_btn btn' onClick={() => {
                navigate('/history')
            }}>
            </button>
            <button className='clear_btn btn' onClick={() => {
                clearQueue()
                ordersContext.setOrders([])
            }}>
            </button>
        </div >
    );
}

export default Conveyor;
