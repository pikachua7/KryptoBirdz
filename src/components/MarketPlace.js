//Files area

import React, { Component } from 'react';
import { convertBytes } from './Helpers';
import './App.css';
import moment from 'moment';
import {MDBCard , MDBCardTitle , MDBCardImage , MDBBtn ,MDBCardBody , MDBCardText} from 'mdb-react-ui-kit';

export default class MarketPlace extends Component {
  render() {
    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              <h2 className="text-white text-Helvetica "><b>Upload Your Work</b></h2>
              <div className="card mb-3 mx-auto" style={{ maxWidth: '512px' }}>
                <br></br>

                <form onSubmit={(event) => {
                  event.preventDefault()
                  const description = this.fileDescription.value
                  this.props.uploadFile(description)
                }} >
                  <div className="input-group mb-3">
                    <br></br>
                    <input type="file" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} className="form-control text-dark text-Helvetica" />
                  </div>
                  <p>&nbsp;</p>
                  <div class="input-group">
                    <span class="input-group-text">Describe</span>
                    <input
                      id="fileDescription"
                      type="text"
                      ref={(input) => { this.fileDescription = input }}
                      className="form-control text-Helvetica"
                      placeholder="Describe your work"
                      required />
                  </div>
                  <p>&nbsp;</p>
                  <button type="submit" className="btn-dark btn-block"><b>Submit Your Work!</b></button>
                </form>
              </div>
              <p>&nbsp;</p>
              {/* <table className="table-sm table-dark table-bordered text-Helvetica" style={{ width: '1000px', maxHeight: '450px' }}>
                <thead style={{ 'fontSize': '15px' }}>
                  <tr className="bg-secondary text-light">
                    
                    <th scope="col" style={{ width: '200px' }}>File</th>
                    <th scope="col" style={{ width: '200px' }}>File Author</th>
                    <th scope="col" style={{ width: '230px' }}>File Description</th>
                    <th scope="col" style={{ width: '120px' }}>File Type</th>
                    <th scope="col" style={{ width: '90px' }}>File Size</th>
                    <th scope="col" style={{ width: '90px' }}>Date Uploaded</th>
                    <th scope="col" style={{ width: '120px' }}>IPFS Link</th>
                  </tr>
                </thead>
                
                
                {this.props.files.map((file, key) => {

                  return (
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr>
                        {console.log(file)}
                        <td style={{ width: '400px', height: '300px' }}><img src={`https://ipfs.infura.io/ipfs/${file.fileHash}`} style={{ width: '400px', height: '300px' }} /></td>
                        <td>{file.uploader}</td>
                        <td>{file.fileDescription}</td>
                        <td>{file.fileType}</td>
                        <td>{convertBytes(file.fileSize)}</td>
                        <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                        <td>
                          <a
                            href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.fileHash.substring(0, 10)}...
                          </a>
                        </td>
                      </tr>
                    </thead>
                  )
                })}
              </table> */}
              <div className='row textCenter'>
                            {this.props.files.map((file, key)=>{
                                return(
                                    <div >
                                        <div>
                                            <MDBCard className='token img' style={{maxWidth:'22rem'}}>
                                            <MDBCardImage src={`https://ipfs.infura.io/ipfs/${file.fileHash}`} style={{ width: '400px', height: '300px' }}  position='top' height='250rem' style={{marginRight:'4px'}} />
                                            <MDBCardBody>
                                            <MDBCardTitle> {file.uploader} </MDBCardTitle> 
                                            <MDBCardText>{file.fileDescription} </MDBCardText>
                                                  <MDBCardText>
                                                  Link -  
                                                  
                                                  <a
                                                  href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                                                  rel="noopener noreferrer"
                                                  target="_blank">
                                                  {file.fileHash.substring(0, 10)}...
                                                </a>
                                          </MDBCardText>
                                            
                                            </MDBCardBody>
                                            </MDBCard>
                                             </div>
                                    </div>
                                )
                            })} 
                        </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}
