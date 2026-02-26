import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Landmark, User, TrendingUp, Shield, ChevronRight } from 'lucide-react';

const Auth = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleContinue = async () => {
        if (!selectedRole) return;
        setIsLoading(true);
        let email = '';
        if (selectedRole === 'borrower') email = 'borrower@clearlend.in';
        if (selectedRole === 'lender') email = 'lender@clearlend.in';
        if (selectedRole === 'admin') email = 'admin@clearlend.in';

        const result = await login(email, 'password123'); // Demo auto-login
        if (result.success) {
            const dashboardRoute = result.user.role === 'admin' ? '/admin'
                : result.user.role === 'lender' ? '/lenders'
                    : '/borrowers';
            navigate(dashboardRoute);
        } else {
            console.error('Login failed', result.error);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-700 flex items-center justify-center shadow-lg">
                    <Landmark className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-foreground tracking-tight">ClearLend</h1>
                    <p className="text-xs text-muted-foreground">P2P Lending Platform</p>
                </div>
            </div>

            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-1">Welcome back</h2>
                <p className="text-sm text-muted-foreground mb-6">Select your role to continue to your dashboard.</p>

                <div className="space-y-3 mb-8">
                    <button
                        onClick={() => setSelectedRole('borrower')}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${selectedRole === 'borrower' ? 'border-primary bg-muted/40' : 'border-border hover:border-muted-foreground/40 hover:bg-muted/30'}`}
                    >
                        <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                            <User className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-foreground">Borrower</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">Apply for loans, track EMIs, and manage repayments.</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedRole('lender')}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${selectedRole === 'lender' ? 'border-primary bg-muted/40' : 'border-border hover:border-muted-foreground/40 hover:bg-muted/30'}`}
                    >
                        <div className="flex-shrink-0 text-teal-600 dark:text-teal-400">
                            <TrendingUp className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-foreground">Lender</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">Fund borrowers, track investments, and grow your portfolio.</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedRole('admin')}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${selectedRole === 'admin' ? 'border-primary bg-muted/40' : 'border-border hover:border-muted-foreground/40 hover:bg-muted/30'}`}
                    >
                        <div className="flex-shrink-0 text-amber-600 dark:text-amber-400">
                            <Shield className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-foreground">Admin</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">Manage risk grades, approve borrowers, and oversee compliance.</p>
                        </div>
                    </button>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!selectedRole || isLoading}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 px-4 py-2 w-full h-11 text-sm font-semibold"
                >
                    {isLoading ? 'Connecting...' : (selectedRole ? `Continue as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` : 'Continue as ...')}
                    <ChevronRight className="w-4 h-4 ml-1" />
                </button>
                <p className="text-center text-xs text-muted-foreground mt-4">No account needed — this is a demo platform.</p>
            </div>
        </div>
    );
};

export default Auth;
