import { useLocation } from 'react-router';

//import { format } from 'date-fns';
import Logo from '../../shared/Logo/Logo';

const Invoice = () => {
  const { state } = useLocation();

  if (!state) return <div className="p-5 text-red-600">No invoice data found.</div>;

  const { transactionId, user, cartItems, total } = state;

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded shadow">
      {/* Website Logo */}
      <div className="flex items-center gap-3 mb-6">
        <img src="https://i.ibb.co/0VskKqhF/logo.jpg" alt="Website Logo" className="h-12" />
        <h1 className="text-2xl font-bold">Your Pharmacy</h1>
      </div>

      {/* Invoice Info */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Invoice</h2>
        <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
        <p><strong>Transaction ID:</strong> {transactionId}</p>
      </div>

      {/* User Info */}
      <div className="mb-4">
        <h3 className="font-medium">Customer Information</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Purchase Info */}
      <div className="overflow-x-auto">
        <table className="table w-full mb-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine</th>
              <th>Company</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.company || 'N/A'}</td>
                <td>৳{item.price}</td>
                <td>{item.quantity}</td>
                <td>৳{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right text-lg font-bold">
        Grand Total: ৳{total}
      </div>

      <p className="mt-6 text-center text-green-600 font-medium">
        ✅ Thank you for your purchase!
      </p>
    </div>
  );
};

export default Invoice;
