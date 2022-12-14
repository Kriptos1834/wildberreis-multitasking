import React, { useContext, useMemo, useState } from 'react';
import { OrdersContext } from '../context';
import { useNavigate } from 'react-router-dom';
import DetailsPopup from '../components/DetailsPopup';

import '../styles/history.css'

const History = () => {
    const orderHistory = useContext(OrdersContext)['orderHistory']
    const [orderDetails, setOrderDetails] = useState()
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    let navigate = useNavigate()

    const closePopup = () => {
        setIsPopupVisible(false)
        document.body.classList.remove('blocked')
    }

    const detailsItems = useMemo(() => {
        if (!orderDetails) {
            return []
        }
        return orderHistory.filter(order => order.cell === orderDetails)[0]['items']
    }, [orderDetails])

    return (
        <div className='History'>
            <div className="table">
                <div className="row head">
                    <div className="col">Номер ячейки</div>
                    <div className="col">Количество предметов</div>
                    <div className="col">Время выдачи</div>
                </div>
                {orderHistory.map(order =>
                    <div className='history__item row' key={order.id}
                        onClick={() => {
                            setOrderDetails(order.cell)
                            setIsPopupVisible(true)
                            document.body.classList.add('blocked')
                        }}
                    >
                        <div className="col"><span>{order.cell}</span></div>
                        <div className="col"><span>{order.items.length}</span></div>
                        <div className="col"><span>{new Date(order.issuing_time).toLocaleTimeString().split(':').slice(0, -1).join(':')}</span></div>
                    </div>
                )}
            </div>
            <button className='back_btn btn' onClick={() => { navigate('/') }}></button>
            <DetailsPopup
                isVisible={isPopupVisible}
                items={detailsItems}
                close={closePopup}
            />
        </div>
    );
}

export default History;
