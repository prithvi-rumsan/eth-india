// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleDAO {
    address public owner;
    uint256 public votingDuration;
    uint256 public proposalCount;

    enum ProposalStatus { Pending, Approved, Rejected }

    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        ProposalStatus status;
        uint256 votingDeadline;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Proposal) public proposals;

    event ProposalSubmitted(uint256 proposalId, address proposer, string description);
    event VoteCasted(uint256 proposalId, address voter, bool inSupport);
    event ProposalResult(uint256 proposalId, ProposalStatus status, uint256 yesVotes, uint256 noVotes);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier validProposal(uint256 proposalId) {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal ID");
        _;
    }

    modifier canVote(uint256 proposalId) {
        require(block.timestamp <= proposals[proposalId].votingDeadline, "Voting has ended");
        require(!proposals[proposalId].hasVoted[msg.sender], "You have already voted");
        _;
    }

    constructor(uint256 _votingDuration) {
        owner = msg.sender;
        votingDuration = _votingDuration;
    }

 function submitProposal(string memory _description) external {
    proposalCount++;
    Proposal storage newProposal = proposals[proposalCount];
    
    newProposal.id = proposalCount;
    newProposal.proposer = msg.sender;
    newProposal.description = _description;
    newProposal.yesVotes = 0;
    newProposal.noVotes = 0;
    newProposal.status = ProposalStatus.Pending;
    newProposal.votingDeadline = block.timestamp + votingDuration;

    emit ProposalSubmitted(proposalCount, msg.sender, _description);
}

    function vote(uint256 proposalId, bool inSupport) external validProposal(proposalId) canVote(proposalId) {
        Proposal storage proposal = proposals[proposalId];

        proposal.hasVoted[msg.sender] = true;

        if (inSupport) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }

        emit VoteCasted(proposalId, msg.sender, inSupport);
    }

    function endVoting(uint256 proposalId) external onlyOwner validProposal(proposalId) {
        Proposal storage proposal = proposals[proposalId];

        require(block.timestamp > proposal.votingDeadline, "Voting is still ongoing");

        if (proposal.yesVotes > proposal.noVotes) {
            proposal.status = ProposalStatus.Approved;
        } else {
            proposal.status = ProposalStatus.Rejected;
        }

        emit ProposalResult(proposalId, proposal.status, proposal.yesVotes, proposal.noVotes);
    }
}
