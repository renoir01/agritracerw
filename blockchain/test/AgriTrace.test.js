const AgriTrace = artifacts.require("AgriTrace");

contract("AgriTrace", accounts => {
  const [owner, farmer, trader, consumer] = accounts;
  let agriTrace;

  beforeEach(async () => {
    agriTrace = await AgriTrace.new({ from: owner });
  });

  describe("Deployment", () => {
    it("should deploy successfully", async () => {
      const address = await agriTrace.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("should set the owner as verified", async () => {
      const isVerified = await agriTrace.verifiedUsers(owner);
      assert.equal(isVerified, true, "Owner should be verified");
    });
  });

  describe("User Verification", () => {
    it("should allow owner to verify users", async () => {
      await agriTrace.verifyUser(farmer, { from: owner });
      const isVerified = await agriTrace.verifiedUsers(farmer);
      assert.equal(isVerified, true, "Farmer should be verified");
    });

    it("should not allow non-owner to verify users", async () => {
      try {
        await agriTrace.verifyUser(trader, { from: farmer });
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert.include(error.message, "revert", "Error should contain 'revert'");
      }
    });
  });

  describe("Batch Registration", () => {
    beforeEach(async () => {
      await agriTrace.verifyUser(farmer, { from: owner });
    });

    it("should register a batch successfully", async () => {
      const batchNumber = "BATCH-001";
      const seedVariety = "Iron-Biofortified Beans";
      const plantingDate = Math.floor(Date.now() / 1000);
      const totalQuantity = 1000;

      const tx = await agriTrace.registerBatch(
        batchNumber,
        seedVariety,
        plantingDate,
        totalQuantity,
        { from: farmer }
      );

      assert.equal(tx.logs[0].event, "BatchCreated", "Should emit BatchCreated event");
      
      const batch = await agriTrace.batches(batchNumber);
      assert.equal(batch.batchNumber, batchNumber);
      assert.equal(batch.seedVariety, seedVariety);
      assert.equal(batch.farmer, farmer);
      assert.equal(batch.exists, true);
    });

    it("should not allow duplicate batch registration", async () => {
      const batchNumber = "BATCH-001";
      await agriTrace.registerBatch(batchNumber, "Variety", Date.now(), 1000, { from: farmer });

      try {
        await agriTrace.registerBatch(batchNumber, "Variety", Date.now(), 1000, { from: farmer });
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert.include(error.message, "revert");
      }
    });
  });

  describe("Product Registration", () => {
    beforeEach(async () => {
      await agriTrace.verifyUser(farmer, { from: owner });
    });

    it("should register a product successfully", async () => {
      const qrCode = "QR-123456";
      const name = "Iron-Biofortified Beans";
      const variety = "RWA-001";
      const ironContent = 85;
      const biofortified = true;
      const quantity = 1000;
      const harvestDate = Math.floor(Date.now() / 1000);
      const ipfsHash = "QmTest123";

      const tx = await agriTrace.registerProduct(
        qrCode,
        name,
        variety,
        ironContent,
        biofortified,
        quantity,
        harvestDate,
        ipfsHash,
        { from: farmer }
      );

      assert.equal(tx.logs[0].event, "ProductRegistered", "Should emit ProductRegistered event");
      
      const product = await agriTrace.getProduct(qrCode);
      assert.equal(product[0], name);
      assert.equal(product[1], variety);
      assert.equal(product[2].toNumber(), ironContent);
      assert.equal(product[3], biofortified);
      assert.equal(product[4], farmer);
    });

    it("should not allow unverified users to register products", async () => {
      try {
        await agriTrace.registerProduct(
          "QR-123",
          "Product",
          "Variety",
          85,
          true,
          1000,
          Date.now(),
          "ipfs",
          { from: trader }
        );
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert.include(error.message, "User not verified");
      }
    });
  });

  describe("Transaction Recording", () => {
    const qrCode = "QR-123456";

    beforeEach(async () => {
      await agriTrace.verifyUser(farmer, { from: owner });
      await agriTrace.verifyUser(trader, { from: owner });
      
      await agriTrace.registerProduct(
        qrCode,
        "Iron Beans",
        "RWA-001",
        85,
        true,
        1000,
        Math.floor(Date.now() / 1000),
        "ipfs",
        { from: farmer }
      );
    });

    it("should record a transaction successfully", async () => {
      const tx = await agriTrace.recordTransaction(
        trader,
        qrCode,
        500,
        50000,
        "transfer",
        { from: farmer }
      );

      assert.equal(tx.logs[0].event, "TransactionRecorded", "Should emit TransactionRecorded event");
    });
  });

  describe("Supply Chain Tracking", () => {
    const qrCode = "QR-123456";

    beforeEach(async () => {
      await agriTrace.verifyUser(farmer, { from: owner });
      
      await agriTrace.registerProduct(
        qrCode,
        "Iron Beans",
        "RWA-001",
        85,
        true,
        1000,
        Math.floor(Date.now() / 1000),
        "ipfs",
        { from: farmer }
      );
    });

    it("should add supply chain step successfully", async () => {
      const tx = await agriTrace.addSupplyChainStep(
        qrCode,
        "harvested",
        "Harvested from farm",
        "Musanze, Rwanda",
        { from: farmer }
      );

      assert.equal(tx.logs[0].event, "SupplyChainStepAdded", "Should emit SupplyChainStepAdded event");
      
      const history = await agriTrace.getSupplyChainHistory(qrCode);
      assert.equal(history.length, 1);
      assert.equal(history[0].actor, farmer);
      assert.equal(history[0].action, "harvested");
    });
  });

  describe("Product Verification", () => {
    const qrCode = "QR-123456";

    beforeEach(async () => {
      await agriTrace.verifyUser(farmer, { from: owner });
      
      await agriTrace.registerProduct(
        qrCode,
        "Iron Beans",
        "RWA-001",
        85,
        true,
        1000,
        Math.floor(Date.now() / 1000),
        "ipfs",
        { from: farmer }
      );
    });

    it("should verify a product successfully", async () => {
      await agriTrace.verifyProduct(qrCode, { from: farmer });
      
      const isVerified = await agriTrace.isProductVerified(qrCode);
      assert.equal(isVerified, true, "Product should be verified");
    });
  });

  describe("Pausable Functionality", () => {
    it("should allow owner to pause contract", async () => {
      await agriTrace.pause({ from: owner });
      
      await agriTrace.verifyUser(farmer, { from: owner });
      
      try {
        await agriTrace.registerProduct(
          "QR-123",
          "Product",
          "Variety",
          85,
          true,
          1000,
          Date.now(),
          "ipfs",
          { from: farmer }
        );
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert.include(error.message, "Pausable: paused");
      }
    });

    it("should allow owner to unpause contract", async () => {
      await agriTrace.pause({ from: owner });
      await agriTrace.unpause({ from: owner });
      
      await agriTrace.verifyUser(farmer, { from: owner });
      
      // Should work after unpause
      await agriTrace.registerProduct(
        "QR-123",
        "Product",
        "Variety",
        85,
        true,
        1000,
        Math.floor(Date.now() / 1000),
        "ipfs",
        { from: farmer }
      );
    });
  });
});
