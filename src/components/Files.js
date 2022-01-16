//frontend-backend area

import React, { Component } from 'react';
import MarketPlace from './MarketPlace';
import Navbar from './Navbar';
import Web3 from 'web3';
import detectEthereumProvider from "@metamask/detect-provider";
import Marketplace from '../abis/Marketplace.json';
// import { NFTStorage, File } from 'nft.storage';
import './App.css';


const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });




// const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU2NGI0NjlFYTVlZTIxODNiNDQxNTUwMWRCQWYxNzBiQjdDYTkxOGMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNjg1Njg2OTkzMiwibmFtZSI6IkZvb3RwcmludCJ9.QMxvqcHpZJghwlDwMtM4Sfi4_rrAEhljRNrkTDuo1kg'
// const client = new NFTStorage({ token: apiKey })







export default class Files extends Component {


    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
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
        const networkData = Marketplace.networks[networkId];
        if(networkData){
            const abi = Marketplace.abi;

            //contract address
            const address = networkData.address; 
            const contract = new web3.eth.Contract(abi,address);
            this.setState({contract});
            console.log(this.state.contract);

            //total Files in Marketplace
            const filesCount = await contract.methods.fileCount().call();
            this.setState({filesCount});
            console.log(this.state.filesCount);

            //array to keep track of tokens
            for(let i = filesCount; i >= 1; i--) {
                const file = await contract.methods.files(i).call();
                console.log(file);
                // handling the state on the front end
                this.setState({
                    files :[...this.state.files, file]
                })
            }
            console.log(this.state.files);
        }
        else{
            window.alert("Smart Contract Not Deployed");
        }
    }
    
      // Get file from user
      captureFile = event => {
        event.preventDefault();
    
        const file = event.target.files[0];
        const reader = new window.FileReader();
    
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
          this.setState({
            buffer: Buffer(reader.result),
            type: file.type,
            name: file.name
          })
          console.log('buffer', this.state.buffer)
        }
      }
    
      uploadFile = description => {
        console.log("Submitting file to IPFS...");
    
        // Add file to the IPFS
        ipfs.add(this.state.buffer, (error, result) => {
          console.log('IPFS result', result.size);
          if(error) {
            console.error(error);
            return
          }
    
          this.setState({ loading: true })
          // Assign value for the file without extension
          if(this.state.type === ''){
            this.setState({type: 'none'});
          }
          this.state.contract.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({
             loading: false,
             type: null,
             name: null
           })
           window.location.reload()
          }).on('error', (e) =>{
            window.alert('Error')
            this.setState({loading: false})
          })
        })
      }


    //   uploadFiles = (description) => {
    //     const data = this.state.buffer;
    //   async function getMetadata() {
    //     console.log('metadata')
    //     const metadata = await client.store({
    //       name: "demo",
    //       description: description,
    //       image: new File(data, 'trial.jpg', { type: 'image/jpg' }),
    //       properties: {
            
  
    //       },
    //     });
    //     console.log('metadata', metadata)
    //     return metadata.url
  
    //   }
    //   const metadata = getMetadata();
    // console.log(metadata)
    // metadata.then(async (value) => {
    //   this.setState({ flag: true });
    // })
    // }




    
      constructor(props) {
        super(props)
        this.state = {
          account: '',
          contract : null,
          files: [],
          loading: false,
          type: null,
          name: null
        }
        this.uploadFile = this.uploadFile.bind(this)
        this.captureFile = this.captureFile.bind(this)
      }



    render() {
        return (
            <div>
                <Navbar account={this.state.account} />
                { this.state.loading
                ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                : <MarketPlace
                    files={this.state.files}
                    captureFile={this.captureFile}
                    uploadFile={this.uploadFile}
                    />
                }
            </div>
        )
    }
}
