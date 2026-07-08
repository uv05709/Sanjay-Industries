import { useState, useEffect } from 'react';
import { getAdminMessages, deleteMessage } from '../../api';
import { HiSearch, HiTrash, HiEye, HiX } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Loader from '../../components/common/Loader';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => { fetchMessages(); }, []);
  const fetchMessages = async () => {
    setLoading(true);
    try { const { data } = await getAdminMessages(); setMessages(data.messages || []); } 
    catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try { await deleteMessage(id); setMessages(messages.filter(m => m._id !== id)); if (selectedMessage?._id === id) setSelectedMessage(null); } 
      catch (error) { alert('Error deleting message'); }
    }
  };

  const filteredMessages = messages.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase()));
  if (loading) return <Loader />;

  return (
    <>
      <SEOHead title="Manage Messages" />
      <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-primary font-heading">Contact Messages</h1></div>
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-cream-dark bg-white"><div className="relative w-full sm:w-72"><HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" /><input type="text" placeholder="Search messages..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field pl-10 !py-2 text-sm" /></div></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-cream-dark text-text-dark border-b border-cream-darker"><tr><th className="px-6 py-3 font-medium">Date</th><th className="px-6 py-3 font-medium">From</th><th className="px-6 py-3 font-medium">Subject</th><th className="px-6 py-3 font-medium text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-cream-dark">
              {filteredMessages.map((msg) => (
                <tr key={msg._id} className={`hover:bg-cream-50 transition-colors bg-white ${!msg.isRead ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-6 py-4 text-text-light">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><div className="font-medium text-primary">{msg.name}</div><div className="text-text-light text-xs">{msg.email}</div></td>
                  <td className="px-6 py-4 text-text line-clamp-1 max-w-xs">{msg.subject}</td>
                  <td className="px-6 py-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => setSelectedMessage(msg)} className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors"><HiEye className="w-5 h-5" /></button><button onClick={() => handleDelete(msg._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"><HiTrash className="w-5 h-5" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setSelectedMessage(null)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative z-10">
            <div className="px-6 py-4 border-b border-cream-dark flex justify-between items-center"><h2 className="text-lg font-bold text-primary">Message Details</h2><button onClick={() => setSelectedMessage(null)}><HiX className="w-6 h-6 text-text-light hover:text-text" /></button></div>
            <div className="p-6 text-sm text-text">
              <div className="bg-cream-50 p-4 rounded-md mb-6"><p><span className="font-semibold w-16 inline-block">From:</span> {selectedMessage.name} &lt;{selectedMessage.email}&gt;</p>{selectedMessage.phone && <p><span className="font-semibold w-16 inline-block">Phone:</span> {selectedMessage.phone}</p>}<p><span className="font-semibold w-16 inline-block">Date:</span> {new Date(selectedMessage.createdAt).toLocaleString()}</p></div>
              <h3 className="font-bold text-primary mb-2 border-b border-cream-dark pb-2">Subject: {selectedMessage.subject}</h3>
              <div className="whitespace-pre-wrap mt-4">{selectedMessage.message}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ManageMessages;
