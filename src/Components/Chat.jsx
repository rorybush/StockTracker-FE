import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { auth } from "../utils/firebase";

const Chat = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState("");

  const addMessage = (data) => {
    console.log(data);
    setMessages([...messages, data]);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("SEND_MESSAGE", {
      author: username,
      message: message,
    });
    setMessage("");
  };

  useEffect(() => {
    if (auth.currentUser) setUsername(auth.currentUser.email);
    const socket = io("https://chat-server-7p03.onrender.com");
    setSocket(socket);
    socket.on("RECEIVE_MESSAGE", (data) => {
      addMessage(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Global Chat</div>
              <hr />
              <div className="messages">
                {messages.map((message, index) => (
                  <div key={index}>
                    <strong>{message.author}: </strong>
                    <span>{message.message}</span>
                  </div>
                ))}
              </div>
              <div className="footer">
                <input
                  type="text"
                  placeholder="Message"
                  className="form-control"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <br />

                <button
                  onClick={sendMessage}
                  className="btn btn-primary form-control"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
