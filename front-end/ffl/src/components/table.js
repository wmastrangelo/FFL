import React, {Component} from 'react';
import axios from 'axios';
class Table extends Component{

    constructor(props) {
        super(props);

        this.state = {
            headers : [],
            players: [],
            display: [],
            selectedPOS: '',
        }
    }
    componentDidMount(){
       this.loadPlayers(true);
       setInterval(() => {
        this.loadPlayers(false);
       }, 2000);
    }

    selected = (e) =>{
        this.setState({selectedPOS: e.target.value})
        var holding = []
        if (e.target.value === 'none'){
            this.setState({display: this.state.players})
            
        } else {
        this.state.players.map( (player) => {
            if(player[4].includes(e.target.value)) {
                holding.push(player)
            }
        })
        this.setState({display: holding})
        }
    }
   

    loadPlayers(first){
        axios
        .get(`http://localhost:9876/allplayers`)
        .then(res => {
                  this.setState({headers: res.data.shift()})
                  
                  this.setState({players: res.data})
                  if(first) {
                  this.setState({display: this.state.players})
                  }
              }
          )
        .catch(err => console.error(err));

        if(this.state.selectedPOS !== 'none' && !first){
            var holding = []
            this.state.players.map( (player) => {
                if(player[4].includes(this.state.selectedPOS)) {
                    holding.push(player)
                }
            })
            this.setState({display: holding})
        }
    }

    render(){
        return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{this.state.headers[0]}</th>
                        <th>{this.state.headers[1]}</th>
                        <th>{this.state.headers[2]}</th>
                        <th>{this.state.headers[3]}</th>
                        <th>
                            <select name="position" id="position" onChange={this.selected}>
                                <option value="none">POS</option>
                                <option value="RB">RB</option>
                                <option value="WR">WR</option>
                                <option value="QB">QB</option>
                                <option value="TE">TE</option>
                            </select>
                        </th>
                        <th>{this.state.headers[6]}</th>
                        <th>{this.state.headers[7]}</th>
                        <th>{this.state.headers[8]}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.display.map(player =>
                            <tr>
                                <td>{player[0]}</td>
                                <td>{player[1]}</td>
                                <td>{player[2]}</td>
                                <td>{player[3]}</td>
                                <td>{player[4]}</td>
                                <td>{player[6]}</td>
                                <td>{player[7]}</td>
                                <td>{player[8]}</td>
                            </tr>

                        )
                    }
                    
                </tbody>
            </table>
        </div>
        )
    }

} export default Table;