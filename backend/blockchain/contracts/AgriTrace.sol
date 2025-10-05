// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title AgriTrace
 * @dev Smart contract for biofortified crop traceability
 * @author Renoir KAZE
 */
contract AgriTrace is Ownable, Pausable {
    
    // Structs
    struct Product {
        string qrCode;
        string name;
        string variety;
        uint256 ironContent; // in ppm
        bool biofortified;
        address creator;
        uint256 quantity; // in grams
        uint256 harvestDate;
        bool exists;
        string ipfsHash;
    }
    
    struct Batch {
        string batchNumber;
        string seedVariety;
        uint256 plantingDate;
        uint256 harvestDate;
        uint256 totalQuantity;
        address farmer;
        bool exists;
    }
    
    struct Transaction {
        address from;
        address to;
        string productQrCode;
        uint256 quantity;
        uint256 price;
        uint256 timestamp;
        string transactionType;
        bool completed;
    }
    
    struct SupplyChainStep {
        address actor;
        string action;
        string description;
        uint256 timestamp;
        string location;
    }
    
    // State variables
    mapping(string => Product) public products;
    mapping(string => Batch) public batches;
    mapping(bytes32 => Transaction) public transactions;
    mapping(string => SupplyChainStep[]) public supplyChain;
    mapping(address => bool) public verifiedUsers;
    mapping(string => bool) public verifiedProducts;
    
    // Arrays for iteration
    string[] public productQrCodes;
    string[] public batchNumbers;
    bytes32[] public transactionHashes;
    
    // Events
    event ProductRegistered(
        string indexed qrCode,
        string name,
        address indexed creator,
        uint256 timestamp
    );
    
    event BatchCreated(
        string indexed batchNumber,
        address indexed farmer,
        uint256 timestamp
    );
    
    event TransactionRecorded(
        bytes32 indexed txHash,
        address indexed from,
        address indexed to,
        string productQrCode,
        uint256 timestamp
    );
    
    event SupplyChainStepAdded(
        string indexed qrCode,
        address indexed actor,
        string action,
        uint256 timestamp
    );
    
    event ProductVerified(
        string indexed qrCode,
        address indexed verifier,
        uint256 timestamp
    );
    
    event UserVerified(
        address indexed user,
        uint256 timestamp
    );
    
    // Modifiers
    modifier onlyVerifiedUser() {
        require(verifiedUsers[msg.sender], "User not verified");
        _;
    }
    
    modifier productExists(string memory qrCode) {
        require(products[qrCode].exists, "Product does not exist");
        _;
    }
    
    modifier batchExists(string memory batchNumber) {
        require(batches[batchNumber].exists, "Batch does not exist");
        _;
    }
    
    // Constructor
    constructor() {
        verifiedUsers[msg.sender] = true;
    }
    
    /**
     * @dev Register a new batch
     */
    function registerBatch(
        string memory batchNumber,
        string memory seedVariety,
        uint256 plantingDate,
        uint256 totalQuantity
    ) external whenNotPaused onlyVerifiedUser {
        require(!batches[batchNumber].exists, "Batch already exists");
        require(bytes(batchNumber).length > 0, "Invalid batch number");
        require(totalQuantity > 0, "Quantity must be greater than 0");
        
        batches[batchNumber] = Batch({
            batchNumber: batchNumber,
            seedVariety: seedVariety,
            plantingDate: plantingDate,
            harvestDate: 0,
            totalQuantity: totalQuantity,
            farmer: msg.sender,
            exists: true
        });
        
        batchNumbers.push(batchNumber);
        
        emit BatchCreated(batchNumber, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Register a new product
     */
    function registerProduct(
        string memory qrCode,
        string memory name,
        string memory variety,
        uint256 ironContent,
        bool biofortified,
        uint256 quantity,
        uint256 harvestDate,
        string memory ipfsHash
    ) external whenNotPaused onlyVerifiedUser {
        require(!products[qrCode].exists, "Product already exists");
        require(bytes(qrCode).length > 0, "Invalid QR code");
        require(quantity > 0, "Quantity must be greater than 0");
        require(ironContent > 0, "Iron content must be greater than 0");
        
        products[qrCode] = Product({
            qrCode: qrCode,
            name: name,
            variety: variety,
            ironContent: ironContent,
            biofortified: biofortified,
            creator: msg.sender,
            quantity: quantity,
            harvestDate: harvestDate,
            exists: true,
            ipfsHash: ipfsHash
        });
        
        productQrCodes.push(qrCode);
        
        emit ProductRegistered(qrCode, name, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Record a transaction
     */
    function recordTransaction(
        address to,
        string memory productQrCode,
        uint256 quantity,
        uint256 price,
        string memory transactionType
    ) external whenNotPaused onlyVerifiedUser productExists(productQrCode) {
        require(to != address(0), "Invalid recipient address");
        require(quantity > 0, "Quantity must be greater than 0");
        require(products[productQrCode].quantity >= quantity, "Insufficient product quantity");
        
        bytes32 txHash = keccak256(abi.encodePacked(
            msg.sender,
            to,
            productQrCode,
            quantity,
            block.timestamp
        ));
        
        transactions[txHash] = Transaction({
            from: msg.sender,
            to: to,
            productQrCode: productQrCode,
            quantity: quantity,
            price: price,
            timestamp: block.timestamp,
            transactionType: transactionType,
            completed: true
        });
        
        transactionHashes.push(txHash);
        
        emit TransactionRecorded(txHash, msg.sender, to, productQrCode, block.timestamp);
    }
    
    /**
     * @dev Add a supply chain step
     */
    function addSupplyChainStep(
        string memory qrCode,
        string memory action,
        string memory description,
        string memory location
    ) external whenNotPaused onlyVerifiedUser productExists(qrCode) {
        require(bytes(action).length > 0, "Action cannot be empty");
        
        supplyChain[qrCode].push(SupplyChainStep({
            actor: msg.sender,
            action: action,
            description: description,
            timestamp: block.timestamp,
            location: location
        }));
        
        emit SupplyChainStepAdded(qrCode, msg.sender, action, block.timestamp);
    }
    
    /**
     * @dev Verify a product as authentic
     */
    function verifyProduct(string memory qrCode) 
        external 
        whenNotPaused 
        onlyVerifiedUser 
        productExists(qrCode) 
    {
        verifiedProducts[qrCode] = true;
        emit ProductVerified(qrCode, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Verify a user (admin only)
     */
    function verifyUser(address user) external onlyOwner {
        require(user != address(0), "Invalid user address");
        verifiedUsers[user] = true;
        emit UserVerified(user, block.timestamp);
    }
    
    /**
     * @dev Get product details
     */
    function getProduct(string memory qrCode) 
        external 
        view 
        productExists(qrCode) 
        returns (
            string memory name,
            string memory variety,
            uint256 ironContent,
            bool biofortified,
            address creator,
            uint256 quantity,
            uint256 harvestDate,
            string memory ipfsHash
        ) 
    {
        Product memory product = products[qrCode];
        return (
            product.name,
            product.variety,
            product.ironContent,
            product.biofortified,
            product.creator,
            product.quantity,
            product.harvestDate,
            product.ipfsHash
        );
    }
    
    /**
     * @dev Get supply chain history for a product
     */
    function getSupplyChainHistory(string memory qrCode) 
        external 
        view 
        productExists(qrCode) 
        returns (SupplyChainStep[] memory) 
    {
        return supplyChain[qrCode];
    }
    
    /**
     * @dev Get total number of products
     */
    function getTotalProducts() external view returns (uint256) {
        return productQrCodes.length;
    }
    
    /**
     * @dev Get total number of batches
     */
    function getTotalBatches() external view returns (uint256) {
        return batchNumbers.length;
    }
    
    /**
     * @dev Get total number of transactions
     */
    function getTotalTransactions() external view returns (uint256) {
        return transactionHashes.length;
    }
    
    /**
     * @dev Check if product is verified
     */
    function isProductVerified(string memory qrCode) 
        external 
        view 
        returns (bool) 
    {
        return verifiedProducts[qrCode];
    }
    
    /**
     * @dev Pause contract (admin only)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause contract (admin only)
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
