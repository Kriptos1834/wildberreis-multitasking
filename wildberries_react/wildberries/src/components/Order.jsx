import React from 'react'

const Order = React.forwardRef((props, ref) => {
    return (
        <div className="flipMove_wrapper" ref={ref}>
            <div
                className={"order__item"}
            >
                <div className="order__info">
                    <p className="order_cell">
                        {props.order.cell}
                    </p>
                    <p className="items_qty">
                        Вещей в ячейке:
                        <strong className='qty'>{props.order.items.length}</strong>
                    </p>
                </div>
            </div>
        </div>
    )
})


export default Order