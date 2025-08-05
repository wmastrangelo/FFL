// SignalRContext.js
import React, { createContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export const SignalRContext = createContext(null);

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5207/draft")
      .withAutomaticReconnect()
      .build();

    conn.start()
      .then(() => {
        console.log("SignalR connected");
        setConnection(conn);
      })
      .catch(err => console.error("SignalR connection failed:", err));

    return () => {
      conn.stop();
    };
  }, []);

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
};