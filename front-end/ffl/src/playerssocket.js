// SignalRContext.js
import React, { createContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export const SignalRContext = createContext(null);

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl( `${apiUrl}/draft`)
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