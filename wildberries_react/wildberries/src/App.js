import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrdersContext } from "./context";
import History from "./pages/History";
import Conveyor from "./pages/Сonveyor";
import { useWebSocket } from "./hooks/useWebSocket";
import useSound from 'use-sound'
import sound from './assets/audio/correct-answer.wav'

function App() {
	const [orderHistory, setOrderHistory] = useState([])
	const [orders, setOrders] = useState([])
	const [wsMessage, setWsMessage] = useState(null)
	const [playNotification] = useSound(sound)

	useWebSocket(`${window.location.protocol.includes('https') ? 'wss' : 'ws'}://${window.location.hostname}:8000/ws/office`,
		(e) => {
			setWsMessage(JSON.parse(e.data))
		})

	useEffect(() => {
		if (wsMessage) {
			const newOrder = wsMessage.data
			if (orders.filter(order => order.cell === newOrder.cell).length)
				return

			if (orderHistory.filter(order => (order.cell === newOrder.cell) && (new Date(order.issuing_time) - new Date <= 60 * 60 * 1000)).length)
				return

			// if (!orders.filter(order => order.cell === newOrder.cell).length) {
			// 	console.log('playing')
			playNotification()
			setOrders([...orders, newOrder])
			// } else if (orderHistory.filter())
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