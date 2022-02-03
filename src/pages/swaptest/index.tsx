import React from 'react'
import { ethers } from 'ethers';
import { ChainId, UniswapPair } from 'simple-uniswap-sdk';

function SwapTest() {
   const etherTradeExample = async () => {
      const uniswapPair = new UniswapPair({
         // the contract address of the token you want to convert FROM
         fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
         // the contract address of the token you want to convert TO
         toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
         // the ethereum address of the user using this part of the dApp
         ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
         // you can pass in the provider url as well if you want
         // providerUrl: YOUR_PROVIDER_URL,
         // OR if you want to inject your own ethereum provider (no need for chainId if so)
         // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
         chainId: ChainId.MAINNET,
      });

      // this example shows erc20 > erc20 but its a simple change for eth > erc20
      // or erc20 > eth example below by using `ETH.MAINNET().contractAddress`
      // which can be imported within `simple-uniswap-sdk`
      // aka > import { ETH } from 'simple-uniswap-sdk';

      //   ETH > ERC20
      // const uniswapPair = new UniswapPair({
      //   fromTokenContractAddress: ETH.MAINNET().contractAddress,
      //   toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
      //   ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
      //   chainId: ChainId.RINKEBY,
      // });

      //   ERC20 > ETH
      // const uniswapPair = new UniswapPair({
      //   fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      //   toTokenContractAddress: ETH.MAINNET().contractAddress,,
      //   ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
      //   chainId: ChainId.RINKEBY,
      // });

      // now to create the factory you just do
      const uniswapPairFactory = await uniswapPair.createFactory();

      // the amount is the proper entered amount
      // so if they enter 10 pass in 10
      // it will work it all out for you
      const trade = await uniswapPairFactory.trade('10');

      // can also pass in a trade direction here, for example if you want the output
      // aka your doing ETH > AAVE but want to know how much you get for 5 AAVE.
      // const trade = await uniswapPairFactory.trade('10', TradeDirection.output);

      // you should probably check this before they confirm the swap again
      // this is just so its simple to read
      if (!trade.fromBalance.hasEnough) {
         throw new Error('You do not have enough from balance to execute this swap');
      }

      // subscribe to quote changes this is just in example so your dont miss it
      trade.quoteChanged$.subscribe((value: TradeContext) => {
         // value will hold the same info as below but obviously with
         // the new trade info.
      });

      // obviously dont create your provider + wallet everytime again and again!
      // this is just like this for ease of reading!
      const provider = new ethers.providers.JsonRpcProvider(
          uniswapPairFactory.providerUrl
      );
      const wallet = new ethers.Wallet(YOUR_PRIVATE_KEY, provider);

      // Please note when you do your trade if `approvalTransaction` is defined the user does not have enough allowance to perform this trade
      // aka the router can not move their erc20 tokens on their behalf of the user.
      // This will generate the transaction for the approval of moving tokens for the user.
      // This uses the max hex possible which means they will not have to do this again if they want to swap from the SAME from token again later.
      // If they have only approved moving on uniswap v2 and try to execute a v3 trade they would have to approve that but again once approved
      // the v3 router then they will not have to again for that version.
      // Please note the approval is per each erc20 token, so if they picked another from token after they swapped they would need to do this again.
      // You have to send and sign the transaction from within your dApp. Remember when they do not have enough allowance it will mean doing 2 transaction,
      // 1 to allow uniswap to move tokens on their behalf then the next one to actually execute the trade.
      // On `eth` > `erc20` the `approvalTransaction` will always be undefined as you only need to do this when moving `erc20 > eth` and `erc20 > erc20`.
      if (trade.approvalTransaction) {
         const approved = await wallet.sendTransaction(trade.approvalTransaction);
         console.log('approved txHash', approved.hash);
         const approvedReceipt = await approved.wait();
         console.log('approved receipt', approvedReceipt);
      }

      const tradeTransaction = await wallet.sendTransaction(trade.transaction);
      console.log('trade txHash', tradeTransaction.hash);
      const tradeReceipt = await tradeTransaction.wait();
      console.log('trade receipt', tradeReceipt);

      // once done with trade aka they have sent it and you don't need it anymore call
      trade.destroy();
   };

   etherTradeExample();


   return (
       'hi'
   )
}

export default SwapTest;