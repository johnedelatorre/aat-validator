import React, { useState, useRef } from 'react';
import { AnalysisHeader } from './components/AnalysisHeader';
import { SponsorAnalyzerContent, SponsorAnalyzerContentRef } from './components/SponsorAnalyzerContent';
import { PlacementAnalyzerContent, PlacementAnalyzerContentRef } from './components/PlacementAnalyzerContent';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('sponsor-analyzer');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sponsorAnalyzerRef = useRef<SponsorAnalyzerContentRef>(null);
  const placementAnalyzerRef = useRef<PlacementAnalyzerContentRef>(null);

  const handleTabChange = (newTab: string) => {
    // Don't switch if already on the target tab or currently transitioning
    if (activeTab === newTab || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Check if any dropdown is open in current tab and close it BEFORE switching
    let hasOpenDropdown = false;
    
    if (activeTab === 'sponsor-analyzer' && sponsorAnalyzerRef.current?.isDropdownOpen()) {
      sponsorAnalyzerRef.current.closeDropdown();
      hasOpenDropdown = true;
    } else if (activeTab === 'placement-analyzer' && placementAnalyzerRef.current?.isDropdownOpen()) {
      placementAnalyzerRef.current.closeDropdown();
      hasOpenDropdown = true;
    }
    
    // If dropdown was open, delay tab switch to let it close cleanly
    const switchDelay = hasOpenDropdown ? 100 : 0;
    
    setTimeout(() => {
      setActiveTab(newTab);
      
      // Re-enable buttons after tab transition completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, switchDelay);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalysisHeader />
      
      {/* Elegant Underline Tab Navigation */}
      <div className="fixed top-12 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => handleTabChange('sponsor-analyzer')}
              disabled={isTransitioning}
              className={`py-4 px-2 text-sm font-medium transition-all duration-200 ease-in-out relative ${
                activeTab === 'sponsor-analyzer'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : isTransitioning
                  ? 'text-gray-400 border-b-2 border-transparent cursor-not-allowed'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  activeTab === 'sponsor-analyzer' ? 'bg-blue-500' : 'bg-gray-400'
                }`}></span>
                <span>Sponsor Analyzer</span>
              </span>
            </button>
            
            <button
              onClick={() => handleTabChange('placement-analyzer')}
              disabled={isTransitioning}
              className={`py-4 px-2 text-sm font-medium transition-all duration-200 ease-in-out relative ${
                activeTab === 'placement-analyzer'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : isTransitioning
                  ? 'text-gray-400 border-b-2 border-transparent cursor-not-allowed'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  activeTab === 'placement-analyzer' ? 'bg-blue-500' : 'bg-gray-400'
                }`}></span>
                <span>Placement Analyzer</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Contents - Absolute positioning to prevent jumping */}
      <div className="fixed top-20 left-0 right-0 bottom-0 overflow-hidden">
        {/* Sponsor Analyzer Content */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
            activeTab === 'sponsor-analyzer' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="h-full overflow-auto">
            <SponsorAnalyzerContent ref={sponsorAnalyzerRef} isActive={activeTab === 'sponsor-analyzer'} />
          </div>
        </div>

        {/* Placement Analyzer Content */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
            activeTab === 'placement-analyzer' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="h-full overflow-auto">
            <PlacementAnalyzerContent ref={placementAnalyzerRef} isActive={activeTab === 'placement-analyzer'} />
          </div>
        </div>
      </div>

      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 1500,
          style: {
            marginTop: '160px',
          }
        }}
      />
    </div>
  );
}