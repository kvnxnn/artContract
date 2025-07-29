const contractAbi = [
  {
    type: "event",
    name: "ArtBought",
    inputs: [
      {
        type: "uint256",
        name: "artID",
        indexed: false,
        internalType: "uint256"
      },
      {
        type: "address",
        name: "newOwner",
        indexed: false,
        internalType: "address"
      },
      {
        type: "uint256",
        name: "artPrice",
        indexed: false,
        internalType: "uint256"
      }
    ],
    outputs: [],
    anonymous: false
  },
  {
    type: "event",
    name: "ArtListed",
    inputs: [
      {
        type: "uint256",
        name: "artID",
        indexed: false,
        internalType: "uint256"
      },
      {
        type: "address",
        name: "owner",
        indexed: false,
        internalType: "address"
      },
      {
        type: "uint256",
        name: "artPrice",
        indexed: false,
        internalType: "uint256"
      }
    ],
    outputs: [],
    anonymous: false
  },
  {
    type: "function",
    name: "artCount",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "arts",
    inputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256"
      }
    ],
    outputs: [
      {
        type: "uint256",
        name: "artID",
        internalType: "uint256"
      },
      {
        type: "address",
        name: "owner",
        internalType: "address payable"
      },
      {
        type: "uint256",
        name: "artPrice",
        internalType: "uint256"
      },
      {
        type: "string",
        name: "artTitle",
        internalType: "string"
      },
      {
        type: "string",
        name: "artImage",
        internalType: "string"
      },
      {
        type: "string",
        name: "artDescription",
        internalType: "string"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "buyArt",
    inputs: [
      {
        type: "uint256",
        name: "_artID",
        internalType: "uint256"
      }
    ],
    outputs: [],
    stateMutability: "payable"
  },
  {
    type: "function",
    name: "getAllArts",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "uint256",
            name: "artID",
            internalType: "uint256"
          },
          {
            type: "address",
            name: "owner",
            internalType: "address payable"
          },
          {
            type: "uint256",
            name: "artPrice",
            internalType: "uint256"
          },
          {
            type: "string",
            name: "artTitle",
            internalType: "string"
          },
          {
            type: "string",
            name: "artImage",
            internalType: "string"
          },
          {
            type: "string",
            name: "artDescription",
            internalType: "string"
          }
        ],
        internalType: "struct Artcontract.Art[]"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getUserArt",
    inputs: [
      {
        type: "address",
        name: "_owner",
        internalType: "address"
      }
    ],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "uint256",
            name: "artID",
            internalType: "uint256"
          },
          {
            type: "address",
            name: "owner",
            internalType: "address payable"
          },
          {
            type: "uint256",
            name: "artPrice",
            internalType: "uint256"
          },
          {
            type: "string",
            name: "artTitle",
            internalType: "string"
          },
          {
            type: "string",
            name: "artImage",
            internalType: "string"
          },
          {
            type: "string",
            name: "artDescription",
            internalType: "string"
          }
        ],
        internalType: "struct Artcontract.Art[]"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "listArt",
    inputs: [
      {
        type: "string",
        name: "_artTitle",
        internalType: "string"
      },
      {
        type: "string",
        name: "_artImage",
        internalType: "string"
      },
      {
        type: "string",
        name: "_artDescription",
        internalType: "string"
      },
      {
        type: "uint256",
        name: "_artPrice",
        internalType: "uint256"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "ownerToArts",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address"
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256"
      }
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256"
      }
    ],
    stateMutability: "view"
  }
];

export default contractAbi;
