import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // user bill 
    const fetchBills = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/bills', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });
        setBills(response.data);
        // total amount
        const total = response.data.reduce((sum, bill) => sum + bill.amount, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, []);

  const handleCancelDay = async (billId) => {
    try {
      await axios.post(`http://localhost:3001/api/cancel-day/${billId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      
      const updatedBills = bills.map(bill => 
        bill._id === billId ? { ...bill, status: 'Cancelled' } : bill
      );
      setBills(updatedBills);
      
      
      setTotalAmount(totalAmount - 130);
    } catch (error) {
      console.error('Error cancelling day:', error);
    }
  };

  // const handlePayBill = async (billId) => {
  //   try {
  //     await axios.post(http://localhost:3001/api/pay-bill/${billId});
  //     setBills(bills.map(bill => 
  //       bill._id === billId ? { ...bill, paymentStatus: 'Paid', paymentDate: new Date() } : bill
  //     ));
  //     alert('Payment successful');
  //   } catch (err) {
  //     console.error(err);
  //     alert('Payment failed');
  //   }
  // };

  return (
    <div className='container'>
      <h2>Bill History</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill._id}>
              <td>{new Date(bill.date).toLocaleDateString()}</td>
              <td>₹130</td>
              <td>{bill.status}</td>
              <td>
                {bill.status !== 'Cancelled' && (
                  <button 
                    className='btn btn-danger' 
                    onClick={() => handleCancelDay(bill._id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>₹{totalAmount}</strong></td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Bill;