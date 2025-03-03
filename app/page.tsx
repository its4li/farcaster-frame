"use client";

import React, { useState } from "react";
import WalletConnector from "../components/WalletConnector";
import TokenTransactions from "../components/TokenTransactions";

export default function Page() {
  const [user, setUser] = useState<any>(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {!user ? (
        <div>
          <h1>خوش آمدید!</h1>
          <p>لطفاً کیف پول خود را متصل کنید تا ۵ تراکنش اخیر توکن‌های شبکه Base را مشاهده کنید.</p>
          <WalletConnector onConnect={setUser} />
        </div>
      ) : (
        <div>
          <h1>تراکنش‌های اخیر توکن</h1>
          <TokenTransactions userAddress={user.userAddress} />
        </div>
      )}
    </div>
  );
}
