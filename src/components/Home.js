import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <br></br>
                <br></br>
                <main><center><h1 style={{marginTop:"10%"}}>Welcome to NFT-Space</h1></center></main>
                
            </div>
        )
    }
}
