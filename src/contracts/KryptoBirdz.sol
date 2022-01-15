// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract KryptoBird is ERC721Connector{


    //array to store NFTs
    string[] public KryptoBirdz;

    //to check whether the kryptobird exists
    mapping(string => bool) _kryptoBirdzExists;


    //we will pass the http value of ipfs in this function
    function mint(string memory _kryptoBird) public {

        require(!_kryptoBirdzExists[_kryptoBird], 'Error - KryptoBird already exists');
        KryptoBirdz.push(_kryptoBird);
        uint _id = KryptoBirdz.length - 1;

        _mint(msg.sender , _id);

        _kryptoBirdzExists[_kryptoBird] = true;
    }
    
    constructor() ERC721Connector('Kryptobirdz','KBIRDZ'){
        
    }

    
}