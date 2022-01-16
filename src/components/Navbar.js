//navbar

import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
                    <div className='navbar-brand col-sm-3 col-md-3 mr-0' style={{color:'white'}}>
                      NFT-Space
                    </div>
                    <ul className='navbar-nav px-3'>
                        <li className='nav-item text-nowrapd-none d-sm-none d-sm-block'>
                            <small className='text-white'>
                                <Link to="/">Home</Link>
                            </small>
                        </li>
                    </ul>

                    <ul className='navbar-nav px-3'>
                        <li className='nav-item text-nowrapd-none d-sm-none d-sm-block'>
                            <small className='text-white'>
                            <Link to="/market">Market</Link>
                            </small>
                        </li>
                    </ul>

                    <ul className='navbar-nav px-3'>
                        <li className='nav-item text-nowrapd-none d-sm-none d-sm-block'>
                            <small className='text-white'>
                            <Link to="/minting">Minting</Link>
                            </small>
                        </li>
                    </ul>
                    
                    
                    
                    
                    <ul className='navbar-nav px-3'>
                        <li className='nav-item text-nowrapd-none d-sm-none d-sm-block'>
                            <small className='text-white'>
                                {this.props.account}
                            </small>
                        </li>
                    </ul>
                 </nav>

            </div>
        )
    }
}
