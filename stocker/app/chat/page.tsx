'use client'

import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import { MessagePopulated } from './types';
import ChatHeader from './components/ChatHeader';
import ChatFooter from './components/ChatFooter';
import { UserOutlined as PersonIcon } from '@ant-design/icons';
import { Spin } from "antd";
import { getApi, pingStocker } from '../api';
import useUserStore from '../context/userStore';

export interface ChatMessageProps {
	isLastMessage: boolean;
	message: MessagePopulated;
}

const ChatMessage = ({isLastMessage, message}: ChatMessageProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [content, setContent] = useState("");
	const userStore = useUserStore();

	useEffect(() => {
		message.getContent.then((msg) => {
			setContent(msg)
			setIsLoading(false)
		})
	}, [])

	const user = message.user;
	const createdAt = message.createdAt;

	return (
		<div
		className={`chat__block ${userStore.user === user &&
			'chat__block--sender'} ${user === 'StockerAI' && 'chat__block--bot'}`}
		>
		<div className="message__block">
			<div className="chat__message">
				{
					isLoading 
						? <Spin />
						: <>{content}</>
				}
			</div>
		</div>
		<span className="chat__timestamp">{createdAt.toString()}</span>
	</div>
	);
}

export interface ChatProps {
	user: string;
}

const Chat = ({ user }: ChatProps) => {
	const userStore = useUserStore();
	const [ messages, setMessages ] = useState([
	{
		createdAt: new Date(), 
		user: "StockerAI",
		getContent: new Promise((resolve, reject) => 
			resolve("Hello! This is StockerAI, your friendly neighbour trade recommender."))
	}
	] as MessagePopulated[]);

	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	const userAddNewMessage = (message: MessagePopulated) => {
		const newMessages = [...messages]
		const msgFromStocker: MessagePopulated = {
			user: "StockerAI",
			createdAt: message.createdAt,
			getContent: new Promise((resolve, reject) => {
				pingStocker(message.content, "low", "short", ["APPL"], ["Healthcare"]).then(data => resolve(data)).catch(err => resolve(err))
			}),
			content: "",
		}
		newMessages.push(message)
		newMessages.push(msgFromStocker)
		setMessages(newMessages)
	}

	return (
		<div className="chat">
			<ChatHeader messages={messages} />
			<div className="chat__body">
				<div className="chat__main">
					{messages.map((message, i) => {
						return (
							<ChatMessage 
							message={message} 
							isLastMessage={messages.length - 1 === i} 
							key={i}/>
						);
					})}
				</div>
			</div>
			<ChatFooter roomCode={user} loggedInUser={userStore.user} addNewMessage={userAddNewMessage}/>
		</div>
	);
};

export default Chat;
