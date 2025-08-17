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
        const connection = this.context;
        if (!connection) return;

        this.subscribeHandlers();

        connection.onreconnected(() => {
            console.log("SignalR reconnected");
            this.subscribeHandlers();
            connection.invoke("GetAvailablePlayers");
            connection.invoke("GetTeams");
        });

        connection.start().catch(err => console.error(err));
    }

    subscribeHandlers() {
        const connection = this.context;
        if (this.subscribed || !connection) return;

        connection.on("ReceiveAvailablePlayers", (p) => {
            console.log("Received players event");  // <-- log here
            this.setPlayers(p);
        });
        connection.on("ErrorPlayers", (m) => this.setState({ message: m }));
        connection.on("ReceiveAllTeams", (t) => this.setState({ teams: JSON.parse(t) }));
        connection.on("PlayerDrafted", () => {
            connection.invoke("GetAvailablePlayers");
        });

        this.subscribed = true;
        console.log("Subscribed to SignalR events");

        connection.invoke("GetAvailablePlayers");
        connection.invoke("GetTeams");
    }
    setPlayers(pString) {
        var pObj = JSON.parse(pString);
        this.setState({ players: pObj }, () => {
            this.setState({ tableOn: true });
        });
    }
    openDraftDialog(rank) {
        this.setState({ dialogcontrol: true });
        this.setState({ draftingPlayer: rank });

    }
    closeDialog() {
        this.setState({ dialogcontrol: false })
    }

    draftPlayer(id) {
        const connection = this.context
        connection.invoke("DraftPlayer", this.state.draftingPlayer, parseInt(id) + 1);
        this.closeDialog();
    }

    render() {
        return (
            <>
                {this.state.teams && this.state.dialogcontrol && <DraftDialog teams={this.state.teams} closedialog={this.closeDialog} draftplayer={this.draftPlayer} id="dialog" />}
                {this.state.tableOn ?
                    <Table players={this.state.players} openDraftDialog={this.openDraftDialog} /> :
                    <></>
                }
            </>
        )
    }

} export default DraftBoard;