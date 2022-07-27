import { Welcome, Transactions } from "./components";
import { TransactionContext } from "./context/TransactionContext";
import React, { useContext } from "react";

const App = () => {
  const { transactions} = useContext(TransactionContext);
  return(
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Welcome />
    </div>
   {transactions.length > 0 ? <Transactions />: null}
  </div>
  )
};

export default App;
