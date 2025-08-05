import { Component } from "react";
import Table from "./table";
import { SignalRContext } from "../playerssocket";

class MyTeam extends Component {
  static contextType = SignalRContext;
    constructor(props) {
        super(props)
        this.state = {
            players: null,
            tableOn: false,
        };
        this.subscribed = false;
    }

    componentDidMount(){
        this.trySubscribe();
      }
    componentDidUpdate(){
      this.trySubscribe();
    }
      
      trySubscribe() {
        const connection = this.context;
        if (connection && typeof connection.on === 'function' && !this.subscribed) {
          connection.on("ReceiveTeamPlayers", (p) => this.setPlayers(p));
          connection.on("PlayerDrafted", ()=>{connection.invoke("GetTeamPlayers", parseInt(localStorage.getItem("teamID")))})
          this.subscribed = true;
          console.log("Subscribed to SignalR");
          connection.invoke("GetTeamPlayers", parseInt(localStorage.getItem("teamID")));
        }
      }
      componentWillUnmount(){
        const connection = this.context;
        if(this.subscribed){
        connection.off("ReceiveTeamPlayers");
        connection.off("ReceiveAllTeams");
        }
      }

      setPlayers(pString){
        var pObj = JSON.parse(pString);
        this.setState({ players:  pObj }, () => {
            this.setState({ tableOn: true});
        });
      }

    render() {
        return (
            <div>
              {this.state.tableOn?
                <Table players={this.state.players} />
                :<></>

    }
            </div>
        )
    }
} export default MyTeam