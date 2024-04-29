import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from './hooks/useTonConnect';
import { fromNano } from '@ton/core';
import WebApp from '@twa-dev/sdk';

// current testnet contract location: EQBUBv0WJj0Brev8jUVEp0FHNaPVm246yGi0FiEagZk4E51k
// current mainnet contract location: EQB7pUKVUe9Var91BPEFPYOwTuTahSU8De9NNkfZYYw4znE7

function App() {
  const {
    contract_address,
    counter_value,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();
  const { connected } = useTonConnect();
  const showAlert = () => WebApp.showAlert("Hey there!");

  return (
    <>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>{WebApp.platform}</b>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          {contract_balance && <div className='Hint'>{fromNano(Number(contract_balance))}</div>}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
        <a
          onClick={() => {
            showAlert();
          }}
        >
          Show Alert
        </a>

        <br />

        {connected && (
              <a
                onClick={() => {
                  sendIncrement();
                }}
              >
                Increment by 5
              </a>
            )}
            <br />
            {connected && (
              <a
                onClick={() => {
                  sendDeposit();
                }}
              >
                Deposit 1 TON
              </a>
            )}
            <br />
            {connected && (
              <a
                onClick={() => {
                  sendWithdrawalRequest();
                }}
              >
                Withdraw 0.7 TON
              </a>
            )}
      </div>
    </>
  )
}

export default App
