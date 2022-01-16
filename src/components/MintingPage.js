//minting page

import React, { Component } from 'react';
import {MDBCard , MDBCardTitle , MDBCardImage , MDBBtn ,MDBCardBody , MDBCardText} from 'mdb-react-ui-kit';

export default class MintingPage extends Component {
    render() {
        return (
            <div>
                {/* checking for the totalSupply */}
                {/* {console.log(this.state.KryptoBirdz)} */}

                <br></br>
                <br></br>

                {/* minting form */}
                <div className='container-fluid mt-1'>
                    <div className='row'>
                        <main role='main' className='col-lg-12 d-flex text-center'>
                            <div className='content mr-auto ml-auto' style={{opacity:'0.8'}}>
                                <h1 style={{color:'black'}}>Find and Mint NFTs</h1>
                                <br></br>
                                    <form onSubmit={(event)=>{
                                        event.preventDefault();

                                        //kryptoBird takes the value from input ref (line 126) and then its value is passed 
                                        const kryptoBird = this.kryptoBird.value;
                                        console.log(kryptoBird);
                                        this.props.mint(kryptoBird);
                                    }}>
                                        <input
                                            type='text'
                                            placeholder='Enter URL of the file to Mint'
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
                            {this.props.KryptoBirdz.map((kryptoBird, key)=>{
                                return(
                                    <div >
                                        <div>
                                            <MDBCard className='token img' style={{maxWidth:'22rem'}}>
                                            <MDBCardImage src={kryptoBird}  position='top' height='250rem' style={{marginRight:'4px'}} />
                                            <MDBCardBody>
                                            <MDBCardTitle> KryptoBird - {key+1} </MDBCardTitle> 
                                            {console.log(kryptoBird)}
                                            <MDBCardText> The file is Minted !!!</MDBCardText>
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
