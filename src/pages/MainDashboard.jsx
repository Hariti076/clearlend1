import React from 'react';
import SummaryCards from '../components/SummaryCards';
import ChartsSection from '../components/ChartsSection';
import { PulsePanel, SideSnapshotPanel } from '../components/SidePanels';

const MainDashboard = () => {
    return (
        <div className="fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold m-0 flex items-center gap-2">
                        Overview <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Live Data</span>
                    </h2>
                    <p className="text-sm text-muted mt-1">Real-time platform metrics and risk analytics</p>
                </div>
            </div>

            {/* Top Value Cards */}
            <SummaryCards />

            <div className="flex gap-6">
                {/* Main Analytics Area (Left 75%) */}
                <div className="flex-grow w-3/4">
                    <ChartsSection />
                </div>

                {/* Action/Pulse Area (Right 25%) */}
                <div className="w-1/4 flex-col gap-6">
                    <div style={{ height: '380px', marginBottom: '24px' }}>
                        <PulsePanel />
                    </div>
                    <SideSnapshotPanel />
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
