"use client";

import React, { useState } from "react";
import { ethers } from "ethers"; // در نسخه ۵ این روش درست است

const WalletConnector = ({ onConnect }) => {
  const [error, setError] = useState(null);

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        // در نسخه ۵ از Web3Provider استفاده می‌کنیم
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        onConnect({ provider, signer, userAddress });
      } catch (err) {
        console.error("خطا در اتصال:", err);
        setError("خطا در اتصال به کیف پول. لطفاً دوباره تلاش کنید.");
      }
    } else {
      setError("کیف پول (مانند MetaMask) یافت نشد!");
    }
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={connectWallet} style={{ padding: "10px 20px", fontSize: "16px" }}>
        اتصال کیف پول
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WalletConnector;
