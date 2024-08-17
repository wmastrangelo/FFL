import React, {Component} from 'react';

class Table extends Component{

    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.loadTable();
    }
    loadTable(){
        const fs = require("fs");
        const path = "/home/wmastrangelo/FantasyPros_2024_Overall_ADP_Rankings.csv";
       // Read the CSV file
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
             console.error("Error while reading:", err);
            return;
                }
  
    // Split the data into lines
    const lines = data.split("\n");
  
    // Initialize the output array
    const output = [];
  
    // Loop through each line and split it into fields
    lines.forEach((line) => {
      const fields = line.split(",");
      output.push(fields);
    });
  
    // Log the output array
    console.log(output);
  });
    }
    
    render(){
        return(
        <div>
            <h1>
                Hello please check console
            </h1>
        </div>
        )
    }

} export default Table;