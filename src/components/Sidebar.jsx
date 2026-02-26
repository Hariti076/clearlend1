import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Wallet,
    Users,
    ShieldAlert,
    Settings,
    Landmark,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="w-64 bg-sidebar border-r border-sidebar-border h-full flex flex-col transition-all duration-300 z-20">
            <div className="p-6 flex-1 flex flex-col gap-8">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-700 flex items-center justify-center shadow-lg">
                        <Landmark className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-sidebar-foreground tracking-tight">ClearLend</h2>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-sidebar-foreground/60">P2P Lending Platform</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    <p className="px-3 text-xs font-bold uppercase tracking-wider text-sidebar-foreground/50 mb-3">Navigation</p>

                    <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-medium' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                        <LayoutDashboard className="w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">Main Dashboard</span>
                            <span className="text-[10px] opacity-80">Overview & Analytics</span>
                        </div>
                    </NavLink>

                    <NavLink to="/borrowers" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-medium' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                        <Users className="w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">Borrower</span>
                            <span className="text-[10px] opacity-80">Loans & EMIs</span>
                        </div>
                    </NavLink>

                    <NavLink to="/lenders" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-medium' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                        <Wallet className="w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">Lender</span>
                            <span className="text-[10px] opacity-80">Investments & Returns</span>
                        </div>
                    </NavLink>

                    <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-medium' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                        <ShieldAlert className="w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">Admin</span>
                            <span className="text-[10px] opacity-80">Risk & Compliance</span>
                        </div>
                    </NavLink>

                    <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mt-6 ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-medium' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                        <Settings className="w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">Settings</span>
                            <span className="text-[10px] opacity-80">Preferences</span>
                        </div>
                    </NavLink>
                </nav>
            </div>

            <div className="p-4 border-t border-sidebar-border mt-auto">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-9 h-9 rounded-full bg-sidebar-primary/20 flex items-center justify-center border border-sidebar-primary/30">
                        <Users className="w-4 h-4 text-sidebar-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-sidebar-foreground truncate">{user?.name || 'Guest User'}</p>
                        <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email || 'Not logged in'}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-transparent hover:border-destructive/20"
                >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
