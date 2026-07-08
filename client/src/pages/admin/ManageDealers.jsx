import { useState, useEffect } from 'react';
import { getAdminDealers, updateDealer, deleteDealer } from '../../api';
import { HiSearch, HiTrash, HiX, HiEye } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Loader from '../../components/common/Loader';

const ManageDealers = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDealer, setSelectedDealer] = useState(null);

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    setLoading(true);
    try {
      const { data } = await getAdminDealers();
      setDealers(data.dealers || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDealer(id, { status: newStatus });
      setDealers(dealers.map(d => d._id === id ? { ...d, status: newStatus } : d));
      if (selectedDealer && selectedDealer._id === id) {
        setSelectedDealer({ ...selectedDealer, status: newStatus });
      }
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this dealer application?')) {
      try {
        await deleteDealer(id);
        setDealers(dealers.filter(d => d._id !== id));
        if (selectedDealer && selectedDealer._id === id) setSelectedDealer(null);
      } catch (error) {
        alert('Failed to delete dealer');
      }
    }
  };

  const filteredDealers = dealers.filter(d => 
    d.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <>
      <SEOHead title="Manage Dealers" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary font-heading">Dealer Applications</h1>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-cream-dark flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="relative w-full sm:w-72">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input 
              type="text" 
              placeholder="Search company, name or city..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 !py-2 text-sm"
            />
          </div>
          <div className="text-sm text-text-light flex items-center">
            Showing {filteredDealers.length} dealers
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-cream-dark text-text-dark border-b border-cream-darker">
              <tr>
                <th className="px-6 py-3 font-medium">Company</th>
                <th className="px-6 py-3 font-medium">Contact Person</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {filteredDealers.map((dealer) => (
                <tr key={dealer._id} className={`hover:bg-cream-50 transition-colors bg-white ${dealer.status === 'pending' ? 'bg-amber-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-primary">{dealer.companyName}</div>
                    <div className="text-text-light text-xs">GST: {dealer.gstNumber || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-text">{dealer.name}</div>
                    <div className="text-text-light text-xs">{dealer.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-text">
                    {dealer.city}, {dealer.state}
                  </td>
                  <td className="px-6 py-4 text-text capitalize">
                    {dealer.businessType.replace('-', ' ')}
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={dealer.status}
                      onChange={(e) => handleStatusChange(dealer._id, e.target.value)}
                      className={`text-xs font-medium rounded-full px-2 py-1 border-0 focus:ring-0 cursor-pointer ${
                        dealer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        dealer.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedDealer(dealer)} className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors" title="View Details">
                        <HiEye className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(dealer._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDealers.length === 0 && (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-text-light">No dealers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedDealer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setSelectedDealer(null)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative z-10">
            <div className="px-6 py-4 border-b border-cream-dark flex justify-between items-center bg-cream-50">
              <div>
                <h2 className="text-xl font-heading font-bold text-primary">Dealer Application Profile</h2>
                <p className="text-xs text-text-light mt-1">Submitted on {new Date(selectedDealer.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedDealer(null)} className="text-text-light hover:text-text-dark">
                <HiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 text-sm text-text">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-primary mb-4 border-b border-cream-dark pb-2">Business Details</h3>
                  <div className="space-y-3">
                    <p><span className="text-text-light w-24 inline-block">Company:</span> <span className="font-medium">{selectedDealer.companyName}</span></p>
                    <p><span className="text-text-light w-24 inline-block">Type:</span> <span className="capitalize">{selectedDealer.businessType.replace('-', ' ')}</span></p>
                    <p><span className="text-text-light w-24 inline-block">GSTIN:</span> {selectedDealer.gstNumber || 'Not provided'}</p>
                    <p><span className="text-text-light w-24 inline-block">Years Active:</span> {selectedDealer.yearsInBusiness || 'Not provided'}</p>
                    <p><span className="text-text-light w-24 inline-block">Turnover:</span> {selectedDealer.annualTurnover || 'Not provided'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-primary mb-4 border-b border-cream-dark pb-2">Contact & Location</h3>
                  <div className="space-y-3">
                    <p><span className="text-text-light w-24 inline-block">Contact:</span> <span className="font-medium">{selectedDealer.name}</span></p>
                    <p><span className="text-text-light w-24 inline-block">Phone:</span> <a href={`tel:${selectedDealer.phone}`} className="text-accent hover:underline">{selectedDealer.phone}</a></p>
                    <p><span className="text-text-light w-24 inline-block">Email:</span> <a href={`mailto:${selectedDealer.email}`} className="text-accent hover:underline">{selectedDealer.email}</a></p>
                    <p><span className="text-text-light w-24 inline-block">Location:</span> {selectedDealer.city}, {selectedDealer.state}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-primary mb-3 border-b border-cream-dark pb-2">Interests & Messages</h3>
                <div className="bg-cream-dark p-4 rounded-md space-y-4">
                  <div>
                    <span className="text-text-light text-xs uppercase tracking-wider block mb-1">Products of Interest</span>
                    <p className="font-medium">{selectedDealer.productInterest || 'Not specified'}</p>
                  </div>
                  {selectedDealer.message && (
                    <div>
                      <span className="text-text-light text-xs uppercase tracking-wider block mb-1">Additional Message</span>
                      <p className="text-text-dark">{selectedDealer.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-cream-dark bg-cream-50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-light">Status:</span>
                <select 
                  value={selectedDealer.status}
                  onChange={(e) => handleStatusChange(selectedDealer._id, e.target.value)}
                  className="input-field !py-1 !text-sm !w-auto"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <button onClick={() => setSelectedDealer(null)} className="btn-primary !py-2 !px-6 text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageDealers;
