import React, { Component } from 'react';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Main from './Main';
import Files from './Files';
import Navbar from './Navbar';
import Home from './Home';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="minting" element={<Main/>} />
                    <Route path="market" element={<Files/>} />
                </Routes>
            </Router>
        )
    }
}
