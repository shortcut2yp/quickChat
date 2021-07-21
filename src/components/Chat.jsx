import React, { useState } from 'react'
import ChatBody from './ChatBody'
import ChatContainer from './ChatContainer'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'

const Chat = ({ user, users, message, messages, sendMessage, setMessage }) => {
	const [selectedUser, setselectedUser] = useState({})
	const selectUser = user => {
		setselectedUser(user)
	}
	return (
		<ChatContainer>
			<div className="d-flex flex-column col-4 col-lg-4 col-xl-4 pe-0 border-right-info">
				<div className="align-items-start py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
					<div className="d-flex align-items-center py-1">
						<div className="position-relative">
							<img
								className="rounded-cicle mx-2"
								src="https://bootdey.com/img/Content/avatar/avatar2.png"
								alt={user.username}
								width="40"
								height="40"
							/>
						</div>
						<div className="flex-grow-1">{user.username}</div>
					</div>
				</div>
				<div className="text-center bg-primary text-white">Connected Users</div>
				{users.length > 0 ? (
					users.map((user, index) => {
						return (
							<div
								key={index}
								className="py-2 px-2 border-bottom border-info d-lg-block cursor-pointer"
								onClick={() => selectUser(user)}
							>
								<div className="d-flex align-items-center py-1">
									<div className="d-flex flex-column position-relative">
										<img
											className="rounded-cicle mx-2"
											src={`https://bootdey.com/img/Content/avatar/avatar${
												index + 1
											}.png`}
											alt={user.username}
											width="45"
											height="45"
										/>
										<span
											className={user.connected ? 'online' : 'offline'}
										></span>
									</div>
									<div className="d-flex flex-row position-relative w-100">
										<strong>{user.username}</strong>
									</div>
								</div>
							</div>
						)
					})
				) : (
					<div className="d-flex justify-content-center align-items-center chat-window">
						No Users Connected
					</div>
				)}
			</div>
			{selectedUser.userId && (
				<div className="d-flex flex-column col-8 colg-lg-8 col-xl-8 ps-0 chat-window">
					<ChatHeader user={selectedUser} />
					<ChatBody user={user} messages={messages} />
					<ChatInput
						message={message}
						sendMessage={sendMessage}
						setMessage={setMessage}
					/>
				</div>
			)}
		</ChatContainer>
	)
}

export default Chat
