import { Component } from "react";
import '../styles/navbar.css';
import { NavLink } from "react-router-dom";
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
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/draftboard">Draft Board</NavLink>
                    <NavLink to="/myteam">My Team</NavLink>
                    <a href="#" onClick={(e) => { e.preventDefault(); this.props.onLogout(); }} className="logout-link">Logout</a>

                </div>
            </div>
        )
    }
} export default NavBar