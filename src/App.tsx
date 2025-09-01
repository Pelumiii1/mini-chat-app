import { useEffect, useState } from "react";
import "./App.css";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import SubscriptionPage from "./components/SubscriptionPage";

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("chat_user");
    const storedSubscription = localStorage.getItem("chat_subscription");

    if (storedUser) {
      setUser(storedUser);
    }

    if (storedSubscription === "true") {
      setIsSubscribed(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
    localStorage.setItem("chat_user", username);
  };

  const handleSubscription = () => {
    setIsSubscribed(true);
    localStorage.setItem("chat_subscription", "true");
  };

  return (
    <div className="app">
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : !isSubscribed ? (
        <SubscriptionPage onSubscribe={handleSubscription} />
      ) : (
        <ChatPage username={user} />
      )}
    </div>
  );
}

export default App;
