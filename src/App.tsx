import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from './hooks/useTonConnect';
import { fromNano } from '@ton/core';

// current testnet contract location: EQBUBv0WJj0Brev8jUVEp0FHNaPVm246yGi0FiEagZk4E51k
// current mainnet contract location: EQB7pUKVUe9Var91BPEFPYOwTuTahSU8De9NNkfZYYw4znE7

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jeremy_testnet_wallet_addr =
  //"kQDd4iVoWmfp10-7HZ9whtfz7XqfQMDI8cN7iqP7sZgBjesk";
  //"UQBKYXDr0H7i0En_6dos5_nhvbWA38KA6TLah3z0yUvzpcde";
  "0QDd4iVoWmfp10-7HZ9whtfz7XqfQMDI8cN7iqP7sZgBjbbh";

function App() {
  const {
    contract_address,
    counter_value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    recent_sender,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();
  const { connected } = useTonConnect();

  return (
    <>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          {contract_balance && <div className='Hint'>{fromNano(Number(contract_balance))}</div>}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
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
