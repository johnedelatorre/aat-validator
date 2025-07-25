import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Frame, ValidationSummary } from '../types';
import { CheckCircle, Clock, BarChart3, ArrowRight, Flag } from 'lucide-react';
// Future functionality - keeping imports ready
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ImageWithFallback } from './figma/ImageWithFallback';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exampleImage = '/images/frame_2820.jpg';

interface CompletionSummaryProps {
  summary: ValidationSummary;
  frames: Frame[];
  queueCount: number;
  onContinue: () => void;
  onFinish: () => void;
}

export function CompletionSummary({ 
  summary, 
  frames, 
  queueCount, 
  onContinue, 
  onFinish 
}: CompletionSummaryProps) {
  
  const validationRate = Math.round((summary.selectedFrames / summary.totalFrames) * 100);
  const rejectionRate = Math.round((summary.rejectedFrames / summary.totalFrames) * 100);
  
  // Sample of high-quality selected frames for preview
  const selectedFrames = frames.filter(frame => frame.isSelected && !frame.isRejected);
  const topQualityFrames = selectedFrames
    .sort((a, b) => b.clarityLevel - a.clarityLevel)
    .slice(0, 4);

  const getClarityBadgeStyle = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-red-600 text-white';
      case 1:
        return 'bg-orange-600 text-white';
      case 2:
        return 'bg-amber-600 text-white';
      case 3:
        return 'bg-blue-600 text-white';
      case 4:
        return 'bg-green-600 text-white';
      case 5:
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Validation Complete!</h1>
        <p className="text-gray-600">
          You've successfully validated {summary.totalFrames} frames. Review your results below.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-semibold text-green-600 mb-1">{summary.selectedFrames}</div>
            <div className="text-sm text-gray-600">Selected Frames</div>
            <div className="text-xs text-gray-500 mt-1">{validationRate}% validated</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-semibold text-red-600 mb-1">{summary.rejectedFrames}</div>
            <div className="text-sm text-gray-600">Rejected Frames</div>
            <div className="text-xs text-gray-500 mt-1">{rejectionRate}% rejected</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-semibold text-blue-600 mb-1">{summary.avgClarityLevel}</div>
            <div className="text-sm text-gray-600">Avg Clarity</div>
            <div className="text-xs text-gray-500 mt-1">Out of 5.0</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-semibold text-purple-600 mb-1">{queueCount}</div>
            <div className="text-sm text-gray-600">Remaining</div>
            <div className="text-xs text-gray-500 mt-1">In queue</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Validation Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Selected Frames</span>
              <span>{summary.selectedFrames}/{summary.totalFrames}</span>
            </div>
            <Progress value={validationRate} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Quality Distribution</span>
              <span>Avg {summary.avgClarityLevel}/5.0</span>
            </div>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4, 5].map((level) => {
                const count = selectedFrames.filter(f => f.clarityLevel === level).length;
                const width = selectedFrames.length > 0 ? (count / selectedFrames.length) * 100 : 0;
                return (
                  <div
                    key={level}
                    className={`h-2 rounded-sm ${getClarityBadgeStyle(level).split(' ')[0]}`}
                    style={{ width: `${width}%` }}
                    title={`Clarity ${level}: ${count} frames`}
                  />
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Results Preview */}
      {topQualityFrames.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Top Quality Selections</CardTitle>
            <p className="text-sm text-gray-600">Preview of your highest clarity validated frames</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topQualityFrames.map((frame) => (
                <div key={frame.id} className="relative">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={frame.imageUrl}
                      alt={`Frame ${frame.id}`}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute border-2 border-yellow-400 bg-yellow-400/10"
                      style={{
                        left: `${frame.detectionBox.x}%`,
                        top: `${frame.detectionBox.y}%`,
                        width: `${frame.detectionBox.width}%`,
                        height: `${frame.detectionBox.height}%`,
                      }}
                    />
                    <div className="absolute bottom-1 left-1">
                      <Badge className={`text-xs px-1 py-0.5 ${getClarityBadgeStyle(frame.clarityLevel)}`}>
                        C{frame.clarityLevel}
                      </Badge>
                    </div>
                    <div className="absolute top-1 right-1">
                      <CheckCircle className="w-4 h-4 text-green-500 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 text-center">{frame.id}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
        {queueCount > 0 ? (
          <>
            <Button
              size="lg"
              onClick={onContinue}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Continue to Next Batch
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onFinish}
              className="px-8 py-3"
            >
              <Flag className="w-5 h-5 mr-2" />
              Finish Session
            </Button>
          </>
        ) : (
          <Button
            size="lg"
            onClick={onFinish}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            <Flag className="w-5 h-5 mr-2" />
            Complete Validation
          </Button>
        )}
      </div>

      {/* Queue Status */}
      <div className="text-center text-sm text-gray-500 pt-4">
        <div className="flex items-center justify-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>
            Completed at {summary.completionTime} • 
            {queueCount > 0 ? ` ${queueCount} batches remaining` : ' All batches complete'}
          </span>
        </div>
      </div>
    </div>
  );
}