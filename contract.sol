// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerifier {
    struct Verification {
        string username;
        string documentHash;
        uint256 timestamp;
    }

    Verification[] public verifications;

    event DocumentVerified(string username, string documentHash, uint256 timestamp);

    function verifyDocument(string memory _username, string memory _documentHash) public {
        verifications.push(Verification(_username, _documentHash, block.timestamp));
        emit DocumentVerified(_username, _documentHash, block.timestamp);
    }

    function getVerificationCount() public view returns (uint256) {
        return verifications.length;
    }

    function getVerification(uint256 index) public view returns (string memory, string memory, uint256) {
        require(index < verifications.length, "Invalid index");
        Verification memory v = verifications[index];
        return (v.username, v.documentHash, v.timestamp);
    }
}
