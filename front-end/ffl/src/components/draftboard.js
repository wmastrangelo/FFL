import { Component } from "react";
import Table from "./table";
import { SignalRContext } from "../playerssocket";
import DraftDialog from "./draftdialog";


class DraftBoard extends Component {
    static contextType = SignalRContext;
    constructor(props) {
        super(props);
        this.state = {
            players: null,
            message: "",
            tableOn: false,
            teams: null,
            dialogcontrol: false,
            draftingPlayer: 0,
        }
        this.subscribed = false;
        this.openDraftDialog = this.openDraftDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.draftPlayer = this.draftPlayer.bind(this)
    }

    componentDidMount() {
        this.trySubscribe();
    }
    componentDidUpdate() {
        this.trySubscribe();
    }
    componentWillUnmount(){
        const connection = this.context;
        if(this.subscribed){
        connection.off("ReceiveAvailablePlayers");
        connection.off("ErrorPlayers");
        connection.off("ReceiveAllTeams");
        connection.off("PlayerDrafted")
        }
      }
    trySubscribe() {
        const connection = this.context;
        if (connection && typeof connection.on === 'function' && !this.subscribed) {
            connection.on("ReceiveAvailablePlayers", (p) => { this.setPlayers(p) })
            connection.on("ErrorPlayers", (m) => { this.setState({ message: m }) });
            connection.on("ReceiveAllTeams", (t) => {this.setState({teams: JSON.parse(t)})});
            connection.on("PlayerDrafted", (r, tID) => {connection.invoke("GetAvailablePlayers");});
            this.subscribed = true;
            console.log("Subscribed to SignalR");
            connection.invoke("GetAvailablePlayers");
            connection.invoke("GetTeams");
        }
    }

    setPlayers(pString) {
        var pObj = JSON.parse(pString);
        this.setState({ players: pObj }, () => {
            this.setState({ tableOn: true });
        });
    }
    openDraftDialog(rank){
        this.setState({dialogcontrol: true});
        this.setState({draftingPlayer: rank});

    }
    closeDialog(){
        this.setState({dialogcontrol: false})
    }

    draftPlayer(id){
        const connection = this.context
        connection.invoke("DraftPlayer", this.state.draftingPlayer, parseInt(id) + 1);
        this.closeDialog();
    }

    render() {
        return (
            <>
            {this.state.teams &&  this.state.dialogcontrol && <DraftDialog teams={this.state.teams} closedialog={this.closeDialog} draftplayer={this.draftPlayer} id="dialog"/>}
            {this.state.tableOn ?
                <Table players={this.state.players} openDraftDialog={this.openDraftDialog}/> :
                <></>
            }
            </>
        )
    }

} export default DraftBoard;