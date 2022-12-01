import React, { useRef } from 'react'
import { useSwipeToDismiss } from 'react-swipe-to-dismiss';

const CurrentOrder = React.forwardRef((props, ref) => {
    const siwpeRef = useRef()
    useSwipeToDismiss(siwpeRef, props.onDismis, false, 20, 'right')

    return (

        <div className="flipMove_wrapper" ref={ref}>
            <div
                className={"order__item current"}
                ref={siwpeRef}
                onClick={() => {
                    props.displayPopup(props.order.cell)
                }}
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

export default CurrentOrder