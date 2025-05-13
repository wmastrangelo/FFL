import { Component } from "react";
import * as signalR from "@microsoft/signalr";

class MyTeam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: null
        };
        this.conn = null;
    }

    componentDidMount(){
        this.conn = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5207/players")
        .withAutomaticReconnect()
        .build();
        
    /*conn.on("ReceiveMessage", (user, message) => {
      setMessages(prev => [...prev, { user, message }]);
    });*/
     this.conn.on("ReceiveTeamPlayers", (p) => {
        this.setState({players: p})
    });

    this.startConnection();
    }
    async startConnection() {
        try {
          await this.conn.start();
          console.log("SignalR connected");
          await this.conn.invoke("GetTeamPlayers", 1);
        } catch (err) {
          console.error("Connection error:", err);
        }
      }
      
      componentWillUnmount() {
        if (this.conn) {
          console.log("Stopping connection...");
          this.conn.stop();
        }
      }

    render() {
        return (
            <div>
                <h1>{this.state.players}</h1>
            </div>
        )
    }
} export default MyTeam