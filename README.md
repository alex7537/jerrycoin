# JerryCoin (JRY)

JerryCoin 是一个用于学习和测试网实验的固定供应量 ERC-20 代币。它基于 OpenZeppelin Contracts，使用 Hardhat 3 构建和测试。

> **教学项目，不是投资产品。** 本项目不会默认部署到主网，不包含公开募资、代币销售、后门增发或收益承诺。合约未经专业安全审计，请勿承载真实资金。

## 设计

- 名称：JerryCoin
- 符号：JRY
- 小数位：18
- 总供应量：21,000,000 JRY
- 发行方式：部署时一次性铸造给部署者
- 后续增发：不支持
- 管理员、暂停和升级权限：无

核心合约只有一个自定义供应量规则，其余 ERC-20 行为继承自 OpenZeppelin，便于审阅并减少自定义代码风险。

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm ci
npm run check
```

`npm run check` 会编译合约、检查 TypeScript 并运行单元测试。

## 测试范围

测试覆盖：

- 名称、符号、小数位与固定总量
- 初始供应量归属部署者
- 普通转账
- `approve` 与 `transferFrom`
- 余额不足时回退
- 转账不会改变总供应量，且合约不暴露 `mint` 函数

## 可选：部署到 Sepolia 测试网

部署会产生测试网 gas 消耗。先复制 `.env.example` 的变量到本地环境，并且只使用专门的测试网私钥；不要把 `.env` 或私钥提交到 Git。

在确认网络、账户和测试 ETH 后，显式运行：

```bash
npx hardhat ignition deploy ignition/modules/JerryCoin.ts --network sepolia --build-profile production
```

项目没有主网网络配置，因此不会因复制命令而默认部署主网。仓库也不包含任何真实 RPC 地址或私钥。

## 供应量说明

Solidity 中 `ether` 在这里只是 `10^18` 的单位换算，与发送 ETH 无关。因此 `21_000_000 ether` 表示 21,000,000 个具有 18 位小数的 JRY 最小单位。

## 许可证

[MIT](LICENSE)
