// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title Delance
 * @dev Ship work, earn reputation, get paid on Base.
 */
contract Delance is ERC721 {
    uint256 private _gigIds;
    uint256 private _reputationTokenIds;

    enum GigStatus {
        Funded,
        Completed
    }

    struct Gig {
        uint256 gigId;
        address client;
        address freelancer;
        uint256 payoutAmount;
        GigStatus status;
    }

    mapping(uint256 => Gig) public gigs;

    event GigFunded(uint256 indexed gigId, address indexed client, address indexed freelancer, uint256 amount);
    event GigCompleted(uint256 indexed gigId, address indexed freelancer);

    constructor() ERC721("Delance Reputation", "DLR") {}

    function createAndFundGig(address _freelancer) external payable {
        require(msg.value > 0, "Payout must be > 0");
        _gigIds++;
        uint256 newGigId = _gigIds;

        gigs[newGigId] = Gig(newGigId, msg.sender, _freelancer, msg.value, GigStatus.Funded);
        emit GigFunded(newGigId, msg.sender, _freelancer, msg.value);
    }

    function approveAndPay(uint256 _gigId) external {
        Gig storage gig = gigs[_gigId];
        require(msg.sender == gig.client, "Only client can approve");
        require(gig.status == GigStatus.Funded, "Gig not in funded state");

        gig.status = GigStatus.Completed;
        (bool success, ) = gig.freelancer.call{value: gig.payoutAmount}("");
        require(success, "Payment failed");

        _reputationTokenIds++;
        _safeMint(gig.freelancer, _reputationTokenIds);
        emit GigCompleted(_gigId, gig.freelancer);
    }
}
