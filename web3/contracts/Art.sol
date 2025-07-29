// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Artcontract {


    // VARIABLES

     struct Art {
         uint256 artID;
         address payable owner;
         uint256 artPrice;
         string artTitle;
         string artImage;
         string artDescription;
         
    }

    uint256 public artCount = 0;
    mapping(uint256 => Art) public arts;
    mapping(address => uint256[]) public ownerToArts;

    // EVENTS
    event ArtListed(uint256 artID, address owner, uint256 artPrice);
    event ArtBought(uint256 artID, address newOwner, uint256 artPrice);




    // FUNCTIONS IN CONTRACT


    // FUNCTION 1: list art in the blochchain.

      function listArt(string memory _artTitle, string memory _artImage, string memory _artDescription, uint256 _artPrice) public {
        artCount++;
        arts[artCount] = Art(artCount, payable(msg.sender), _artPrice, _artTitle, _artImage, _artDescription);
        ownerToArts[msg.sender].push(artCount);
        emit ArtListed(artCount, msg.sender, _artPrice);
    }



    // FUNCTION 2: buy art .

    function buyArt(uint256 _artID) external payable {
    uint256 amount = msg.value;
    Art storage artStore = arts[_artID];
    require(_artID > 0 && _artID <= artCount, "Art does not exist");
    require(amount >= artStore.artPrice, "Insufficient funds");
    require(artStore.owner != msg.sender, "Cannot buy your own art");
    // Transfer funds to the current owner
    (bool sent, ) = artStore.owner.call{value: amount}("");
    require(sent, "Failed to send Ether");
    // Update the ownership
    address previousOwner = artStore.owner;
    artStore.owner = payable(msg.sender);
    // Update the ownerToArts mapping
    ownerToArts[msg.sender].push(_artID);
    // Remove the art from the previous owner's list
    uint256[] storage previousOwnerArts = ownerToArts[previousOwner];
    for (uint256 i = 0; i < previousOwnerArts.length; i++) {
        if (previousOwnerArts[i] == _artID) {
            previousOwnerArts[i] = previousOwnerArts[previousOwnerArts.length - 1];
            previousOwnerArts.pop();
            break;
        }
    }
    // Emit the event
    emit ArtBought(_artID, msg.sender, artStore.artPrice);
    }

    // FUNCTION 3: get all arts.

     function getAllArts() public view returns (Art[] memory) {
        Art[] memory _arts = new Art[](artCount);
        for (uint256 i = 1; i <= artCount; i++) {
            _arts[i - 1] = arts[i];
        }
        return _arts;
    }

    // FUNCTION 4: get user art. 
     function getUserArt(address _owner) public view returns (Art[] memory) {
        uint256[] storage userArts = ownerToArts[_owner];
        Art[] memory _arts = new Art[](userArts.length);
        for (uint256 i = 0; i < userArts.length; i++) {
            _arts[i] = arts[userArts[i]];
        }
        return _arts;
    }
    
}