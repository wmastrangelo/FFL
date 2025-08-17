import React, {Component, useEffect} from 'react';

class Table extends Component{

    constructor(props) {
        super(props);

        this.state = {
            headers : [],
            display: [],
            selectedPOS: '',
        }
    }
    componentDidMount(){
        this.setState({display: this.props.players})
    }

    componentDidUpdate(prevProps){
        if (prevProps.players !== this.props.players){
            this.setState({display: this.props.players})

        }
    }

    selected = (e) =>{
        this.setState({selectedPOS: e.target.value})
        var holding = []
        if (e.target.value === 'none'){
            this.setState({display: this.props.players})
            
        } else if (e.target.value === 'FLEX') {
            this.props.players.map( (player) => {
            if (player.POS.includes('WR') || player.POS.includes('TE') || player.POS.includes('RB')){
                holding.push(player)
            }
         })
         this.setState({display: holding})
        }
        else {
        this.props.players.map( (player) => {
            if(player.POS.includes(e.target.value)) {
                holding.push(player)
            }
        })
        this.setState({display: holding})
        }
    }

    openDraftDialog(rank){
        this.props.openDraftDialog(rank);
    }
   

    render(){
        console.log("table hit")
        return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Bye</th>
                        <th>
                            <select name="position" id="position" onChange={this.selected}>
                                <option value="none">POS</option>
                                <option value="QB">QB</option>
                                <option value="RB">RB</option>
                                <option value="WR">WR</option>
                                <option value="TE">TE</option>
                                <option value="FLEX">FLEX</option>
                                <option value="K">K</option>
                                <option value="DST">D/ST</option>
                            </select>
                        </th>
                        <th>ESPN</th>
                        <th>RTSports</th>
                        <th>NFL</th>
                        <th>Sleeper</th>
                        <th>Fantrax</th>
                        <th>AVG</th>
                        {localStorage.getItem("admin") && <th></th>}
                    </tr>
                </thead>
                <tbody>
                       { this.state.display.map(player =>
                            <tr key={player.Rank}>
                                <td>{player.Rank}</td>
                                <td>{player.Name}</td>
                                <td>{player.Team}</td>
                                <td>{player.Bye}</td>
                                <td>{player.POS}</td>
                                <td>{player.ESPN}</td>
                                <td>{player.RTSports}</td>
                                <td>{player.NFL}</td>
                                <td>{player.Sleeper}</td>
                                <td>{player.Fantrax}</td>
                                <td>{player.AVG.toFixed(1)}</td>
                                {(localStorage.getItem("admin")  === "true" && this.props.openDraftDialog != null) &&
                                    <td>
                                        <button onClick={()=>this.openDraftDialog(player.Rank)}>Draft</button>
                                    </td>
                                }
                            </tr>
                       )
                    }
                    
                </tbody>
            </table>
        </div>
        )
    }

} export default Table;