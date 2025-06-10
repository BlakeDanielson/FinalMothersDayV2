import React from 'react';
import { Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUIModelConfig, type AIProvider } from '@/lib/config/ui-models';
import { cn } from '@/lib/utils';

interface ProviderSelectionProps {
  selectedProvider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
  isLoading: boolean;
}

export function ProviderSelection({ 
  selectedProvider, 
  onProviderChange, 
  isLoading 
}: ProviderSelectionProps) {
  const getProviderDescription = (provider: AIProvider) => {
    const config = getUIModelConfig(provider);
    const iconColor = provider.startsWith('openai') ? 'text-green-500' : 
                     provider.startsWith('gemini') ? 'text-blue-500' : 'text-gray-500';
    const IconComponent = provider.startsWith('openai') ? CheckCircle2 : AlertCircle;
    
    return {
      name: `${config.name} (${config.actualModel})`,
      description: config.description,
      maxFileSize: '25MB',
      icon: <IconComponent className={cn('h-4 w-4', iconColor)} />
    };
  };

  const currentProvider = getProviderDescription(selectedProvider);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">AI Processing Engine</span>
        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
      </div>
      <Select
        value={selectedProvider}
        onValueChange={(value: AIProvider) => onProviderChange(value)}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select AI provider" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="openai-main">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{getUIModelConfig('openai-main').name} ({getUIModelConfig('openai-main').actualModel})</span>
                <span className="text-xs text-muted-foreground">{getUIModelConfig('openai-main').description}</span>
              </div>
            </div>
          </SelectItem>
          <SelectItem value="openai-mini">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{getUIModelConfig('openai-mini').name} ({getUIModelConfig('openai-mini').actualModel})</span>
                <span className="text-xs text-muted-foreground">{getUIModelConfig('openai-mini').description}</span>
              </div>
            </div>
          </SelectItem>
          <SelectItem value="gemini-main">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{getUIModelConfig('gemini-main').name} ({getUIModelConfig('gemini-main').actualModel})</span>
                <span className="text-xs text-muted-foreground">{getUIModelConfig('gemini-main').description}</span>
              </div>
            </div>
          </SelectItem>
          <SelectItem value="gemini-pro">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{getUIModelConfig('gemini-pro').name} ({getUIModelConfig('gemini-pro').actualModel})</span>
                <span className="text-xs text-muted-foreground">{getUIModelConfig('gemini-pro').description}</span>
              </div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      
      {/* Provider Info */}
      <div className="text-xs flex items-center gap-2 p-2 rounded-md bg-muted/50 border">
        {currentProvider.icon}
        <span>
          <strong>{currentProvider.name}:</strong> {currentProvider.description}. 
          Max file size: {currentProvider.maxFileSize}
        </span>
      </div>
    </div>
  );
} 