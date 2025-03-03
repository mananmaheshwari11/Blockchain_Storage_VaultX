// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateStorage {
    struct Certificate {
        string fileHash;
        string email;
    }

    mapping(bytes32 => Certificate) private certificates;

    event CertificateCreated(bytes32 uniqueHash, string fileHash, string email);

    function createCertificateBlock(string memory _fileHash, string memory _email) public returns (bytes32) {
        bytes32 uniqueHash = keccak256(abi.encodePacked(_email, block.timestamp));


        certificates[uniqueHash] = Certificate(_fileHash, _email);

        emit CertificateCreated(uniqueHash, _fileHash, _email);
        
        return uniqueHash;
    }

    function getCertificate(bytes32 _uniqueHash) public view returns (string memory, string memory) {

        Certificate memory cert = certificates[_uniqueHash];
        return (cert.fileHash, cert.email);
    }
}
