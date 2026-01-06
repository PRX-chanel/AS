
import React, { useState } from 'react';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import { DatabaseIcon } from '../common/Icons';

const DataStorageAdminDashboard: React.FC = () => {
    const { dataStorageDestination, setDataStorageDestination } = useAppContext();
    const t = useTranslation();
    const [repoUrl, setRepoUrl] = useState(''); // Default empty
    const [pat, setPat] = useState('');

    const handleSave = () => {
        // In a real app, this would trigger an API call to save the settings
        alert('تنظیمات ذخیره شد! (شبیه‌سازی شده)');
    };

    const storageOptions = [
        { id: 'local', title: t('localStorage'), description: 'داده‌ها در مرورگر کاربر ذخیره می‌شوند. سریع و ساده، اما دائمی نیست.' },
        { id: 'github', title: t('github'), description: 'داده‌ها در یک ریپازیتوری گیت‌هاب ذخیره می‌شوند. مناسب برای پشتیبان‌گیری.' },
    ];

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white">{t('dataStorage')}</h1>
                <p className="text-gray-400 mt-2">{t('dataStorageDescription')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {storageOptions.map(option => (
                    <div
                        key={option.id}
                        onClick={() => setDataStorageDestination(option.id)}
                        className={`p-6 rounded-lg cursor-pointer border-2 transition-all ${dataStorageDestination === option.id ? 'border-brand-gold bg-brand-gray' : 'border-transparent bg-brand-gray hover:bg-gray-800'}`}
                    >
                        <div className="flex items-center mb-3">
                            <DatabaseIcon className="h-6 w-6 text-brand-gold" />
                            <h3 className="text-xl text-white mr-3">{option.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm">{option.description}</p>
                    </div>
                ))}
            </div>

            {dataStorageDestination === 'github' && (
                <>
                    <div className="bg-brand-gray p-6 rounded-lg space-y-4">
                        <div>
                            <label htmlFor="repoUrl" className="block text-lg text-brand-gold mb-2">{t('githubRepo')}</label>
                            <input
                                id="repoUrl"
                                type="text"
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                                placeholder="https://github.com/your-username/your-repo"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white ltr-input"
                                dir="ltr"
                            />
                        </div>
                         <div>
                            <label htmlFor="pat" className="block text-lg text-brand-gold mb-2">{t('githubToken')}</label>
                            <input
                                id="pat"
                                type="password"
                                value={pat}
                                onChange={(e) => setPat(e.target.value)}
                                placeholder="ghp_..."
                                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white ltr-input"
                                dir="ltr"
                             />
                        </div>
                    </div>
                    
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl text-brand-gold mb-4">{t('githubSetupGuide')}</h3>
                        <ol className="space-y-4 text-gray-300 list-decimal list-inside">
                            <li>
                                <strong className="text-white">{t('githubStep1Title')}</strong>
                                <p className="text-sm mt-1">{t('githubStep1Desc')}</p>
                            </li>
                            <li>
                                <strong className="text-white">{t('githubStep2Title')}</strong>
                                <p className="text-sm mt-1">
                                    {t('githubStep2Desc1')}
                                    <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Personal Access Tokens</a>
                                    {t('githubStep2Desc2')} {t('githubStep2Desc3')}
                                </p>
                            </li>
                            <li>
                                <strong className="text-white">{t('githubStep3Title')}</strong>
                                <p className="text-sm mt-1">{t('githubStep3Desc')}</p>
                            </li>
                        </ol>
                    </div>
                </>
            )}

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    className="bg-brand-gold text-brand-dark font-bold px-8 py-3 rounded-md hover:bg-yellow-300 transition-all"
                >
                    {t('save')}
                </button>
            </div>
        </div>
    );
};

export default DataStorageAdminDashboard;
