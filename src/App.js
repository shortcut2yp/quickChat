import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import Main from './components/Main'
import { io } from 'socket.io-client'

const socket = io('https://git.heroku.com/quick-chat999.git')

function App() {
	return <Main socket={socket} />
}

export default App
