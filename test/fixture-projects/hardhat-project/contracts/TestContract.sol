//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Imposter {}

contract TestContract {
    address public imposter;

    constructor() {
        imposter = address(new Imposter());
    }

    function onlyImposter() external view returns (bool) {
        require(msg.sender == imposter, 'unauthorized');
        return true;
    }
}
