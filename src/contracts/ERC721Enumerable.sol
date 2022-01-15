// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';
import './interfaces/IERC721Enumerable.sol';

contract ERC721Enumerable is ERC721 , IERC721Enumerable {

    uint[] private _allTokens;

    //mapping from tokenId to position in _allTokens array
    mapping(uint => uint) private _allTokensIndex;

    //mapping of owner to list of all tokens owned by owner
    mapping(address => uint[]) private _ownedTokens;
 
    //mapping from tokenId index to owner's tokens list
    mapping(uint => uint) private _ownedTokensIndex;

     constructor() {
        _registerInterface(bytes4(keccak256('totalSupply(bytes4)')^
        keccak256('tokenByIndex(bytes4)')^keccak256('tokenOfOwnerByIndex(bytes4)')));
    }


    //minting a token
    function _mint(address to , uint tokenId) internal override(ERC721){
        super._mint(to,tokenId);

        //adding tokens to total Supply
        _addTokenstoTotalEnumeration(tokenId);

        //adding tokens for the owner
        _addTokenstoOwnerEnumeration(to,tokenId);
        
    }

    function _addTokenstoOwnerEnumeration(address to , uint tokenId) private{
        //add address and token id to _ownedTokens
        _ownedTokens[to].push(tokenId);

        //ownedTokensIndex tokenId set to address of ownedTokens position
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;

    }

    //adding a token to the total supply _allTokens array and set position of token's index
    function _addTokenstoTotalEnumeration(uint tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    //function that returns tokenByIndex
    function tokenByIndex(uint index) public view override returns(uint){
        //index is not out of bounds
        require(index < totalSupply() , 'GLOBAL INDEX OUT OF BOUND');
        return _allTokens[index];
    }

    //function that returns tokenofOwnerByIndex
    function tokenOfOwnerByIndex(address owner,uint index) public view override returns(uint){
        //index shpuld be less than the number of Tokens owned by the Owner
        require(index < balanceOf(owner),'OWNER INDEX OUT OF BOUND');
        return _ownedTokens[owner][index];
    }

    //count of all the tokens
    function totalSupply() public view override returns (uint){
        return _allTokens.length;
    }
}