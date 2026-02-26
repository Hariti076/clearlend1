import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie,
    AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const ChartsSection = () => {
    const { theme } = useTheme();
    const textColor = theme === 'dark' ? '#94A3B8' : '#475569';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#E2E8F0';
    const tooltipBg = theme === 'dark' ? '#111827' : '#FFFFFF';
    const tooltipBorder = theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E2E8F0';

    const [disbursementData, setDisbursementData] = useState([]);
    const [emiData, setEmiData] = useState([]);
    const [riskData, setRiskData] = useState([]);
    const [participationData, setParticipationData] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:3000/api/loans/trend').then(res => res.json()),
            fetch('http://localhost:3000/api/loans/emi').then(res => res.json()),
            fetch('http://localhost:3000/api/loans/risk').then(res => res.json()),
            fetch('http://localhost:3000/api/users/participation').then(res => res.json())
        ]).then(([d, e, r, p]) => {
            setDisbursementData(d);
            setEmiData(e);
            setRiskData(r);
            setParticipationData(p);
        }).catch(console.error);
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, padding: '12px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4)' }}>
                    <p className="font-bold mb-2 text-sm">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ color: entry.color, fontSize: '0.875rem', margin: '4px 0', fontWeight: '500' }}>
                            {`${entry.name}: ${entry.value.toLocaleString()}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-2 gap-6 mb-6">

            {/* Chart 1: Loan Disbursement Over Time (Dual Axis Style matching target) */}
            <div className="card w-full" style={{ height: '380px' }}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold m-0">Disbursement Trends</h3>
                    <div className="flex gap-2">
                        <button className="badge" style={{ backgroundColor: 'var(--bg-surface-hover)', color: 'var(--text-primary)' }}>7D</button>
                        <button className="badge" style={{ backgroundColor: 'var(--bg-surface-hover)', color: 'var(--text-primary)' }}>30D</button>
                        <button className="badge badge-primary">6M</button>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="82%">
                    <LineChart data={disbursementData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                        <XAxis dataKey="month" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 100000}L`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="amount" name="Amount (INR)" stroke="var(--primary-color)" strokeWidth={3} dot={{ r: 4, fill: "var(--primary-color)", strokeWidth: 2, stroke: "var(--bg-surface)" }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Chart 2: EMI Repayment Trend */}
            <div className="card w-full" style={{ height: '380px' }}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold m-0">Monthly EMI Realization</h3>
                </div>
                <ResponsiveContainer width="100%" height="82%">
                    <AreaChart data={emiData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#64748b" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#64748b" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                        <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                        <Area type="monotone" dataKey="expected" name="Expected" stroke="#64748b" fillOpacity={1} fill="url(#colorExpected)" />
                        <Area type="monotone" dataKey="received" name="Received" stroke="#10b981" fillOpacity={1} fill="url(#colorReceived)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Chart 3: Risk Grade Distribution */}
            <div className="card w-full" style={{ height: '340px' }}>
                <h3 className="font-semibold text-lg mb-6 m-0">Risk Distribution</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={riskData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                        <XAxis dataKey="grade" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip cursor={{ fill: gridColor, opacity: 0.5 }} contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px' }} />
                        <Bar dataKey="count" name="Total Loans" radius={[6, 6, 0, 0]}>
                            {riskData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Chart 4: Ecosystem Participation */}
            <div className="card w-full" style={{ height: '340px' }}>
                <h3 className="font-semibold text-lg mb-6 m-0">Platform Participation</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <RechartsPie>
                        <Pie
                            data={participationData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={110}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {participationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                    </RechartsPie>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default ChartsSection;
