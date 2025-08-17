import { Component } from "react";
import Table from "./table";
import { SignalRContext } from "../playerssocket";

class MyTeam extends Component {
  static contextType = SignalRContext;

  constructor(props) {
    super(props);
    this.state = {
      players: null,
      tableOn: false,
    };
    this.subscribed = false;
  }

  componentDidMount() {
    this.trySubscribe();
  }

  componentDidUpdate() {
    this.trySubscribe();
  }

  componentWillUnmount() {
    const connection = this.context;
    if (this.subscribed && connection) {
      connection.off("ReceiveTeamPlayers");
      connection.off("PlayerDrafted");
      this.subscribed = false;
    }
  }

  trySubscribe() {
    const connection = this.context;
    if (connection && typeof connection.on === "function" && !this.subscribed) {
      connection.on("ReceiveTeamPlayers", (p) => {
        console.log("ReceiveTeamPlayers event received");
        this.setPlayers(p);
      });
      connection.on("PlayerDrafted", () => {
        connection.invoke("GetTeamPlayers", parseInt(localStorage.getItem("teamID")));
      });
      this.subscribed = true;
      console.log("Subscribed to SignalR for MyTeam");
      connection.invoke("GetTeamPlayers", parseInt(localStorage.getItem("teamID")));
    }
  }

  setPlayers(pString) {
    try {
      const pObj = JSON.parse(pString);
      this.setState({ players: pObj, tableOn: true });
    } catch (e) {
      console.error("Failed to parse players JSON:", e);
    }
  }

  render() {
    return <div>{this.state.tableOn ? <Table players={this.state.players} /> : <></>}</div>;
  }
}

export default MyTeam;