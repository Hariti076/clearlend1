import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex-col gap-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold m-0" style={{ marginBottom: '4px' }}>Application Settings</h1>
                    <p className="text-muted m-0">Manage global preferences and configuration.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6" style={{ maxWidth: '800px' }}>
                {/* Appearance Settings */}
                <div className="card">
                    <h3 className="font-semibold text-lg border-b pb-3 mb-4" style={{ borderColor: 'var(--border-color)' }}>Appearance</h3>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-1rem m-0">Theme Interface</p>
                            <p className="text-muted text-sm m-0 mt-1">Select between Light or Dark active mode across the platform.</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => theme !== 'light' && toggleTheme()}
                                className={`px-4 py-2 font-medium rounded-md text-sm border ${theme === 'light' ? 'bg-primary text-white border-primary' : 'bg-transparent text-secondary border-color'}`}
                                style={{ borderColor: theme === 'light' ? 'var(--primary-color)' : 'var(--border-color)' }}
                            >
                                Light Theme
                            </button>
                            <button
                                onClick={() => theme !== 'dark' && toggleTheme()}
                                className={`px-4 py-2 font-medium rounded-md text-sm border ${theme === 'dark' ? 'bg-primary text-white border-primary' : 'bg-transparent text-secondary border-color'}`}
                                style={{ borderColor: theme === 'dark' ? 'var(--primary-color)' : 'var(--border-color)' }}
                            >
                                Dark Theme
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-1rem m-0">Dashboard Data Density</p>
                            <p className="text-muted text-sm m-0 mt-1">Switch between spacious comfort or heavily compact data.</p>
                        </div>
                        <select className="px-3 py-2 rounded-md border text-sm" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                            <option value="comfortable">Comfortable</option>
                            <option value="compact">Compact (Dense)</option>
                        </select>
                    </div>
                </div>

                {/* Security / View Only */}
                <div className="card">
                    <h3 className="font-semibold text-lg border-b pb-3 mb-4" style={{ borderColor: 'var(--border-color)' }}>Session & Security (View-Only)</h3>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-1rem m-0">Two-Factor Authentication</p>
                            <p className="text-muted text-sm m-0 mt-1">Requires SMS validation on login.</p>
                        </div>
                        <div>
                            <span className="badge badge-success px-3 py-1 text-sm bg-success text-white" style={{ backgroundColor: 'var(--success)' }}>Enabled</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-1rem m-0">Active Sessions</p>
                            <p className="text-muted text-sm m-0 mt-1">Current IP Location: 192.168.x.x (Self)</p>
                        </div>
                        <button className="text-error font-medium text-sm">Terminate All Others</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
