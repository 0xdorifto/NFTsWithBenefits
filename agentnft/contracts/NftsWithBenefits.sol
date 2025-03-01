// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NftsWithBenefits is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    string private _baseTokenURI;

    constructor(
        string memory baseURI
    ) ERC721("NftsWithBenefits", "NWB") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }

    function mint(string memory uri) external {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
