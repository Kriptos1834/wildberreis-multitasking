const parseOrder = (order_data) => {
        return { ...order_data, items: JSON.parse(order_data.items) }
}

export default parseOrder