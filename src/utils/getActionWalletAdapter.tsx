import {
  ActionAdapter,
  ActionContext,
  BlockchainIds,
} from "@dialectlabs/blinks-react-native";
import { useMobileWallet } from "./useMobileWallet";
import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { useAuthorization } from "./useAuthorization";
import { useConnection } from "./ConnectionProvider";

export const getActionWalletAdapter = (): ActionAdapter => {
  const { connection } = useConnection();
  const wallet = useMobileWallet();
  const { selectedAccount } = useAuthorization();
  return {
    metadata: {
      supportedBlockchainIds: [BlockchainIds.SOLANA_MAINNET],
    },
    connect: async (_context: ActionContext) => {
      return selectedAccount?.publicKey.toString() as string;
    },
    signTransaction: async (_tx: string, _context: ActionContext) => {
      let tx = null;
      try {
        tx = VersionedTransaction.deserialize(Buffer.from(_tx, "base64"));
      } catch (e) {
        console.log(e);
      }
      let sig = await wallet.signAndSendTransaction(tx as VersionedTransaction);
      console.log(sig);
      return {
        signature: sig,
      };
    },
    confirmTransaction: async (_signature: string, _context: ActionContext) => {
      let res = await connection.confirmTransaction(_signature);
      if (res.value.err) {
        throw new Error("Transaction failed");
      }
    },
  };
};
