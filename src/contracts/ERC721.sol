// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC165.sol';
import './interfaces/IERC721.sol';

/*

1. NFT to point an address
2. Keep track of token ids
3. Keep track of tokenOwnerAddress to token ids
4. Keep track of how many tokens an owner address has
5. Create event that emits a transfer log - contract address 
   where it is minted to , the id.
*/


contract ERC721 is ERC165 , IERC721{

    //mapping from token id to owner
    mapping(uint => address) private _tokenOwner;

    //mapping from owner to number of owner tokens
    mapping(address => uint) private _OwnedTokensCount;

    //from is the contract address , to is whom we are transfering 
    //indexed is used to save gas fees
    //event Transfer(address indexed from , address indexed to , uint indexed tokenId); 

    
     constructor() {
        _registerInterface(bytes4(keccak256('balanceOf(bytes4)')^
        keccak256('ownerOf(bytes4)')^keccak256('transferFrom(bytes4)')));
    }

    //return the number of NFT's owned by owner , can be 0
    function balanceOf(address _owner) public view override returns(uint){
        require(_owner != address(0));
        return _OwnedTokensCount[_owner];
    }

    //returns owner of tokenId
    function ownerOf(uint _tokenId) public view override returns(address){
        require(_tokenOwner[_tokenId] != address(0));
        return _tokenOwner[_tokenId];
    }
    
    
    //to check whether the tokenID exists or not
    function _exists(uint _tokenId) internal view returns(bool){
        address owner = _tokenOwner[_tokenId];

        return (owner != address(0));
    }

    function _mint(address _to , uint _tokenId) internal virtual {
        
        //address isn't invalid or zero
        require(_to != address(0) , 'ERC721 : MINTING TO ZERO ADDRESS'); //address should not be invalid
        
        //token doesn't already exists
        require(!_exists(_tokenId) , 'ERC721 : TOKEN ALREADY MINTED');
        
        //adding a new address with a tokenID for minting
        _tokenOwner[_tokenId] = _to;
        
        //adding the tokenID count for the address
        _OwnedTokensCount[_to] += 1; 

        emit Transfer(address(0) , _to , _tokenId);
    }

    function _transferFrom(address _from, address _to, uint256 _tokenId) internal {
        require(_to != address(0), 'Error - ERC721 Transfer to the zero address');
        require(ownerOf(_tokenId) == _from, 'Trying to transfer a token the address does not own!');

        _OwnedTokensCount[_from] -= 1;

        _OwnedTokensCount[_to] += 1;

        _tokenOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        require(isApprovedOrOwner(msg.sender, _tokenId));
        _transferFrom(_from, _to, _tokenId);

    }

    function isApprovedOrOwner(address spender, uint256 tokenId) internal view returns(bool) {
        require(_exists(tokenId), 'token does not exist');
        address owner = ownerOf(tokenId);
        return(spender == owner); 
    }

}