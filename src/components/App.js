import React, { Component } from 'react';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/KryptoBird.json';
import './App.css';
import {MDBCard , MDBCardTitle , MDBCardImage , MDBBtn ,MDBCardBody , MDBCardText} from 'mdb-react-ui-kit';

export default class App extends Component {

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

    }


    render() {
        return (
            <div>
                {/* checking for the totalSupply */}
                {/* {console.log(this.state.KryptoBirdz)} */}


                {/* navbar */}
                <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
                    <div className='navbar-brand col-sm-3 col-md-3 mr-0' style={{color:'white'}}>
                      Krypto-Birdz
                    </div>
                    <ul className='navbar-nav px-3'>
                        <li className='nav-item text-nowrapd-none d-sm-none d-sm-block'>
                            <small className='text-white'>
                                {this.state.account}
                            </small>
                        </li>
                    </ul>
                </nav>


                <br></br>
                <br></br>


                {/* minting form */}
                <div className='container-fluid mt-1'>
                    <div className='row'>
                        <main role='main' className='col-lg-12 d-flex text-center'>
                            <div className='content mr-auto ml-auto' style={{opacity:'0.8'}}>
                                <h1 style={{color:'black'}}> KryptoBirdz - NFT Marketplace</h1>
                                    <form onSubmit={(event)=>{
                                        event.preventDefault();

                                        //kryptoBird takes the value from input ref (line 126) and then its value is passed 
                                        const kryptoBird = this.kryptoBird.value;
                                        console.log(kryptoBird);
                                        this.mint(kryptoBird);
                                    }}>
                                        <input
                                            type='text'
                                            placeholder='Add a file location'
                                            className='form-control mb-1'
                                            ref={(input)=>this.kryptoBird = input}
                                        />
                                        <input 
                                            style={{margin:'6px'}}
                                            type='submit'
                                            className='btn btn-primary btn-black'
                                            value='MINT'
                                        />
                                    </form>
                            </div>
                        </main>
                    </div>

                        <hr></hr>
                        <hr></hr>

                        {/* Cards */}

                        <div className='row textCenter'>
                            {this.state.KryptoBirdz.map((kryptoBird, key)=>{
                                return(
                                    <div >
                                        <div>
                                            <MDBCard className='token img' style={{maxWidth:'22rem'}}>
                                            <MDBCardImage src={kryptoBird}  position='top' height='250rem' style={{marginRight:'4px'}} />
                                            <MDBCardBody>
                                            <MDBCardTitle> KryptoBirdz </MDBCardTitle> 
                                            <MDBCardText> The KryptoBirdz are 20 uniquely generated KBirdz from the cyberpunk cloud galaxy Mystopia! There is only one of each bird and each bird can be owned by a single person on the Ethereum blockchain. </MDBCardText>
                                            <MDBBtn href={kryptoBird}>Download</MDBBtn>
                                            </MDBCardBody>
                                            </MDBCard>
                                             </div>
                                    </div>
                                )
                            })} 
                        </div>
                </div>
            </div>
        )
    }
}
