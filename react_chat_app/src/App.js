import React from 'react';
import './App.css';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';

const App = () => {

	if(! localStorage.getItem('username')) return <LoginForm></LoginForm>
	const username = localStorage.getItem('username')
	const password = localStorage.getItem('password')
	return (
		<ChatEngine
      		height= '100vh'
			projectID='app-id'
			userName={username}
      		userSecret={password}
      		renderChatFeed = {(chatAppProps)=> <ChatFeed {...chatAppProps} /> }
		/>
	);
}

export default App;
