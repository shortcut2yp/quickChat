import React from 'react'
const ChatHeader = ({ user }) => {
	return (
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
				<div className="flex-grow-1">
					<strong>{user.username}</strong>
				</div>
			</div>
		</div>
	)
}

export default ChatHeader
