curl

curl -X
curl -H
curl --data [url]

- curl -X POST -H "content-type:application/json" --data '{name:"ingoo"}' http://localhost:3000

* 대부분 요청은 아래 형태다
  POST
  application/json
  {
  "id":1337,
  "jsonrpc":"2.0",
  "method":"eth_accounts",
  "params":[]
  }

  curl -X POST \
   -H "Content-type:application/json" \
   --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[]}' \
   http://localhost:8545

  curl -X POST \
   -H "Content-type:application/json" \
   --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x2428dafbeb695bd4f51f7231f974b72bbab59adc",'latest']}' \
   http://localhost:8545

evm_snapshot[]

evm_revert ["0x1"]

evm_mine ["123123213"]

RPC

이 요청을 쉽게 해주는것이 web3 라이브러리다.
