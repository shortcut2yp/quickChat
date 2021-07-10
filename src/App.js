import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import Main from './components/Main'
import { io } from 'socket.io-client'

const socket = io('https://quick-chat999.herokuapp.com/')

function App() {
	return <Main socket={socket} />
}

export default App
