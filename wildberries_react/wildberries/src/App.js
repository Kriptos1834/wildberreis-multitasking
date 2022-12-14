import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrdersContext } from "./context";
import History from "./pages/History";
import Conveyor from "./pages/Сonveyor";
import { useWebSocket } from "./hooks/useWebSocket";
import useSound from 'use-sound'
import sound from './assets/audio/correct-answer.wav'
import { useFetching } from "./hooks/useFetching";
import OrderService from "./api/OrderService";
import parseOrder from './utils/orders'

function App() {
	const [orderHistory, setOrderHistory] = useState([])
	const [orders, setOrders] = useState([])
	const [wsMessage, setWsMessage] = useState(null)
	const [playNotification] = useSound(sound)

	const [fetchOrdersQueue, isQueueLodaing, queueError] = useFetching(async () => {
		const response = await OrderService.getQueue()
		const queue = response.data //.map(order_data => parseOrder(order_data))
		setOrders(queue)
		if (queueError)
			console.error(queueError)
	})

	const [fetchOrdersHistory, isHistoryLoading, historyError] = useFetching(async () => {
		const response = await OrderService.getHistory()
		const history = response.data //.map(order_data => parseOrder(order_data))
		setOrderHistory(history)
		console.log(history)
		if (historyError)
			console.error(historyError)
	})



	useEffect(() => { 
		fetchOrdersQueue()
		fetchOrdersHistory()
	}, [])

	useWebSocket(`${window.location.protocol.includes('https') ? 'wss' : 'ws'}://${window.location.host}/ws/office`,
	// useWebSocket(`ws://localhost:8000/ws/office`,
		(e) => {
			setWsMessage(JSON.parse(e.data))
		})


	useEffect(() => {
		if (wsMessage) {
			const newOrder = parseOrder(wsMessage.data)

			playNotification()
			setOrders([...orders, newOrder])

		}
	}, [wsMessage])

	return (
		<div className="App">
			<OrdersContext.Provider value={{
				orderHistory,
				setOrderHistory,
				orders,
				setOrders,
			}}>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<Conveyor />}
						>
						</Route>
						<Route
							path="/history"
							element={<History />}
						>

						</Route>
					</Routes>
				</BrowserRouter>
			</OrdersContext.Provider>
		</div >
	);
}

export default App;