//backend-frontend area 

import React, { Component } from 'react';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/KryptoBird.json';
import './App.css';
import Navbar from './Navbar';
import MintingPage from './MintingPage';
import MarketPlace from './MarketPlace';

export default class Main extends Component {

    //Lifecycle method
    async componentDidMount(){
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    //to detect an ethereum provider
    async loadWeb3() {
        const provider = await detectEthereumProvider();

        //if there is a provider , then access the window and set web3 to provider
        if(provider){
            console.log("Ethereum Wallet is connected");
            window.web3 = new Web3(provider)
        }
        else{
            console.log("No ethereum wallet detected")
        }
    }

    async loadBlockchainData(){
        const web3 = window.web3;

        //accounts from ganache
        const accounts = await web3.eth.getAccounts();
        this.setState({account : accounts[0]});
        console.log(this.state.account);

        //network configurations
        const networkId = await web3.eth.net.getId();
        const networkData = KryptoBird.networks[networkId];
        if(networkData){
            const abi = KryptoBird.abi;

            //contract address
            const address = networkData.address; 
            const contract = new web3.eth.Contract(abi,address);
            this.setState({contract});
            console.log(this.state.contract);

            //total Supply of KryptoBirdz
            const totalSupply = await contract.methods.totalSupply().call();
            this.setState({totalSupply});
            console.log(this.state.totalSupply);

            //array to keep track of tokens
            for(let i = 1; i <= totalSupply; i++) {
                const KryptoBird = await contract.methods.KryptoBirdz(i - 1).call()
                // handling the state on the front end
                this.setState({
                    KryptoBirdz:[...this.state.KryptoBirdz, KryptoBird]
                })
            }
            console.log(this.state.KryptoBirdz);
        }
        else{
            window.alert("Smart Contract Not Deployed");
        }
    }


    //minting => we are sending information (address and id)
    mint = (kryptoBird) => {
        this.state.contract.methods.mint(kryptoBird).send({from:this.state.account}).once('reciept',(receipt)=>{
            this.setState({
                KryptoBirdz:[...this.state.KryptoBirdz, KryptoBird]
            })
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            account : '',
            contract : null,
            totalSupply:0,
            KryptoBirdz :[]
        }

        this.mint = this.mint.bind(this);

    }


    render() {
        return (
            <div>
                {/* checking for the totalSupply */}
                {/* {console.log(this.state.KryptoBirdz)} */}
                
                {/* navbar */}
                <Navbar account = {this.state.account}></Navbar>

                {/* minting page*/}
                <MintingPage KryptoBirdz={this.state.KryptoBirdz} mint={this.mint} account={this.state.account}></MintingPage>
            </div>
        )
    }
}