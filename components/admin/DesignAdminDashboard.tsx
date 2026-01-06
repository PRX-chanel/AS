
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { SiteSettings } from '../../types';

const DesignAdminDashboard: React.FC = () => {
  const { siteSettings, setSiteSettings } = useAppContext();
  const [settings, setSettings] = useState<SiteSettings>(siteSettings);
  
  const fonts = [
      { name: 'Vazirmatn (Persian Default)', value: "'Vazirmatn', 'Montserrat', sans-serif" },
      { name: 'Montserrat (English Default)', value: "'Montserrat', 'Vazirmatn', sans-serif" },
      { name: 'Playfair Display (Serif)', value: "'Playfair Display', serif" },
  ];

  const handleSave = () => {
    setSiteSettings(settings);
    alert('تنظیمات با موفقیت ذخیره شد.');
  };

  const handleColorChange = (colorName: keyof SiteSettings['colors'], value: string) => {
    setSettings(prev => ({
        ...prev,
        colors: {
            ...prev.colors,
            [colorName]: value
        }
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
          <h1 className="text-3xl font-bold text-white">طراحی و تنظیمات</h1>
          <p className="text-gray-400">ظاهر و حس وب‌سایت خود را سفارشی کنید.</p>
      </div>

      {/* Theme & Color Settings */}
      <div className="bg-brand-gray p-6 rounded-lg">
        <h2 className="text-2xl text-brand-light mb-4">تم و رنگ‌بندی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                 <h3 className="text-lg text-brand-gold mb-2">انتخاب تم</h3>
                 <div className="flex space-x-4 space-x-reverse bg-gray-900/50 p-2 rounded-lg">
                    <button onClick={() => setSettings({ ...settings, theme: 'dark' })} className={`flex-1 p-2 rounded ${settings.theme === 'dark' ? 'bg-brand-gold text-brand-dark' : ''}`}>لوکس تیره</button>
                    <button onClick={() => setSettings({ ...settings, theme: 'glass' })} className={`flex-1 p-2 rounded ${settings.theme === 'glass' ? 'bg-brand-gold text-brand-dark' : ''}`}>شیشه مایع</button>
                </div>
            </div>
            <div>
                 <h3 className="text-lg text-brand-gold mb-2">رنگ‌های اصلی</h3>
                 <div className="grid grid-cols-2 gap-4">
                    {Object.entries(settings.colors).map(([name, value]) => (
                        <div key={name}>
                            <label className="capitalize text-sm text-gray-300">{name}</label>
                            <div className="flex items-center bg-gray-700 border border-gray-600 rounded-md">
                                <input type="color" value={value} onChange={e => handleColorChange(name as keyof SiteSettings['colors'], e.target.value)} className="w-8 h-8 p-1 bg-transparent border-0" />
                                <input type="text" value={value} onChange={e => handleColorChange(name as keyof SiteSettings['colors'], e.target.value)} className="w-full bg-transparent p-2 text-white focus:outline-none"/>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </div>

      {/* Font Settings */}
      <div className="bg-brand-gray p-6 rounded-lg">
        <h2 className="text-2xl text-brand-light mb-4">فونت و تایپوگرافی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label className="block text-lg text-brand-gold mb-2">فونت اصلی سایت</label>
                <select value={settings.fontFamily} onChange={e => setSettings({...settings, fontFamily: e.target.value})} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white">
                    {fonts.map(font => <option key={font.value} value={font.value}>{font.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="fontSize" className="block text-lg text-brand-gold mb-2">اندازه پایه فونت ({settings.baseFontSize}px)</label>
                <input id="fontSize" type="range" min="12" max="20" step="1" value={settings.baseFontSize} onChange={e => setSettings({...settings, baseFontSize: Number(e.target.value)})} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-gold" />
            </div>
        </div>
      </div>
      
      <div className="flex justify-end">
          <button onClick={handleSave} className="bg-brand-gold text-brand-dark font-bold px-8 py-3 rounded-md hover:bg-yellow-300 transition-all">
              ذخیره تمام تغییرات
          </button>
      </div>
    </div>
  );
};

export default DesignAdminDashboard;
