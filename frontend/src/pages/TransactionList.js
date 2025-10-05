import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../services/api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionAPI.getMyTransactions();
      setTransactions(response.data.results || response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load transactions. Backend may not be running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      in_progress: '#2196f3',
      completed: '#4caf50',
      cancelled: '#f44336'
    };
    return colors[status] || '#757575';
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <h1>My Transactions</h1>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {transactions.length === 0 ? (
        <div className="card">
          <div className="card-body text-center">
            <p>No transactions yet. Start by registering products or making transfers.</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Product</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>From</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>To</th>
                <th style={{ padding: '15px', textAlign: 'right' }}>Quantity</th>
                <th style={{ padding: '15px', textAlign: 'right' }}>Price</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '15px' }}>
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '15px', textTransform: 'capitalize' }}>
                    {transaction.transaction_type}
                  </td>
                  <td style={{ padding: '15px' }}>
                    {transaction.product?.name || 'N/A'}
                  </td>
                  <td style={{ padding: '15px' }}>
                    {transaction.from_user?.username || 'N/A'}
                  </td>
                  <td style={{ padding: '15px' }}>
                    {transaction.to_user?.username || 'N/A'}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'right' }}>
                    {transaction.quantity} kg
                  </td>
                  <td style={{ padding: '15px', textAlign: 'right' }}>
                    {transaction.price ? `${transaction.price.toLocaleString()} RWF` : 'N/A'}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <span style={{
                      background: getStatusColor(transaction.status),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {transaction.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
