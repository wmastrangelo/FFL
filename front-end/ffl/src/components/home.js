import { Component } from "react";

class HomePage extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div style={{display:"grid", width:"100vw",margin:"0", padding:"0"}}>
                <div>
                   <h2 style={{marginLeft:"45%"}}>Draft Order</h2>
                   <table style={{width:"80%", marginLeft:"10%", fontSize:"1rem", justifyItems:"space-between"}}>
                    <td>Costco Guys</td>
                    <td>Puerto Rico chasteen</td>
                    <td>VB Virgins</td>
                    <td>Beck's Boyz</td>
                    <td>Snatchin A-Chane</td>
                    <td>Roanoke Skinwalkers</td>
                    <td>VA_WockGoblins</td>
                    <td>Atlanta Slime</td>
                    <td>Green Bowl Packers</td>
                    <td>Colorado Crazies</td>
                    <td>Diddy Watson</td>
                    <td>Mr Two Time*</td>
                    </table>
                </div>
                <div style={{marginLeft:"35%", gridColumn:"1"}}>
                    <h2>Closest Margin: </h2>
                    <img src="images/lcvsja.png" width={"50%"}></img>
                    <h4>Week 11, 2024 season</h4>
                </div>
               
                <div>
                    <h2 style={{marginLeft:"45%"}}>Season Stats</h2>
                    <img src="images/seasonstats.png" width={"80%"} style={{marginLeft:"10%"}}></img>
                </div>
                 <div style={{marginLeft:"45%"}}>
                    <img src="images/droz.png" width={"30%"}></img>
                </div>
            </div>
        )
    }


} export default HomePage;