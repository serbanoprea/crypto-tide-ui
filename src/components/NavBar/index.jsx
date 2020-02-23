import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";


export default class NavBar extends Component {
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }

    getAnchors(){
        return (
            <>       
            <li><Link to='/insights'>Insighs</Link></li>
            <li><Link to='/login'>Login</Link></li>
            </>
        )
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                    <a href="#!" className="brand-logo">Logo</a>
                    <a href="#" data-target="mobile-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        {this.getAnchors()}
                    </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-nav">
                        {this.getAnchors()}
                </ul>
            </div>
        )
    }
}
