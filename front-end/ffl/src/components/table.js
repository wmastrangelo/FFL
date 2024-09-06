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
        this.openFile();
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
            
        } else if (e.target.value === 'FLEX') {
            this.state.players.map( (player) => {
            if (player[4].includes('WR') || player[4].includes('TE') || player[4].includes('RB')){
                holding.push(player)
            }
         })
         this.setState({display: holding})
        }
        else {
        this.state.players.map( (player) => {
            if(player[4].includes(e.target.value)) {
                holding.push(player)
            }
        })
        this.setState({display: holding})
        }
    }
   

    loadPlayers(first){
        this.openFile();
        var holding = []

        if(first){
            this.setState({display: this.state.players})
        }
        else if (this.state.selectedPOS === 'FLEX' ) {
            this.state.players.map( (player) => {
            if (player[4].includes('WR') || player[4].includes('TE') || player[4].includes('RB')){
                holding.push(player)
            }
         })
         this.setState({display: holding})
        } else if(this.state.selectedPOS !== 'none'){
            this.state.players.map( (player) => {
                if(player[4].includes(this.state.selectedPOS)) {
                    holding.push(player)
                }
            })
            this.setState({display: holding})
        }
    }
     CSVToArray( strData, strDelimiter ){
		// Check to see if the delimiter is defined. If not,
		// then default to comma.
		strDelimiter = (strDelimiter || ",");

		// Create a regular expression to parse the CSV values.
		var objPattern = new RegExp(
			(
				// Delimiters.
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

				// Quoted fields.
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

				// Standard fields.
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
			);


		// Create an array to hold our data. Give the array
		// a default empty first row.
		var arrData = [[]];

		// Create an array to hold our individual pattern
		// matching groups.
		var arrMatches = null;


		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec( strData )){

			// Get the delimiter that was found.
			var strMatchedDelimiter = arrMatches[ 1 ];

			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (
				strMatchedDelimiter.length &&
				(strMatchedDelimiter != strDelimiter)
				){

				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push( [] );

			}


			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[ 2 ]){

				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				var strMatchedValue = arrMatches[ 2 ].replace(
					new RegExp( "\"\"", "g" ),
					"\""
					);

			} else {

				// We found a non-quoted value.
				var strMatchedValue = arrMatches[ 3 ];

			}


			// Now that we have our value string, let's add
			// it to the data array.
			arrData[ arrData.length - 1 ].push( strMatchedValue );
		}

		// Return the parsed data.
		return( arrData );
	}

    async openFile(){
        await fetch('allplayers.csv', {cache: "no-store"})
        .then((res) => res.text())
        .then((text) => {
            let data = this.CSVToArray(text)
            this.setState({headers: data.shift()})
            this.setState({players: data})
        })
        .catch((e) => {
            console.log(e)
        })

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
                                <option value="QB">QB</option>
                                <option value="RB">RB</option>
                                <option value="WR">WR</option>
                                <option value="TE">TE</option>
                                <option value="FLEX">FLEX</option>
                                <option value="K">K</option>
                                <option value="DST">D/ST</option>
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