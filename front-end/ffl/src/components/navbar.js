import { Component } from "react";
import '../styles/navbar.css';
import { Link } from "react-router-dom";
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
                    <Link to="/">Home</Link>
                    <Link to="/draftboard">Draft Board</Link>
                    <Link to="/myteam">My Team</Link>
                    <Link onClick={this.props.onLogout}>Logout</Link>

                </div>
            </div>
        )
    }
} export default NavBar