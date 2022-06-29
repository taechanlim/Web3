const Web3 = require("web3");
const ethTx = require("ethereumjs-tx").Transaction;

describe("web3 테스트 코드", () => {
  let web3;
  let accounts;
  let sender;
  let received;
  it("web3 연결 테스트", () => {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    // console.log(web3);
  });

  // 최신블럭의 높이 가져오기
  it("Latest Block 높이 가져오기", async () => {
    const latestBlock = await web3.eth.getBlockNumber();
    // console.log("최신블럭 높이 : ", latestBlock);
  });

  it("전체 accounts 가져오기", async () => {
    accounts = await web3.eth.getAccounts();
    sender = accounts[0];
    received = accounts[1];
    // console.log("전체 계정 : ", accounts);
  });

  it("첫번째 계정 balance 가져오기", async () => {
    const balance = await web3.eth.getBalance(accounts[0]);
    // console.log(balance); // 단위가 wei로 표시된다
    // console.log("ETH : ", balance / 10 ** 18); //100 ETH로 표시
  });

  it("ETH 단위 변경해보기", () => {
    //ETH , gwei , wei
    // console.log("1gwei를 wei로", web3.utils.toWei("1", "gwei"));
    // console.log("1ether를 wei로", web3.utils.toWei("1", "ether"));
  });

  it("트랜잭션 카운터 구해오기", async () => {
    const txCount = await web3.eth.getTransactionCount(sender);
    //console.log(txCount); //0 -> hex

    //console.log(web3.utils.toHex(txCount)); // 16진수로 변경
  });

  it("트랜잭션 실행하기", async () => {
    const txCount = await web3.eth.getTransactionCount(sender);
    // ca375cfc48ed8fc0778d5b3198810c7920a1262e4ba278de7b605ccb482df71b 보내는사람 개인키
    const privateKey = Buffer.from(
      "ca375cfc48ed8fc0778d5b3198810c7920a1262e4ba278de7b605ccb482df71b",
      "hex"
    );

    const txObject = {
      nonce: web3.utils.toHex(txCount),
      from: sender,
      to: received,
      value: web3.utils.toHex(web3.utils.toWei("1", "ether")), //단위가 wei 이다. 1ETH를 보내고싶으면 10 ** 18값을 hex로 변환해서 사용
      gasLimit: web3.utils.toHex(6721975),
      gasPrice: web3.utils.toHex(web3.utils.toWei("1", "gwei")),
      data: web3.utils.toHex(""),
    };
    const tx = new ethTx(txObject);
    tx.sign(privateKey);
    // console.log("tx다", tx);
    const serializedTx = tx.serialize();
    // console.log("serial이다", serializedTx.toString('hex'));
    const txHash = await web3.eth.sendSignedTransaction(
      "0x" + serializedTx.toString("hex")
    );
    // console.log(txHash);
    //
  });

  it("balance확인", async () => {
    const Senderbalance = await web3.eth.getBalance(sender);
    const Receivedbalance = await web3.eth.getBalance(received);
    console.log("sender balance :", Senderbalance / 10 ** 18 + " ETH");
    console.log("received balance :", Receivedbalance / 10 ** 18 + " ETH");
  });

  it("가스 사용량 확인", async () => {
    //가스 사용량 21004
    //가스가격 1= 1gwei
    //가스 최대치 6721975
  });
});
