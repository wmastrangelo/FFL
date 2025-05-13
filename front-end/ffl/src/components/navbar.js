import { Component } from "react";
import '../styles/navbar.css';
class NavBar extends Component{

    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="navbar-wrap">
                <div className="navbar-left">
                    <img onClick={this.props.logoClick} className='logo' src="/images/american-football.png" alt="american-football"/>
                </div>
                <div className="navbar-right">
                    <a href="/">Home</a>
                    <a href="/table">Draft Board</a>
                    <a href="/myteam">My Team</a>
                    <a onClick={this.props.onLogout}>Logout</a>

                </div>
            </div>
        )
    }
} export default NavBar