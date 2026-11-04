// SPDX-License-Identifier: MIT
pragma solidity 0.8.34;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title JerryCoin
/// @notice A simple, fixed-supply ERC-20 token for education and testnets.
/// @dev The entire supply is minted once to the deployer. There is no admin or mint function.
contract JerryCoin is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 21_000_000 ether;

    constructor() ERC20("JerryCoin", "JRY") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
