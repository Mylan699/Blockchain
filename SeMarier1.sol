// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContratMariage {
    address public mari;
    address public femme;
    bool public marie;
    
    constructor(address _mari, address _femme) {
        mari = _mari;
        femme = _femme;
        marie = false;
    }

    function marier() public {
        require(msg.sender == mari || msg.sender == femme, "Seuls les maries peuvent appeler cette fonction.");
        require(!marie, "Le mariage a deja ete conclu.");
        marie = true;
    }

    function divorcer() public {
        require(msg.sender == mari || msg.sender == femme, "Seuls les maries peuvent appeler cette fonction.");
        require(marie, "Le mariage n'a pas encore ete conclu.");
        marie = false;
    }
}
