import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";


export default class NavBar extends Component {
    componentDidMount() {        
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 350
        });
    }

    getAnchors(){
        return (
            <>       
                <li><Link to='/insights'>Insighs</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/overview'>Overview</Link></li>
            </>
        )
    }

    componentWillUnmount(){
        var element = document.querySelector('.sidenav-overlay');
        element.parentNode.removeChild(element);
    }

    render() {
        return (
            <div>
                <nav className='orange'>
                    <div className="nav-wrapper">
                        <a href="#" data-target="nav" className="sidenav-trigger show-on-medium-and-down show-on-large"><i className="material-icons">menu</i></a>
                        <a href="#!" className="brand-logo center">[Logo]</a>
                    </div>
                </nav>

                <ul className="sidenav" id="nav">
                        {this.getAnchors()}
                </ul>
            </div>
        )
    }
}
