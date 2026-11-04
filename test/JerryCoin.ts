import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";
import { parseEther } from "viem";

describe("JerryCoin", async function () {
  const { viem } = await network.create();
  const [deployer, alice, bob] = await viem.getWalletClients();

  async function deployJerryCoin() {
    return viem.deployContract("JerryCoin", [], { client: { wallet: deployer } });
  }

  it("sets the expected metadata and mints the fixed supply to the deployer", async function () {
    const token = await deployJerryCoin();
    const expectedSupply = parseEther("21000000");

    assert.equal(await token.read.name(), "JerryCoin");
    assert.equal(await token.read.symbol(), "JRY");
    assert.equal(await token.read.decimals(), 18);
    assert.equal(await token.read.INITIAL_SUPPLY(), expectedSupply);
    assert.equal(await token.read.totalSupply(), expectedSupply);
    assert.equal(await token.read.balanceOf([deployer.account.address]), expectedSupply);
  });

  it("transfers tokens between accounts", async function () {
    const token = await deployJerryCoin();
    const amount = parseEther("250");

    await token.write.transfer([alice.account.address, amount]);

    assert.equal(await token.read.balanceOf([alice.account.address]), amount);
  });

  it("supports approval and transferFrom", async function () {
    const token = await deployJerryCoin();
    const amount = parseEther("100");

    await token.write.approve([alice.account.address, amount]);
    const tokenAsAlice = await viem.getContractAt("JerryCoin", token.address, {
      client: { wallet: alice },
    });
    await tokenAsAlice.write.transferFrom([
      deployer.account.address,
      bob.account.address,
      amount,
    ]);

    assert.equal(await token.read.balanceOf([bob.account.address]), amount);
    assert.equal(
      await token.read.allowance([deployer.account.address, alice.account.address]),
      0n,
    );
  });

  it("rejects a transfer larger than the sender balance", async function () {
    const token = await deployJerryCoin();
    const tokenAsAlice = await viem.getContractAt("JerryCoin", token.address, {
      client: { wallet: alice },
    });

    await assert.rejects(
      tokenAsAlice.write.transfer([bob.account.address, 1n]),
      /ERC20InsufficientBalance/,
    );
  });

  it("cannot increase supply after deployment", async function () {
    const token = await deployJerryCoin();
    const supplyBefore = await token.read.totalSupply();

    await token.write.transfer([alice.account.address, parseEther("1")]);

    assert.equal(await token.read.totalSupply(), supplyBefore);
    assert.equal("mint" in token.write, false);
  });
});
