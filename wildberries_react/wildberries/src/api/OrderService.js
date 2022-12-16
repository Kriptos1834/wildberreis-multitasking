import axios from 'axios'

const origin = 'https://mkh-wb.ru'
// const origin = 'http://localhost:8000'

export default class OrderService {
    static async getQueue() {
        const response = await axios.get(origin + '/api/orders/queue')
        return response
    }

    static async getHistory() {
        const response = await axios.get(origin + '/api/orders/history')
        return response
    }

    static async issue(id) {
        const response = await axios.get(origin + '/api/orders/issue', {
            params: {
                id: id
            }
        })
        return response
    }

    static async clear() {
        const response = await axios.get(origin + '/api/orders/clear_queue')
        return response
    }
}