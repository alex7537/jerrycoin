import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("JerryCoinModule", (m) => {
  const jerryCoin = m.contract("JerryCoin");

  return { jerryCoin };
});
