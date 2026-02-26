import React, { useState } from 'react';
import { Activity, ShieldCheck, Wallet, History, AlertTriangle, UserPlus, CreditCard, PieChart, X, Users } from 'lucide-react';

const HeroBanner = ({ tag, titlePrimary, titleHighlight, description, stats, colorMode }) => {
    return (
        <div className="relative overflow-hidden p-8 rounded-2xl border border-border bg-card shadow-sm mb-8 transition-all duration-200">
            {/* Background Decorative Element */}
            <div className={`absolute -right-[10%] -top-[50%] w-[500px] h-[500px] rounded-full pointer-events-none ${colorMode === 'admin' ? 'bg-[radial-gradient(circle,_oklch(var(--chart-2)/0.15)_0%,_transparent_70%)]' :
                    colorMode === 'borrower' ? 'bg-[radial-gradient(circle,_oklch(var(--primary)/0.15)_0%,_transparent_70%)]' :
                        'bg-[radial-gradient(circle,_oklch(var(--success)/0.15)_0%,_transparent_70%)]'
                }`}></div>

            <div className="flex justify-between items-center relative z-10 w-full">
                <div className="max-w-[600px]">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{tag}</p>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-3">
                        {titlePrimary} <span className={colorMode === 'borrower' ? 'text-primary' : colorMode === 'lender' ? 'text-success' : 'text-chart-2'}>{titleHighlight}</span>
                    </h1>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                        {description}
                    </p>

                    <div className="flex gap-4 mt-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col justify-center items-center py-4 px-6 rounded-xl border border-border bg-muted/30 min-w-[130px] shadow-sm">
                                <div className="flex justify-center mb-1.5">{stat.icon}</div>
                                <h3 className={`text-xl font-bold text-center ${stat.colorClass}`}>{stat.value}</h3>
                                <p className="text-xs font-semibold text-muted-foreground text-center mt-1 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:flex justify-center items-center w-[320px] h-[220px] bg-muted/20 rounded-2xl border border-border">
                    <ShieldCheck className="w-20 h-20 text-primary opacity-30" />
                </div>
            </div>
        </div>
    );
};

export const BorrowerDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [loanAmount, setLoanAmount] = useState('');
    const [loanPurpose, setLoanPurpose] = useState('');
    const [loanTenure, setLoanTenure] = useState('36');

    const interestRate = 12.5;
    const expectedEmi = loanAmount ? Math.round((parseInt(loanAmount) * (1 + (interestRate / 100) * (parseInt(loanTenure) / 12))) / parseInt(loanTenure)) : 0;
    const totalRepayment = expectedEmi * parseInt(loanTenure);

    const handleNextStep = (e) => {
        e.preventDefault();
        setModalStep(2);
    };

    const handleSubmit = async () => {
        // Normally an API call would go here
        setModalStep(3);
    };

    const resetModal = () => {
        setShowModal(false);
        setModalStep(1);
        setLoanAmount('');
        setLoanPurpose('');
        setLoanTenure('36');
    };

    return (
        <div className="animate-in fade-in duration-500">
            {showModal && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-center">
                    <div className="bg-card w-[480px] rounded-2xl border border-border shadow-2xl overflow-hidden p-6 animate-in slide-in-from-bottom-4 zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                            <h3 className="font-bold text-lg text-foreground">Apply for a New Loan</h3>
                            <button onClick={resetModal} className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {modalStep < 3 && (
                            <div className="flex gap-2 mb-8">
                                <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
                                <div className={`h-1.5 flex-1 rounded-full ${modalStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                            </div>
                        )}

                        {modalStep === 1 && (
                            <form onSubmit={handleNextStep} className="flex flex-col gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Requested Amount (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(e.target.value)}
                                        placeholder="Min: 50000"
                                        min="50000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Primary Purpose</label>
                                    <select
                                        required
                                        className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={loanPurpose}
                                        onChange={(e) => setLoanPurpose(e.target.value)}
                                    >
                                        <option value="" disabled>Select a Reason</option>
                                        <option value="business">Business Expansion / Inventory</option>
                                        <option value="medical">Medical Emergency</option>
                                        <option value="education">Higher Education</option>
                                        <option value="renovation">Home Renovation</option>
                                    </select>
                                </div>
                                <div className="space-y-2 mb-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-semibold text-foreground">Tenure (Months)</label>
                                        <span className="text-sm font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">{loanTenure} Months</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="6"
                                        max="60"
                                        step="6"
                                        value={loanTenure}
                                        onChange={(e) => setLoanTenure(e.target.value)}
                                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-xs font-medium text-muted-foreground pt-1">
                                        <span>6</span>
                                        <span>Interest Rate: 12.5% p.a.</span>
                                        <span>60</span>
                                    </div>
                                </div>
                                <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-2">
                                    Next Step
                                </button>
                            </form>
                        )}

                        {modalStep === 2 && (
                            <div className="flex flex-col">
                                <p className="text-sm text-muted-foreground mb-6">Review your estimated repayment schedule before submitting.</p>

                                <div className="bg-muted/30 border border-border rounded-xl p-5 mb-8">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium text-muted-foreground">Loan Amount</span>
                                        <span className="font-bold text-foreground">₹{parseInt(loanAmount).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium text-muted-foreground">Interest Rate (p.a.)</span>
                                        <span className="font-bold text-foreground">12.5%</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm font-medium text-muted-foreground">Tenure</span>
                                        <span className="font-bold text-foreground">{loanTenure} Months</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-border">
                                        <span className="font-bold text-primary">Monthly EMI</span>
                                        <span className="font-extrabold text-xl text-primary">₹{expectedEmi.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs font-medium text-muted-foreground">Total Repayment</span>
                                        <span className="text-xs font-bold text-foreground">₹{totalRepayment.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setModalStep(1)}
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </div>
                        )}

                        {modalStep === 3 && (
                            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95 duration-300">
                                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-8 h-8 text-success" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Application Received!</h2>
                                <p className="text-sm text-muted-foreground mb-8">
                                    Your loan request for <span className="font-bold text-foreground">₹{parseInt(loanAmount).toLocaleString('en-IN')}</span> has been submitted successfully and is pending admin review.
                                </p>
                                <button
                                    type="button"
                                    onClick={resetModal}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-success text-success-foreground hover:bg-success/90 h-10 px-4 py-2 w-full"
                                >
                                    View Loan Progress
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <HeroBanner
                tag="Borrower Dashboard"
                titlePrimary="Your Borrowing Journey,"
                titleHighlight="Simplified"
                description="ClearLend gives you access to flexible tranche-based loans with transparent EMI schedules. Track your repayments, monitor funding progress, and stay on top of every milestone — all in one place."
                colorMode="borrower"
                stats={[
                    { icon: <CreditCard className="w-5 h-5 text-primary" />, value: '3', label: 'Active Loans', colorClass: 'text-primary' },
                    { icon: <History className="w-5 h-5 text-success" />, value: '24', label: 'EMIs Paid', colorClass: 'text-success' },
                    { icon: <Activity className="w-5 h-5 text-chart-5" />, value: 'Mar 5', label: 'Next EMI Due', colorClass: 'text-chart-5' },
                    { icon: <PieChart className="w-5 h-5 text-chart-3" />, value: '78%', label: 'Avg. Funding', colorClass: 'text-chart-3' }
                ]}
            />

            <div className="flex justify-between items-end mb-6 mt-12">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">My Loans</h2>
                    <p className="text-sm text-muted-foreground mt-1">Track your active loans, EMIs, and repayment history</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    <UserPlus className="w-4 h-4" /> Apply for Loan
                </button>
            </div>

            <div className="mb-4">
                <span className="inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-success/20 text-success uppercase">Active Loans (2)</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm border-t-4 border-t-primary overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs font-mono font-bold text-muted-foreground tracking-wider mb-1">LN-2024-0891</p>
                                <h2 className="text-3xl font-extrabold tracking-tight">₹3,50,000</h2>
                            </div>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-success text-success-foreground">ACTIVE</span>
                        </div>
                        <div className="grid grid-cols-3 divide-x divide-border bg-muted/40 rounded-lg p-4">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Rate</p>
                                <p className="font-bold text-foreground">12.5%</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Tenure</p>
                                <p className="font-bold text-foreground">36mo</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">EMI</p>
                                <p className="font-bold text-primary text-lg">₹12K</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm border-t-4 border-t-primary overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs font-mono font-bold text-muted-foreground tracking-wider mb-1">LN-2025-0234</p>
                                <h2 className="text-3xl font-extrabold tracking-tight">₹1,50,000</h2>
                            </div>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-success text-success-foreground">ACTIVE</span>
                        </div>
                        <div className="grid grid-cols-3 divide-x divide-border bg-muted/40 rounded-lg p-4">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Rate</p>
                                <p className="font-bold text-foreground">10.8%</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Tenure</p>
                                <p className="font-bold text-foreground">24mo</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">EMI</p>
                                <p className="font-bold text-primary text-lg">₹7K</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LenderDashboard = () => {
    const [showInvestModal, setShowInvestModal] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [selectedBorrower, setSelectedBorrower] = useState(null);
    const [investmentAmount, setInvestmentAmount] = useState('');

    const availableBorrowers = [
        { id: 1, name: 'Arjun Mehta', grade: 'B', rate: 12.5, funding: 87, req: 350000 },
        { id: 2, name: 'Priya Sharma', grade: 'A', rate: 10.8, funding: 42, req: 150000 },
        { id: 3, name: 'Vikram Singh', grade: 'C', rate: 14.2, funding: 15, req: 500000 }
    ];

    const expectedReturn = investmentAmount && selectedBorrower ? Math.round((parseInt(investmentAmount) * (selectedBorrower.rate / 100))) : 0;
    const totalReturn = investmentAmount ? parseInt(investmentAmount) + expectedReturn : 0;

    const handleNextStep = (e) => {
        if (e) e.preventDefault();
        setModalStep(prev => prev + 1);
    };

    const handleSelectBorrower = (borrower) => {
        setSelectedBorrower(borrower);
        setModalStep(2);
    };

    const handleInvest = async () => {
        setModalStep(4);
    };

    const resetModal = () => {
        setShowInvestModal(false);
        setModalStep(1);
        setSelectedBorrower(null);
        setInvestmentAmount('');
    };

    return (
        <div className="animate-in fade-in duration-500">
            {showInvestModal && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-center">
                    <div className="bg-card w-[500px] rounded-2xl border border-border shadow-2xl overflow-hidden p-6 animate-in slide-in-from-bottom-4 zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                            <h3 className="font-bold text-lg text-foreground">Lend / Fund a Borrower</h3>
                            <button onClick={resetModal} className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {modalStep < 4 && (
                            <div className="flex gap-2 mb-8">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className={`h-1.5 flex-1 rounded-full ${modalStep >= step ? 'bg-primary' : 'bg-muted'}`}></div>
                                ))}
                            </div>
                        )}

                        {modalStep === 1 && (
                            <div className="flex flex-col">
                                <p className="text-sm text-muted-foreground mb-6">Select a verified borrower to fund from the open marketplace.</p>
                                <div className="flex flex-col gap-3">
                                    {availableBorrowers.map((b) => (
                                        <div key={b.id} onClick={() => handleSelectBorrower(b)} className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all shadow-sm">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold text-foreground">{b.name}</span>
                                                    <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-bold uppercase transition-colors border-transparent ${b.grade === 'A' ? 'bg-success/20 text-success' : b.grade === 'B' ? 'bg-primary/20 text-primary' : 'bg-warning/20 text-warning'}`}>Grade {b.grade}</span>
                                                </div>
                                                <span className="font-bold text-primary">{b.rate}% p.a.</span>
                                            </div>
                                            <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                                <span>Req: ₹{b.req.toLocaleString('en-IN')}</span>
                                                <span className="text-success">{b.funding}% Funded</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {modalStep === 2 && (
                            <form onSubmit={handleNextStep} className="flex flex-col gap-5">
                                <div className="rounded-xl bg-muted/40 border border-border p-4 mb-2">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Funding Borrower</p>
                                    <p className="font-bold text-foreground text-lg">{selectedBorrower?.name} <span className="text-primary text-sm font-semibold ml-2">({selectedBorrower?.rate}% p.a.)</span></p>
                                </div>
                                <div className="space-y-2 mb-6">
                                    <label className="text-sm font-semibold text-foreground">Investment Amount (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={investmentAmount}
                                        onChange={(e) => setInvestmentAmount(e.target.value)}
                                        placeholder="Min: 10,000"
                                        min="10000"
                                        step="5000"
                                    />
                                    <div className="flex justify-between items-center mt-2 px-1">
                                        <p className="text-xs font-medium text-muted-foreground">Available Balance: <span className="font-bold text-foreground">₹3,20,000</span></p>
                                        <button type="button" onClick={() => setInvestmentAmount(320000)} className="text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded transition-colors">Max</button>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setModalStep(1)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1">
                                        Back
                                    </button>
                                    <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1">
                                        Next Step
                                    </button>
                                </div>
                            </form>
                        )}

                        {modalStep === 3 && (
                            <div className="flex flex-col">
                                <p className="text-sm text-muted-foreground mb-6">Review your projected returns before confirming the transfer.</p>

                                <div className="bg-muted/30 border border-border rounded-xl p-5 mb-8">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium text-muted-foreground">Investment Principal</span>
                                        <span className="font-bold text-foreground">₹{parseInt(investmentAmount).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium text-muted-foreground">Borrower Risk Grade</span>
                                        <span className="inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-bold uppercase transition-colors border-transparent bg-muted text-muted-foreground">Grade {selectedBorrower?.grade}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm font-medium text-muted-foreground">Effective Annual Rate</span>
                                        <span className="font-bold text-success text-lg">{selectedBorrower?.rate}%</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-border">
                                        <span className="font-bold text-success">Total Expected Return</span>
                                        <span className="font-extrabold text-xl text-success">₹{totalReturn.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs font-medium text-muted-foreground">Est. Monthly Inflow</span>
                                        <span className="text-xs font-bold text-foreground">₹{Math.round(totalReturn / 36).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={() => setModalStep(2)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1">
                                        Back
                                    </button>
                                    <button onClick={handleInvest} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-success text-success-foreground hover:bg-success/90 h-10 px-4 py-2 flex-1">
                                        Confirm Investment
                                    </button>
                                </div>
                            </div>
                        )}

                        {modalStep === 4 && (
                            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95 duration-300">
                                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-8 h-8 text-success" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Investment Confirmed!</h2>
                                <p className="text-sm text-muted-foreground mb-8">
                                    Your funds (<span className="font-bold text-foreground">₹{parseInt(investmentAmount).toLocaleString('en-IN')}</span>) have been successfully allocated to <span className="font-bold text-foreground">{selectedBorrower?.name}</span>.
                                </p>
                                <button onClick={resetModal} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
                                    Close Window
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <HeroBanner
                tag="Lender Dashboard"
                titlePrimary="Grow Your Wealth Through"
                titleHighlight="Smart Lending"
                description="Invest in verified borrowers, earn competitive returns, and diversify your portfolio across risk grades. ClearLend's transparent platform lets you choose who you fund, track EMI inflows, and maximize your yield."
                colorMode="lender"
                stats={[
                    { icon: <Wallet className="w-5 h-5 text-success" />, value: '₹4.2L', label: 'Total Invested', colorClass: 'text-success' },
                    { icon: <Activity className="w-5 h-5 text-chart-2" />, value: '₹38,400', label: 'Total Earned', colorClass: 'text-chart-2' },
                    { icon: <Users className="w-5 h-5 text-chart-1" />, value: '12', label: 'Loans Funded', colorClass: 'text-chart-1' },
                    { icon: <PieChart className="w-5 h-5 text-chart-3" />, value: '11.4%', label: 'Avg. Return', colorClass: 'text-chart-3' }
                ]}
            />

            <div className="flex justify-between items-end mb-6 mt-12">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Investment Portfolio</h2>
                    <p className="text-sm text-muted-foreground mt-1">Monitor your investments, returns, and lending activity</p>
                </div>
                <button
                    onClick={() => setShowInvestModal(true)}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    <Wallet className="w-4 h-4" /> Lend / Fund a Borrower
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm lg:col-span-1 border-t-4 border-t-success overflow-hidden p-6 relative">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-success/5 rounded-bl-[100px] pointer-events-none"></div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Wallet Overview</p>
                    <h2 className="text-4xl font-extrabold tracking-tight text-foreground mb-1">₹3,20,000</h2>
                    <p className="text-sm font-medium text-success mb-8">Available Balance</p>

                    <div className="flex justify-between items-center pt-6 border-t border-border">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Invested</p>
                            <p className="font-bold text-foreground">₹8.5L</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Earned</p>
                            <p className="font-bold text-success flex items-center gap-1">₹1.3L <Activity className="w-3 h-3" /></p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Pending</p>
                            <p className="font-bold text-foreground">₹18K</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm lg:col-span-2 overflow-hidden p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                        <Users className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-lg text-foreground">Suggested Borrowers</h3>
                        <span className="text-xs font-medium text-muted-foreground ml-2">— Matching your risk preference (A–C)</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border cursor-pointer">
                            <div className="flex items-center gap-4">
                                <span className="inline-flex items-center justify-center rounded-md font-bold text-sm w-8 h-8 bg-success/20 text-success border border-success/30">A</span>
                                <div>
                                    <p className="font-bold text-foreground text-base">Arjun Mehta</p>
                                    <p className="text-xs font-medium text-muted-foreground">₹2.5L · Score: 782</p>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <p className="font-bold text-success text-base mb-1.5">8.5%</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 sm:w-48 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-success rounded-full" style={{ width: `87%` }}></div>
                                    </div>
                                    <span className="text-xs font-semibold text-muted-foreground w-16 text-right">87%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border cursor-pointer">
                            <div className="flex items-center gap-4">
                                <span className="inline-flex items-center justify-center rounded-md font-bold text-sm w-8 h-8 bg-chart-3/20 text-chart-3 border border-chart-3/30">C</span>
                                <div>
                                    <p className="font-bold text-foreground text-base">Priya Sharma</p>
                                    <p className="text-xs font-medium text-muted-foreground">₹1.2L · Score: 690</p>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <p className="font-bold text-chart-3 text-base mb-1.5">10.2%</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 sm:w-48 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-chart-3 rounded-full" style={{ width: `42%` }}></div>
                                    </div>
                                    <span className="text-xs font-semibold text-muted-foreground w-16 text-right">42%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AdminDashboard = () => (
    <div className="animate-in fade-in duration-500">
        <HeroBanner
            tag="Admin Dashboard"
            titlePrimary="Platform Oversight &"
            titleHighlight="Risk Management"
            description="Monitor the entire ClearLend ecosystem from a single control center. Approve borrowers, enforce risk grade rules, track EMI compliance, and maintain a full audit trail — ensuring a healthy, transparent lending platform."
            colorMode="admin"
            stats={[
                { icon: <UserPlus className="w-5 h-5 text-chart-3" />, value: '7', label: 'Pending Approvals', colorClass: 'text-chart-3' },
                { icon: <ShieldCheck className="w-5 h-5 text-chart-1" />, value: '₹18.6L', label: 'Portfolio Value', colorClass: 'text-chart-1' },
                { icon: <AlertTriangle className="w-5 h-5 text-destructive" />, value: '3.2%', label: 'Default Rate', colorClass: 'text-destructive' },
                { icon: <Activity className="w-5 h-5 text-success" />, value: '94.8%', label: 'EMI Compliance', colorClass: 'text-success' }
            ]}
        />

        <div className="flex justify-between items-end mb-6 mt-12">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Admin Control Center</h2>
                <p className="text-sm text-muted-foreground mt-1">Risk management, compliance monitoring, and audit oversight</p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-chart-3 hover:bg-chart-3/90 text-primary-foreground">
                <UserPlus className="w-4 h-4" /> Accept Borrower
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <ShieldCheck className="w-5 h-5 text-chart-1" />
                    <h3 className="font-bold text-lg text-foreground">Risk Distribution</h3>
                </div>
                <div className="flex-1 min-h-[220px] flex justify-center items-center text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl bg-muted/20">
                    <div className="flex flex-col items-center gap-2">
                        <PieChart className="w-8 h-8 opacity-20" />
                        <span>Risk Distribution Chart Integration Point</span>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <h3 className="font-bold text-lg text-foreground">Default Rate Trend</h3>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted px-2 py-1 rounded">Last 6 Months</span>
                </div>
                <div className="flex-1 min-h-[220px] flex justify-center items-center text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl bg-muted/20">
                    <div className="flex flex-col items-center gap-2">
                        <Activity className="w-8 h-8 opacity-20" />
                        <span>Default Line Trend Chart Integration Point</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
