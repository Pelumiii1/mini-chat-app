import React from 'react';

interface SubscriptionPageProps {
  onSubscribe: () => void;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onSubscribe }) => {
  return (
    <div className="subscription-page">
      <div className="subscription-box">
        <h2>Subscribe to Mini Chat</h2>
        <p>You need to subscribe to access the chat.</p>
        <button onClick={onSubscribe}>Subscribe Now</button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
