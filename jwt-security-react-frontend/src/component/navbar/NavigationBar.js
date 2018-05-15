import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavigationBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                    <ul className="navbar-nav">
                        <li className="nav-item" style={{marginRight:'30px'}}>
                            <Link to="/home" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item" style={{marginRight:'30px'}}>
                            <Link to="/add-article" className="nav-link">Add Articles</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default NavigationBar;
