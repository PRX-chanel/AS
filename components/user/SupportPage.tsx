
import React, { useState } from 'react';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import { SupportTicket, TicketStatus } from '../../types';
import Modal from '../common/Modal';
import { PlusIcon } from '../common/Icons';

const SupportPage: React.FC = () => {
    const { supportTickets, currentUser, createSupportTicket, addSupportMessage } = useAppContext();
    const t = useTranslation();
    
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [viewingTicket, setViewingTicket] = useState<SupportTicket | null>(null);

    const [newTicketSubject, setNewTicketSubject] = useState('');
    const [newTicketMessage, setNewTicketMessage] = useState('');
    const [replyText, setReplyText] = useState('');

    const userTickets = supportTickets.filter(t => t.userId === currentUser?.id).sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    const handleCreateTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTicketSubject.trim() && newTicketMessage.trim()) {
            createSupportTicket({ subject: newTicketSubject, message: newTicketMessage });
            alert(t('ticketCreatedSuccess'));
            setCreateModalOpen(false);
            setNewTicketSubject('');
            setNewTicketMessage('');
        }
    };

    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (replyText.trim() && viewingTicket) {
            addSupportMessage(viewingTicket.id, { text: replyText, author: 'user' });
            setReplyText('');
             // Optimistically update the viewing ticket
            setViewingTicket(prev => {
                if (!prev) return null;
                const newMessage = {
                    id: `temp-${Date.now()}`,
                    author: 'user' as const,
                    authorName: currentUser?.username || 'You',
                    text: replyText,
                    timestamp: new Date().toISOString()
                };
                return {
                    ...prev,
                    messages: [...prev.messages, newMessage]
                };
            });
        }
    };
    
    const getStatusColor = (status: TicketStatus) => {
        switch (status) {
            case TicketStatus.OPEN: return 'text-yellow-400';
            case TicketStatus.IN_PROGRESS: return 'text-blue-400';
            case TicketStatus.CLOSED: return 'text-gray-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-serif text-brand-gold">{t('myTickets')}</h1>
                <button onClick={() => setCreateModalOpen(true)} className="flex items-center gap-x-2 bg-brand-gold text-brand-dark font-bold px-4 py-2 rounded-md hover:bg-yellow-300">
                    <PlusIcon className="h-5 w-5" />
                    <span>{t('newTicket')}</span>
                </button>
            </div>

            <div className="space-y-4">
                {userTickets.length > 0 ? (
                    userTickets.map(ticket => (
                        <div key={ticket.id} onClick={() => setViewingTicket(ticket)} className="bg-brand-gray p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-xl text-brand-light">{ticket.subject}</p>
                                    <p className="text-sm text-gray-400">{t('lastUpdate')}: {new Date(ticket.updatedAt).toLocaleString('fa-IR')}</p>
                                </div>
                                <p className={`font-semibold ${getStatusColor(ticket.status)}`}>{ticket.status}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 py-8">{t('noTickets')}</p>
                )}
            </div>

            {/* Create Ticket Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} title={t('newTicket')}>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">{t('subject')}</label>
                        <input type="text" value={newTicketSubject} onChange={(e) => setNewTicketSubject(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">{t('message')}</label>
                        <textarea rows={5} value={newTicketMessage} onChange={(e) => setNewTicketMessage(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white" />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="submit" className="bg-brand-gold text-brand-dark px-6 py-2 rounded-md">{t('createTicket')}</button>
                    </div>
                </form>
            </Modal>
            
            {/* View Ticket Modal */}
            {viewingTicket && (
                 <Modal isOpen={!!viewingTicket} onClose={() => setViewingTicket(null)} title={viewingTicket.subject}>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className={`font-semibold ${getStatusColor(viewingTicket.status)}`}>{t('status')}: {viewingTicket.status}</p>
                        </div>
                        
                        <div className="space-y-3 max-h-64 overflow-y-auto bg-black/20 p-3 rounded-lg">
                            {viewingTicket.messages.map(msg => (
                                <div key={msg.id} className={`p-3 rounded-lg ${msg.author === 'user' ? 'bg-blue-900/50' : 'bg-gray-700/50'}`}>
                                    <p className="font-semibold text-brand-gold">{msg.authorName}</p>
                                    <p className="text-white whitespace-pre-wrap">{msg.text}</p>
                                    <p className="text-xs text-gray-400 text-left mt-1">{new Date(msg.timestamp).toLocaleString('fa-IR')}</p>
                                </div>
                            ))}
                        </div>
                        
                        {viewingTicket.status !== TicketStatus.CLOSED && (
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
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default SupportPage;
