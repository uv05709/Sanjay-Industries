import { useState, useEffect } from 'react';
import { getAdminBulkOrders, updateBulkOrder, deleteBulkOrder } from '../../api';
import { HiSearch, HiTrash, HiCheck, HiX, HiEye } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Loader from '../../components/common/Loader';

const ManageBulkOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await getAdminBulkOrders();
      setOrders(data.bulkOrders || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBulkOrder(id, { status: newStatus });
      setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteBulkOrder(id);
        setOrders(orders.filter(o => o._id !== id));
        if (selectedOrder && selectedOrder._id === id) setSelectedOrder(null);
      } catch (error) {
        alert('Failed to delete order');
      }
    }
  };

  const filteredOrders = orders.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <>
      <SEOHead title="Manage Bulk Orders" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary font-heading">Bulk Orders Enquiry</h1>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-cream-dark flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="relative w-full sm:w-72">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input 
              type="text" 
              placeholder="Search name, email or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 !py-2 text-sm"
            />
          </div>
          <div className="text-sm text-text-light flex items-center">
            Showing {filteredOrders.length} orders
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-cream-dark text-text-dark border-b border-cream-darker">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Client Info</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Qty / Budget</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {filteredOrders.map((order) => (
                <tr key={order._id} className={`hover:bg-cream-50 transition-colors bg-white ${order.status === 'pending' ? 'bg-amber-50/30' : ''}`}>
                  <td className="px-6 py-4 text-text-light">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-primary">{order.name}</div>
                    <div className="text-text-light text-xs">{order.email}</div>
                    {order.companyName && <div className="text-text-light text-xs font-semibold">{order.companyName}</div>}
                  </td>
                  <td className="px-6 py-4 text-text">
                    {order.city}, {order.state}
                  </td>
                  <td className="px-6 py-4 text-text">
                    <div>{order.quantity} pcs</div>
                    <div className="text-xs text-text-light">{order.expectedBudget || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`text-xs font-medium rounded-full px-2 py-1 border-0 focus:ring-0 cursor-pointer ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'fulfilled' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="fulfilled">Fulfilled</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors" title="View Details">
                        <HiEye className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(order._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-text-light">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative z-10">
            <div className="px-6 py-4 border-b border-cream-dark flex justify-between items-center bg-cream-50">
              <div>
                <h2 className="text-xl font-heading font-bold text-primary">Order Details</h2>
                <p className="text-xs text-text-light mt-1">Submitted on {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-text-light hover:text-text-dark">
                <HiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 text-sm text-text">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-primary mb-3 border-b border-cream-dark pb-2">Client Information</h3>
                  <div className="space-y-2">
                    <p><span className="text-text-light">Name:</span> {selectedOrder.name}</p>
                    <p><span className="text-text-light">Company:</span> {selectedOrder.companyName || 'N/A'}</p>
                    <p><span className="text-text-light">Email:</span> <a href={`mailto:${selectedOrder.email}`} className="text-accent hover:underline">{selectedOrder.email}</a></p>
                    <p><span className="text-text-light">Phone:</span> <a href={`tel:${selectedOrder.phone}`} className="text-accent hover:underline">{selectedOrder.phone}</a></p>
                    <p><span className="text-text-light">GST:</span> {selectedOrder.gstNumber || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-primary mb-3 border-b border-cream-dark pb-2">Location</h3>
                  <div className="space-y-2">
                    <p><span className="text-text-light">City:</span> {selectedOrder.city}</p>
                    <p><span className="text-text-light">State:</span> {selectedOrder.state}</p>
                    <p><span className="text-text-light">Country:</span> {selectedOrder.country || 'India'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-primary mb-3 border-b border-cream-dark pb-2">Order Requirements</h3>
                <div className="bg-cream-dark p-4 rounded-md space-y-4">
                  <div>
                    <span className="text-text-light text-xs uppercase tracking-wider block mb-1">Products Required</span>
                    <p className="font-medium">{selectedOrder.products}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-text-light text-xs uppercase tracking-wider block mb-1">Quantity</span>
                      <p className="font-medium">{selectedOrder.quantity}</p>
                    </div>
                    <div>
                      <span className="text-text-light text-xs uppercase tracking-wider block mb-1">Expected Budget</span>
                      <p className="font-medium">{selectedOrder.expectedBudget || 'Not specified'}</p>
                    </div>
                  </div>
                  {selectedOrder.message && (
                    <div>
                      <span className="text-text-light text-xs uppercase tracking-wider block mb-1">Additional Message</span>
                      <p className="italic text-text-dark bg-white p-3 rounded">{selectedOrder.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-cream-dark bg-cream-50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-light">Status:</span>
                <select 
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                  className="input-field !py-1 !text-sm !w-auto"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="fulfilled">Fulfilled</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="btn-primary !py-2 !px-6 text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageBulkOrders;
