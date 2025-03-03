// components/TokenTransactions.js
import React, { useEffect, useState } from "react";

async function fetchRecentTokenTransactions(userAddress) {
  const apiKey = process.env.NEXT_PUBLIC_COVALENT_API_KEY; // API Key از متغیر محیطی
  const chainId = 8453; // شناسه زنجیره Base (بررسی کنید که صحیح است)
  // استفاده از endpoint Covalent برای تراکنش‌های انتقال توکن
  const url = `https://api.covalenthq.com/v1/${chainId}/address/${userAddress}/transfers_v2/?quote-currency=USD&format=JSON&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json && json.data && json.data.items) {
      // مرتب‌سازی تراکنش‌ها به ترتیب نزولی بر اساس تاریخ
      const sortedTransfers = json.data.items.sort(
        (a, b) => new Date(b.block_signed_at) - new Date(a.block_signed_at)
      );
      // انتخاب ۵ تراکنش اخیر
      return sortedTransfers.slice(0, 5);
    }
    return [];
  } catch (error) {
    console.error("خطا در دریافت تراکنش‌ها:", error);
    return [];
  }
}

const TokenTransactions = ({ userAddress }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getTransactions() {
      const txs = await fetchRecentTokenTransactions(userAddress);
      setTransactions(txs);
    }
    if (userAddress) {
      getTransactions();
    }
  }, [userAddress]);

  return (
    <div>
      <h2>آخرین ۵ تراکنش توکن</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((tx, index) => (
            <li key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
              <div><strong>توکن:</strong> {tx.contract_ticker_symbol}</div>
              <div><strong>عملیات:</strong> {tx.transfer_type}</div>
              <div>
                <strong>زمان:</strong> {new Date(tx.block_signed_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>تراکنشی یافت نشد.</p>
      )}
    </div>
  );
};

export default TokenTransactions;
