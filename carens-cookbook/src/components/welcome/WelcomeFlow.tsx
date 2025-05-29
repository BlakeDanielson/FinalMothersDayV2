'use client';

import React from 'react';
import { WelcomeFlowProvider, useWelcomeFlow } from '@/contexts/WelcomeFlowContext';
import { AppOverviewScreen } from './AppOverviewScreen';
import { OrganizationTipsScreen } from './OrganizationTipsScreen';
import { CategorizationGuideScreen } from './CategorizationGuideScreen';
import { QuickStartGuideScreen } from './QuickStartGuideScreen';

function WelcomeFlowContent() {
  const { state } = useWelcomeFlow();

  if (!state.showWelcomeFlow) {
    return null;
  }

  return (
    <div className="welcome-flow">
      <AppOverviewScreen />
      <OrganizationTipsScreen />
      <CategorizationGuideScreen />
      <QuickStartGuideScreen />
    </div>
  );
}

export interface WelcomeFlowProps {
  autoStart?: boolean;
  className?: string;
}

export function WelcomeFlow({ 
  autoStart = false, 
  className 
}: WelcomeFlowProps) {
  return (
    <div className={className}>
      <WelcomeFlowProvider autoStart={autoStart}>
        <WelcomeFlowContent />
      </WelcomeFlowProvider>
    </div>
  );
}

// Export individual screens for standalone use
export {
  AppOverviewScreen,
  OrganizationTipsScreen,
  CategorizationGuideScreen,
  QuickStartGuideScreen
};

// Export context utilities
export {
  WelcomeFlowProvider,
  useWelcomeFlow,
  hasCompletedWelcomeFlow,
  resetWelcomeFlow
} from '@/contexts/WelcomeFlowContext'; 