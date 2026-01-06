
import React, { useState } from 'react';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import { SupportTicket, TicketStatus } from '../../types';
import Modal from '../common/Modal';

const SupportAdminDashboard: React.FC = () => {
    const { supportTickets, addSupportMessage, updateTicketStatus } = useAppContext();
    const t = useTranslation();
    const [viewingTicket, setViewingTicket] = useState<SupportTicket | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (replyText.trim() && viewingTicket) {
            addSupportMessage(viewingTicket.id, { text: replyText, author: 'admin' });
            setReplyText('');
            // Refresh ticket view
            setViewingTicket(prev => prev ? {...prev, messages: [...prev.messages, {id: 'temp', author: 'admin', authorName: 'Admin', text: replyText, timestamp: new Date().toISOString()}]} : null)
        }
    };
    
    const getStatusColor = (status: TicketStatus) => {
        switch (status) {
            case TicketStatus.OPEN: return 'text-yellow-400 border-yellow-400';
            case TicketStatus.IN_PROGRESS: return 'text-blue-400 border-blue-400';
            case TicketStatus.CLOSED: return 'text-gray-400 border-gray-400';
            default: return 'text-gray-400 border-gray-400';
        }
    };

    return (
        <div className="bg-brand-gray p-6 rounded-lg">
            <h2 className="text-2xl text-brand-light mb-4">{t('support')}</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead className="border-b border-gray-600 text-gray-400">
                        <tr>
                            <th className="p-2">کاربر</th>
                            <th className="p-2">موضوع</th>
                            <th className="p-2">{t('status')}</th>
                            <th className="p-2">{t('lastUpdate')}</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {supportTickets.map(ticket => (
                            <tr key={ticket.id} className="border-b border-gray-700 hover:bg-gray-800">
                                <td className="p-2">{ticket.username}</td>
                                <td className="p-2 truncate max-w-xs">{ticket.subject}</td>
                                <td className={`p-2 font-semibold ${getStatusColor(ticket.status).split(' ')[0]}`}>{ticket.status}</td>
                                <td className="p-2 text-sm text-gray-400">{new Date(ticket.updatedAt).toLocaleString('fa-IR')}</td>
                                <td className="p-2">
                                    <button onClick={() => setViewingTicket(ticket)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">مشاهده</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {supportTickets.length === 0 && <p className="text-center text-gray-400 py-4">{t('noTickets')}</p>}
            </div>

            {viewingTicket && (
                <Modal isOpen={!!viewingTicket} onClose={() => setViewingTicket(null)} title={`${t('ticketDetails')}: ${viewingTicket.subject}`}>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p><strong>کاربر:</strong> {viewingTicket.username}</p>
                            <div>
                                <label className="mr-2">تغییر وضعیت:</label>
                                <select 
                                    value={viewingTicket.status} 
                                    onChange={(e) => updateTicketStatus(viewingTicket.id, e.target.value as TicketStatus)}
                                    className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-white"
                                >
                                    {Object.values(TicketStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        <div className="space-y-3 max-h-64 overflow-y-auto bg-black/20 p-3 rounded-lg">
                            {viewingTicket.messages.map(msg => (
                                <div key={msg.id} className={`p-3 rounded-lg ${msg.author === 'admin' ? 'bg-blue-900/50' : 'bg-gray-700/50'}`}>
                                    <p className="font-semibold text-brand-gold">{msg.authorName}</p>
                                    <p className="text-white whitespace-pre-wrap">{msg.text}</p>
                                    <p className="text-xs text-gray-400 text-left mt-1">{new Date(msg.timestamp).toLocaleString('fa-IR')}</p>
                                </div>
                            ))}
                        </div>
                        
                        <form onSubmit={handleReplySubmit}>
                             <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                                rows={3}
                                placeholder={t('reply') + '...'}
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button type="submit" className="bg-brand-gold text-brand-dark px-4 py-2 rounded-md">{t('sendReply')}</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default SupportAdminDashboard;
