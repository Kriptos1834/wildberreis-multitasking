import React from 'react'
import '../styles/popup.css'

function DetailsPopup({ isVisible, close, items, ...props }) {
    return (
        <div className={"details_popup" + (isVisible ? ' visible' : '')} onClick={close}>
            <div className="popup_content" onClick={e => e.stopPropagation()}>
                <div className="order_items table">
                    <div className="head row">
                        <div className="col">Название</div>
                        <div className="col">ШК</div>
                        <div className="col">Изображение</div>
                    </div>
                    <div className="table_body">
                        {items.map(item =>
                            <div key={item.shk_id || item.sticker_id} className="row">
                                <div className="col">
                                    <span>
                                        {item.name}
                                    </span>
                                </div>
                                <div className="col">
                                    <span>
                                        {item.shk_id}
                                        <br />
                                        {item.sticker_id}
                                    </span>
                                </div>
                                <div className="col">
                                    <img src={item.image_urls[0]} alt="" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsPopup
