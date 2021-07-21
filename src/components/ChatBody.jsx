import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
const ChatBody = ({ user, messages }) => {
	return (
		<div className="position-relative overflow-auto chat-height">
			<ScrollableFeed>
				<div className="p-4 d-flex flex-column">
					{messages.map((message, index) => {
						console.log('Message is ' + JSON.stringify(message))
						console.log('user is ' + JSON.stringify(user))
						return message.type === 'userStatus' ? (
							<div key={index} className="text-center">
								{/* <span className="badge bg-info">
									{message.userId === user.userId
										? 'You have now joined the room!'
										: `${message.username} has now joined the room !`}
								</span> */}
							</div>
						) : (
							<div
								key={index}
								className={
									message.userId === user.userId
										? 'chat-message-right pb-4'
										: 'chat-message-left pb-4'
								}
							>
								<div>
									<img
										src="https://bootdey.com/img/Content/avatar/avatar2.png"
										alt={message.username}
										className="rounded-circle mr-1"
										title={message.username}
										width="40"
										height="40"
									/>
									<div className="text-muted small text-nowrap mt-2">
										12:00 AM
									</div>
								</div>
								<div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div className="fw-bold mb-1">
										{message.userId === user.userId ? 'You' : message.username}
									</div>
									{message.message}
								</div>
							</div>
						)
					})}
				</div>
			</ScrollableFeed>
		</div>
	)
}

export default ChatBody
