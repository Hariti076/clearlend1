import React from 'react';
import { Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/': return 'Main Dashboard';
            case '/borrowers': return 'Borrower Dashboard';
            case '/lenders': return 'Lender Dashboard';
            case '/admin': return 'Admin Dashboard';
            case '/settings': return 'Application Settings';
            default: return 'ClearLend';
        }
    };

    const getFormattedDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    };

    return (
        <header className="flex justify-between items-center py-4 px-8 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex flex-col">
                <h1 className="text-xl font-bold text-foreground">{getPageTitle()}</h1>
                <span className="text-xs text-muted-foreground mt-0.5">{getFormattedDate()}</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
                    <span className="text-foreground">{getPageTitle().split(' ')[0] === 'Main' ? 'System' : getPageTitle().split(' ')[0]}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>

                <div className="flex items-center gap-2">
                    <button className="relative p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-background"></span>
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
