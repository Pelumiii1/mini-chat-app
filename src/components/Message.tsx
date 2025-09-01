import React from 'react';

interface MessageProps {
  user: string;
  text: string;
  currentUser: string;
}

const Message: React.FC<MessageProps> = ({ user, text, currentUser }) => {
  const isCurrentUser = user === currentUser;
  const messageClass = isCurrentUser ? 'message current-user' : 'message';

  return (
    <div className={messageClass}>
      {!isCurrentUser && <div className="user">{user}</div>}
      <div className="message-bubble">{text}</div>
    </div>
  );
};

export default Message;
