
import React, { useState } from 'react';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import { DatabaseIcon, PlusIcon, EditIcon, TrashIcon, SpinnerIcon, CheckCircleIcon } from '../common/Icons';
import Modal from '../common/Modal';
import { GithubConnection } from '../../types';

const DataStorageAdminDashboard: React.FC = () => {
    const { 
        activeStorageId, 
        setActiveStorageId,
        githubConnections,
        addGithubConnection,
        updateGithubConnection,
        deleteGithubConnection
     } = useAppContext();
    const t = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingConnection, setEditingConnection] = useState<GithubConnection | null>(null);
    const [repoUrl, setRepoUrl] = useState('');
    const [pat, setPat] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleOpenModal = (conn: GithubConnection | null = null) => {
        setEditingConnection(conn);
        setRepoUrl(conn ? conn.repoUrl : '');
        setPat(conn ? conn.pat : '');
        setError('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingConnection(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const actionPromise = editingConnection
            ? updateGithubConnection(editingConnection.id, repoUrl, pat)
            : addGithubConnection(repoUrl, pat);
        
        const success = await actionPromise;

        setIsLoading(false);
        if (success) {
            handleCloseModal();
        } else {
            setError(t('validationError'));
        }
    };

    const handleDelete = (id: string) => {
        if(window.confirm(t('confirmDeleteConnection'))) {
            deleteGithubConnection(id);
        }
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white">{t('dataStorage')}</h1>
                <p className="text-gray-400 mt-2">{t('dataStorageDescription')}</p>
            </div>

            <div className="bg-brand-gray p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-brand-light">{t('connectedStorages')}</h2>
                    <button onClick={() => handleOpenModal()} className="flex items-center gap-x-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 text-sm">
                        <PlusIcon className="h-4 w-4" />
                        <span>{t('addNewConnection')}</span>
                    </button>
                </div>
                <div className="space-y-3">
                    {/* Local Storage Item */}
                    <div className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center gap-x-3">
                            <DatabaseIcon className="h-6 w-6 text-brand-gold"/>
                            <div>
                                <p className="font-semibold text-white">{t('localStorage')}</p>
                                <p className="text-xs text-gray-400">ذخیره در مرورگر</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            {activeStorageId === 'local' ? (
                                <span className="flex items-center gap-x-1.5 text-green-400 font-semibold text-sm">
                                    <CheckCircleIcon className="h-5 w-5"/>
                                    {t('active')}
                                </span>
                            ) : (
                                <button onClick={() => setActiveStorageId('local')} className="bg-green-600/50 text-white px-3 py-1 rounded text-xs hover:bg-green-600/80">{t('activate')}</button>
                            )}
                        </div>
                    </div>
                    {/* GitHub Connection Items */}
                    {githubConnections.map(conn => (
                         <div key={conn.id} className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                            <div className="flex items-center gap-x-3">
                                <DatabaseIcon className="h-6 w-6 text-brand-gold"/>
                                <div>
                                    <p className="font-semibold text-white">{t('github')}</p>
                                    <p className="text-xs text-gray-400">{conn.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2 sm:gap-x-4">
                                {activeStorageId === conn.id ? (
                                    <span className="flex items-center gap-x-1.5 text-green-400 font-semibold text-sm">
                                        <CheckCircleIcon className="h-5 w-5"/>
                                        {t('active')}
                                    </span>
                                ) : (
                                    <button onClick={() => setActiveStorageId(conn.id)} className="bg-green-600/50 text-white px-3 py-1 rounded text-xs hover:bg-green-600/80">{t('activate')}</button>
                                )}
                                <button onClick={() => handleOpenModal(conn)} className="text-blue-400 hover:text-blue-300 p-1"><EditIcon className="h-5 w-5"/></button>
                                <button onClick={() => handleDelete(conn.id)} className="text-red-500 hover:text-red-400 p-1"><TrashIcon className="h-5 w-5"/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingConnection ? t('editConnection') : t('addNewConnection')}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="repoUrl" className="block text-lg text-brand-gold mb-2">{t('githubRepo')}</label>
                        <input id="repoUrl" type="text" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/your-username/your-repo" required className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white ltr-input" dir="ltr" />
                    </div>
                    <div>
                        <label htmlFor="pat" className="block text-lg text-brand-gold mb-2">{t('githubToken')}</label>
                        <input id="pat" type="password" value={pat} onChange={(e) => setPat(e.target.value)} placeholder="ghp_..." required className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white ltr-input" dir="ltr" />
                    </div>
                    
                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <div className="flex justify-end items-center pt-4">
                         {isLoading && <SpinnerIcon className="h-6 w-6 text-brand-gold ml-4" />}
                        <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2" disabled={isLoading}>لغو</button>
                        <button type="submit" className="bg-brand-gold text-brand-dark px-6 py-2 rounded-md hover:bg-yellow-300 disabled:opacity-50" disabled={isLoading}>
                            {t('save')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DataStorageAdminDashboard;
