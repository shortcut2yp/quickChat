import Login from './Login'
import Chat from './Chat'
import React, { useState, useEffect, useCallback } from 'react'

const Main = ({ socket }) => {
	const [newUser, setNewUser] = useState('')
	const [user, setUser] = useState({})
	const [users, setUsers] = useState([])
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])

	const findUser = useCallback(
		userId => {
			const userIndex = users.findIndex(user => user.userId === userId)
			return userIndex >= 0
		},
		[users]
	)

	const checkIfUserExists = useCallback(() => {
		const sessionId = localStorage.getItem('sessionId')
		if (sessionId) {
			socket.auth = { sessionId }
			socket.connect()
		}
	}, [socket])

	const handleConnectionStatus = useCallback(
		(userId, status) => {
			const userIndex = users.findIndex(u => u.userId === userId)
			if (userIndex >= 0) {
				users[userIndex].connected = status
				setUsers([...users])
			}
		},
		[users, setUsers]
	)

	const userConnected = useCallback(
		({ userId, username }) => {
			if (user.userId !== userId) {
				const userExists = findUser(userId)
				if (userExists) {
					handleConnectionStatus(userId, true)
				} else {
					const newUser = { userId, username, connected: true }
					setUsers([...users, newUser])
				}
			}
		},
		[user, users, findUser, setUsers, handleConnectionStatus]
	)

	const userDisconnected = useCallback(
		({ userId }) => handleConnectionStatus(userId, false),
		[handleConnectionStatus]
	)

	useEffect(() => {
		socket.on('users', users => {
			setUsers(users)
		})

		checkIfUserExists()

		socket.on('session', ({ sessionId, userId, username }) => {
			socket.auth = { sessionId }
			localStorage.setItem('sessionId', sessionId)
			setUser({ userId, username })
		})

		socket.on('user connected', user => userConnected(user))
		socket.on('user disconnected', user => userDisconnected(user))
		socket.on('new message', ({ userId, username, message }) => {
			const newMessage = {
				type: 'message',
				userId,
				username,
				message,
			}
			setMessages([...messages, newMessage])
		})
	}, [
		socket,
		user,
		users,
		setUsers,
		findUser,
		messages,
		setMessages,
		checkIfUserExists,
		userConnected,
		userDisconnected,
	])

	function logNewUser() {
		setUser(newUser)
		socket.auth = { username: newUser }
		socket.connect()
	}

	function sendMessage() {
		socket.emit('new message', message)
		const newMessage = {
			type: 'message',
			userId: user.userId,
			username: user.username,
			message,
		}
		setMessages([...messages, newMessage])
		setMessage('')
	}
	return (
		<main className="content">
			<div className="container mt-3">
				{user.userId && (
					<Chat
						user={user}
						users={users}
						message={message}
						messages={messages}
						sendMessage={sendMessage}
						setMessage={setMessage}
					/>
				)}
				{!user.userId && (
					<Login
						setNewUser={setNewUser}
						logNewUser={logNewUser}
						newUser={newUser}
					/>
				)}
			</div>
		</main>
	)
}

export default Main
