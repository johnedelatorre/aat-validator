import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ConfidenceLevel } from '../types';
import { RotateCcw, RefreshCw } from 'lucide-react';

interface PageSettings {
  framesPerRow: number;
  defaultZoomLevel: ConfidenceLevel;
}

interface PageSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: PageSettings;
  onSave: (settings: PageSettings) => void;
}

// Default page settings - these are the application defaults
const DEFAULT_PAGE_SETTINGS: PageSettings = {
  framesPerRow: 5,
  defaultZoomLevel: 'Mid' as ConfidenceLevel,
};

export function PageSettingsModal({ 
  isOpen, 
  onClose, 
  currentSettings, 
  onSave 
}: PageSettingsModalProps) {
  const [tempSettings, setTempSettings] = useState<PageSettings>(currentSettings);

  // Reset temp settings when modal opens or current settings change
  useEffect(() => {
    if (isOpen) {
      setTempSettings(currentSettings);
    }
  }, [isOpen, currentSettings]);

  // Check if settings have been modified from the original
  const hasSettingsChanged = useMemo(() => {
    return (
      tempSettings.framesPerRow !== currentSettings.framesPerRow ||
      tempSettings.defaultZoomLevel !== currentSettings.defaultZoomLevel
    );
  }, [tempSettings, currentSettings]);

  const handleSave = () => {
    onSave(tempSettings);
    onClose();
  };

  const handleCancel = () => {
    setTempSettings(currentSettings); // Reset to original settings
    onClose();
  };

  // Reset to application defaults
  const handleResetToDefaults = () => {
    setTempSettings(DEFAULT_PAGE_SETTINGS);
  };

  // Reset form to current saved settings (cancel changes)
  const handleResetForm = () => {
    setTempSettings(currentSettings);
  };

  // Check if current temp settings match defaults
  const isAtDefaults = useMemo(() => {
    return (
      tempSettings.framesPerRow === DEFAULT_PAGE_SETTINGS.framesPerRow &&
      tempSettings.defaultZoomLevel === DEFAULT_PAGE_SETTINGS.defaultZoomLevel
    );
  }, [tempSettings]);

  const frameColumnOptions = [
    { value: 5, label: '5 Columns' },
    { value: 7, label: '7 Columns' },
    { value: 10, label: '10 Columns' },
    { value: 15, label: '15 Columns' },
  ];

  const zoomLevelOptions: { value: ConfidenceLevel; label: string; description: string }[] = [
    { value: 'Min', label: 'Min', description: 'Zoomed Out View' },
    { value: 'Mid', label: 'Mid', description: 'Normal View' },
    { value: 'Max', label: 'Max', description: 'Zoomed In View' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Page Settings</DialogTitle>
          <DialogDescription>
            Configure the display settings for the frame grid layout and default zoom level.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8 py-6">
          {/* Reset to Defaults Button */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-foreground">Settings Configuration</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Adjust the display settings for optimal viewing
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetToDefaults}
              disabled={isAtDefaults}
              className="h-8 px-3 text-xs text-orange-600 border-orange-300 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-700 disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              title="Reset all settings to application defaults"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset to Defaults
            </Button>
          </div>

          {/* Number of Frame Columns */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">
              Number of Frame Columns:
            </Label>
            <RadioGroup
              value={tempSettings.framesPerRow.toString()}
              onValueChange={(value) => 
                setTempSettings(prev => ({ ...prev, framesPerRow: parseInt(value) }))
              }
              className="grid grid-cols-2 gap-3"
            >
              {frameColumnOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={option.value.toString()} 
                    id={`frames-${option.value}`}
                    className="border-2 border-gray-400 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
                  />
                  <Label 
                    htmlFor={`frames-${option.value}`}
                    className="text-sm cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Default Zoom Level */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">
              Default Zoom Level:
            </Label>
            <RadioGroup
              value={tempSettings.defaultZoomLevel}
              onValueChange={(value) => 
                setTempSettings(prev => ({ ...prev, defaultZoomLevel: value as ConfidenceLevel }))
              }
              className="space-y-3"
            >
              {zoomLevelOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`zoom-${option.value}`}
                    className="border-2 border-gray-400 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
                  />
                  <div className="flex flex-col">
                    <Label 
                      htmlFor={`zoom-${option.value}`}
                      className="text-sm cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      {option.label}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button 
            variant="outline" 
            onClick={handleCancel} 
            className="flex-1 sm:flex-initial border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700 transition-colors"
          >
            Cancel
          </Button>
          <Button 
            variant="outline" 
            onClick={handleResetForm}
            disabled={!hasSettingsChanged}
            className="flex-1 sm:flex-initial border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700 disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            title="Reset form to current saved settings"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Reset Form
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!hasSettingsChanged}
            className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 transition-colors disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}