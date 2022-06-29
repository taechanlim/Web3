import { useEffect, useState } from "react";
//front에서 사용할 수 있게 경량화된 라이브러리 경로
import Web3 from "web3/dist/web3.min.js";

const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const getChainId = async () => {
    //메타마스크에 설치되어있는 정보를 가지고 와서 보여주는것
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    return chainId;
  };
  const getRequestAccounts = async () => {
    //계정 정보를 가져온다.
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return account;
  };
  const addNetwork = async (chainId) => {
    const network = {
      chainId: chainId,
      chainName: "domGanache",
      rpcUrls: ["http://127.0.0.1:8545"],
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
    };
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [network],
    });
  };
  useEffect(() => {
    const init = async () => {
      try {
        //targetChainId는 ganache의 chainId
        const targetChainId = "0x1e2a";
        // 7722 > 1337은 인식이 안되기에 $ npx ganache-cli --chainId 7722로 chainId를 바꿔줘여함
        const chainId = await getChainId();
        //현재 너의 메타마스크의 체인아이디가 1337이니?라는 코드를 작성
        console.log("너의 체인 아이디", chainId);
        if (targetChainId !== chainId) {
          //ganache의 chainId와 targetChainId가 일치하지 않으면
          //network를 추가하는 코드
          addNetwork(targetChainId);
        }
        const [account] = await getRequestAccounts();
        //Web3안에 window.ethereum정보를 넣어준다
        const web3 = new Web3(window.ethereum);
        //setAccount, setWeb3 정보를 null에서 변경한다.
        setAccount(account);
        setWeb3(web3);
      } catch (e) {
        console.error(e.message);
      }
    };
    if (window.ethereum) {
      init();
    }
  }, []);
  return [account, web3];
};

export default useWeb3;
