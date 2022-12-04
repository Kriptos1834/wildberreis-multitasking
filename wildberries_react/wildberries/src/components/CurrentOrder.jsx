import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

const CurrentOrder = React.forwardRef((props, ref) => {
    const [{ x }, api] = useSpring(() => ({ x: 0 }))

    const bind = useDrag(({ active, movement: [mx], cancel }) => {
        const triggerOffset = 200
        const durationMs = 200
        if (mx > triggerOffset) {
            cancel()
            setTimeout(props.onDismiss, durationMs)
            api.start({ from: { x: mx }, to: { x: 2000 }, config: { duration: durationMs } })
        } else {
            api.start({ x: active ? mx : 0, immediate: active })
        }
    }, { bounds: { left: 0 } })

    return (
        <div ref={ref} className="flipMove_wrapper">
            <animated.div
                {...bind()}
                style={{ x, touchAction: 'pan-y' }}
                className={"order__item current"}
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
            </animated.div>
        </div>
    )
})

export default CurrentOrder