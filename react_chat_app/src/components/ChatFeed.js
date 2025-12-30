import React from 'react'; 
import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

const ChatFeed = (props) =>{
    
    const {chats, activeChat, messages, userName}  = props;

    const chat = chats && chats[activeChat]

    const renderReadReceipt = (message, MyMessages) =>{
        return chat.people.map((person, index)=> person.last_read === message.id && (
                <div key={`read-${index}`}
                className ="read-receipt"
                style = { {float: MyMessages? 'right': 'left', backgroundImage: `url(${person?.person?.avatar})`}}
                />
            )
        )
    }

    const renderMessages = () =>{
        const keys = Object.keys(messages)

        return keys.map((key, index) =>{
            const message = messages[key]
            const lastMessage = index=== 0 ? null : keys[index-1]
            const MyMessages = userName === message.sender.username
            console.log("renderMessages", message, lastMessage, MyMessages)
            return (
                <div key ={`mesg_${index}`} style={{ width : '100%' }}>
                    <div className="message-block">
                        {
                            MyMessages ?
                            <MyMessage message={message}></MyMessage> :
                            <TheirMessage message={message} lastMessage ={messages[lastMessage]}></TheirMessage>
                        }
                    </div>
                    <div className="read-receipts" style = {{marginRight: MyMessages ? "18px": "0px", marginLeft : MyMessages? "0px": "68px" }}>
                        { renderReadReceipt(message, MyMessages)}
                    </div>

                </div>
            )
        })
    }

    //if(!chat) return "loading.....";

    return (
        <div className="chat-feed">
            {!chat ? "loading....." :
            <div className="chat-title-container">
                <div className="chat-title">
                    {chat.title}
                </div>
                <div className="chat-subtitle">
                    { chat.people.map((person)=>`${person.person.username}`)}
                </div>
            </div>}
            {renderMessages()}
            <div style={{height:"100px"}}/>
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat}></MessageForm>
            </div>
        </div>
        
            
        
    )

}

export default ChatFeed;
