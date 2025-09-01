import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';

interface ChatPageProps {
  username: string;
}

interface MessageData {
  id: number;
  user: string;
  text: string;
}

const ChatPage: React.FC<ChatPageProps> = ({ username }) => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chat_messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleSendMessage = (text: string) => {
    const newMessage: MessageData = {
      id: Date.now(),
      user: username,
      text: text,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('chat_messages', JSON.stringify(updatedMessages));
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setTypingUser(null);
  };

  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setTypingUser(username);
    typingTimeoutRef.current = window.setTimeout(() => {
      setTypingUser(null);
    }, 1500);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">Mini Chat App</div>
      <div className="messages-container">
        {messages.map((msg) => (
          <Message key={msg.id} user={msg.user} text={msg.text} currentUser={username} />
        ))}
        {typingUser && typingUser !== username && <div className="typing-indicator">{typingUser} is typing...</div>}
      </div>
      <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
};

export default ChatPage;