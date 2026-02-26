import React, { useState, useEffect } from 'react';
import { Users, WalletCards, BadgeIndianRupee, Activity, ShieldCheck, PieChart } from 'lucide-react';
import { API_BASE_URL } from '../config';

const StatCard = ({ title, value, subtitle, icon: Icon, trend, colorClass }) => (
    <div className="card flex flex-col justify-between" style={{ height: '140px' }}>
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="text-muted text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-1"><Icon size={12} className={colorClass} /> {title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
            </div>
        </div>
        <div className="flex items-center gap-2 mt-auto pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <span className={`text-xs font-semibold ${trend > 0 ? 'text-success' : 'text-error'}`}>
                {trend > 0 ? '+' : ''}{trend}%
            </span>
            <span className="text-xs text-muted">vs last month</span>
        </div>
    </div>
);

const SummaryCards = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => {
                console.error("Error fetching stats, using fallback:", err);
                setStats({
                    totalBorrowers: 24500,
                    totalLenders: 12400,
                    totalDisbursed: 1540000000,
                    activeEMIs: 18450,
                    avgInterestRate: 14.5,
                    repaymentSuccess: 98.2
                });
            });
    }, []);

    if (!stats) return <div className="h-32 flex items-center justify-center text-muted">Loading metrics...</div>;

    return (
        <div className="grid grid-cols-6 gap-6 mb-6">
            <div className="col-span-2">
                <StatCard
                    title="Total Borrowers"
                    value={stats.totalBorrowers.toLocaleString()}
                    icon={Users}
                    trend={5.2}
                    colorClass="text-info"
                />
            </div>
            <div className="col-span-2">
                <StatCard
                    title="Total Lenders"
                    value={stats.totalLenders.toLocaleString()}
                    icon={WalletCards}
                    trend={12.4}
                    colorClass="text-success"
                />
            </div>
            <div className="col-span-2">
                <StatCard
                    title="Total Disbursed"
                    value={`₹${(stats.totalDisbursed / 10000000).toFixed(2)} Cr`}
                    icon={BadgeIndianRupee}
                    trend={2.1}
                    colorClass="text-primary"
                />
            </div>
            <div className="col-span-2">
                <StatCard
                    title="Active EMIs"
                    value={stats.activeEMIs.toLocaleString()}
                    icon={Activity}
                    trend={8.4}
                    colorClass="text-warning"
                />
            </div>
            <div className="col-span-2">
                <StatCard
                    title="Avg Return"
                    value={`${stats.avgInterestRate}%`}
                    icon={PieChart}
                    trend={0.4}
                    colorClass="text-primary"
                />
            </div>
            <div className="col-span-2">
                <StatCard
                    title="Repayment Success"
                    value={`${stats.repaymentSuccess}%`}
                    icon={ShieldCheck}
                    trend={-0.1}
                    colorClass="text-error"
                />
            </div>
        </div>
    );
};

export default SummaryCards;
