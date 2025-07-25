// React import removed - not needed with new JSX transform

export function AnalysisHeader() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-12 px-6 flex items-center shadow-sm border-b border-gray-300"
      style={{ backgroundColor: '#6a648a' }}
    >
      <h1 className="text-white font-medium">
        Analysis Automation Tool
      </h1>
    </header>
  );
}