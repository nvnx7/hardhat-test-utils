//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Box {
    uint256 private _value;

    function getValue() public view returns (uint256) {
        return _value;
    }

    function setValue(uint256 value) public {
        _value = value;
    }
}
