import React, {Component} from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import '../dialog.css';

class DraftDialog extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedTeam: null,
        }

    }
    
    setSelectedTeam(id) {
        this.setState({selectedTeam: parseInt(id)});
    }

    render(){
        const styles = {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            width: "60vw",
            position: "fixed",
            left: "20vw",
            right: "20vw",
            justifyItems: "center",
            border:"1px dotted black",
            height: "auto",
        }
        const wrapper = {
            display: "flex",
            flexDirection: "column",
            marginBottom: "5vh"
        }

        return (
            <div id='dialog_wrapper' style={styles}>
                <Icon id="dialog_close" path={mdiClose} size={1} color="red" onClick={this.props.closedialog}></Icon>
                <div style={wrapper}>
                {this.props.teams.map((team, i) =>
                    <div key={"div"+i}>
                    <label key={"label" + i}>{team}</label>
                    <input key={"radio" + i} type='radio' name={team} value={i} checked={this.state.selectedTeam === i} onChange={(e) => this.setSelectedTeam(e.target.value)} ></input>
                    </div>
                )}
                <button style={{marginTop: "5vh", marginBottom: "1vh"}} onClick={this.props.closedialog}>Cancel</button>
                <button onClick={()=> this.props.draftplayer(this.state.selectedTeam)}>Draft</button>
                </div>
            </div>
        )
    }


} export default DraftDialog;