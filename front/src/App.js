import { useEffect, useState } from "react";
import useWeb3 from "./hooks/useWeb3";

function App() {
  const [account, web3] = useWeb3();
  const [isLogin, setIsLogin] = useState(false);
  const [balance, setBalance] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await web3.eth.sendTransaction({
      from: account,
      to: e.target.received.value,
      value: web3.utils.toWei(e.target.amount.value, "ether"),
    });
  };

  //useWeb3에서 계정 정보 값을 가져와진다면 setIsLogin값을 true로 바꾼다
  useEffect(() => {
    const init = async () => {
      //eth를 찾을 수 없다고 오류가 뜸 > web3?해주면 없어짐 > why?
      const balance = await web3?.eth.getBalance(account);
      setBalance(balance / 10 ** 18);
    };
    if (account) setIsLogin(true);
    init();
  }, [account]);

  if (!isLogin) return <div>메타마스크 로그인 이후 사용해주세요.</div>;
  return (
    <div>
      <div>
        <h2>{account}님 환영합니다.</h2>
        <div>Balance : {balance} ETH</div>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" id="received" placeholder="받을계정"></input>
        <input type="number" id="amount" placeholder="보낼 금액"></input>
        ETH
        <input type="submit" value="전송"></input>
      </form>
    </div>
  );
}

export default App;
