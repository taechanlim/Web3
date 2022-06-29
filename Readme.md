npm install -g ganache-cli

# 로컬에서 실행되는 이더리움

실행 :
ganache-cli
or
npx ganache-cli

# 채굴 x P2P x

# 블록/체인/Tx 1tx->1block

web3.eth.blockNumber()

- sol -> byte로 변환해주는 컴파일러 필요

# nodejs web3

```sh
$ npm init -y
$ npm install -D jest
```

**package.json**

```json
"script":{
    "test":"jest"
}
```

**jest.config.js**

```js
const config = {
  verbose: true,
  testMatch: ["<rootDir>/**/*.test.js"],
};

module.exports = config;
```

**web3.test.js**

```js
describe("web3 테스트 코드", () => {
  it("테스트", () => {
    console.log("hello");
  });
});

//jest 실행 :  npm run test
```

## web3

```sh
$ npm install web3
$ npm install ethereumjs-tx
# Transaction 객체를 Ethereum Client가 이해할수있게 만들어주는 라이브러리 + 서명만들기
```
