import React, { useState, useEffect } from 'react';
import { Activity, ArrowRight, CircleCheck, AlertTriangle, IndianRupee } from 'lucide-react';
import { API_BASE_URL } from '../config';

export const PulsePanel = () => {
    const [pulse, setPulse] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/pulse`)
            .then(res => res.json())
            .then(data => setPulse(data))
            .catch(console.error);
    }, []);

    return (
        <div className="card w-full h-full">
            <div className="flex justify-between items-center mb-6 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="font-semibold text-md m-0 flex items-center gap-2">
                    <Activity size={18} className="text-secondary" /> Ecosystem Pulse
                </h3>
                <span className="badge badge-success px-2 py-1 text-xs bg-success flex items-center gap-1" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span> Live
                </span>
            </div>

            <div className="flex-col gap-5 overflow-y-auto pr-2" style={{ maxHeight: '400px' }}>
                {pulse.map((activity) => (
                    <div key={activity.id} className="flex gap-3 items-start p-3 rounded-md transition-colors" style={{ backgroundColor: 'var(--bg-main)' }}>
                        <div className={`p-2 rounded-full mt-1 ${activity.type === 'risk_alert' ? 'bg-error text-white' :
                            activity.type === 'repayment' ? 'bg-success text-white' :
                                activity.type === 'loan_match' ? 'bg-primary text-white' : 'bg-warning text-white'
                            }`}>
                            {activity.type === 'risk_alert' ? <AlertTriangle size={14} /> :
                                activity.type === 'repayment' ? <CircleCheck size={14} /> :
                                    activity.type === 'loan_match' ? <IndianRupee size={14} /> : <Activity size={14} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-sm m-0">{activity.message}</p>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-muted font-medium m-0">Ref: {activity.entity}</p>
                                <span className="text-[10px] text-muted">{activity.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="w-full py-2 text-sm text-primary font-medium hover:underline mt-4 flex justify-center items-center gap-1">
                    View All Activity <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
};

export const SideSnapshotPanel = () => {
    const [borrowers, setBorrowers] = useState([]);
    const [lenders, setLenders] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/users/borrowers`).then(res => res.json()).then(setBorrowers).catch(console.error);
        fetch(`${API_BASE_URL}/api/users/lenders`).then(res => res.json()).then(setLenders).catch(console.error);
    }, []);

    return (
        <div className="flex-col gap-6">

            {/* Borrower Snapshots */}
            <div className="card border-l-4" style={{ borderLeftColor: 'var(--primary-color)' }}>
                <div className="flex justify-between items-center mb-4 pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted m-0">Top Active Borrowers</h3>
                    <span className="text-xs text-primary font-medium cursor-pointer">Directory</span>
                </div>

                <div className="flex-col gap-4">
                    {borrowers.map((b) => (
                        <div key={b.id} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'transparent' }}>
                            <div>
                                <p className="font-bold text-sm m-0">{b.name}</p>
                                <div className="flex gap-2 items-center mt-1">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${b.grade === 'A' ? 'bg-success text-white' : b.grade === 'B' ? 'bg-primary text-white' : b.grade === 'C' ? 'bg-warning text-white' : 'bg-error text-white'}`} style={{ backgroundColor: b.grade === 'A' ? 'var(--success)' : b.grade === 'B' ? 'var(--primary-light)' : b.grade === 'C' ? 'var(--warning)' : 'var(--error)' }}>{b.grade}</span>
                                    <span className="text-xs text-muted">{b.rate}% APR</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-info m-0">{b.score} <span className="text-muted font-normal text-[10px]">CIBIL</span></p>
                                <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                    <div className="h-full bg-primary" style={{ width: `${b.funding}%`, backgroundColor: 'var(--primary-color)' }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lender Snapshots */}
            <div className="card border-l-4" style={{ borderLeftColor: 'var(--secondary-color)' }}>
                <div className="flex justify-between items-center mb-4 pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted m-0">Top Active Lenders</h3>
                    <span className="text-xs text-secondary font-medium cursor-pointer">Directory</span>
                </div>

                <div className="flex-col gap-4">
                    {lenders.map((l) => (
                        <div key={l.id} className="flex justify-between items-center p-2 rounded">
                            <div>
                                <p className="font-bold text-sm m-0">{l.name}</p>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{l.preference}</span>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm text-success m-0" style={{ color: 'var(--secondary-color)' }}>₹{(l.balance / 100000).toFixed(1)}L</p>
                                <span className="text-[10px] text-muted font-medium">Min {l.minRate}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};
