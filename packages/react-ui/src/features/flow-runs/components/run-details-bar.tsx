import { QuestionMarkIcon } from '@radix-ui/react-icons';
import { t } from 'i18next';
import React from 'react';

import { Button } from '@/components/ui/button';
import { flagsHooks } from '@/hooks/flags-hooks';
import { cn } from '@/lib/utils';
import { ApFlagId, FlowRun, FlowRunStatus } from '@activepieces/shared';

import { flowRunUtils } from '../lib/flow-run-utils';

type RunDetailsBarProps = {
  run?: FlowRun;
  canExitRun: boolean;
  exitRun: () => void;
  isLoading: boolean;
};

function getStatusText(status: FlowRunStatus, timeout: number) {
  switch (status) {
    case FlowRunStatus.STOPPED:
    case FlowRunStatus.SUCCEEDED:
      return t('Run Succeeded');
    case FlowRunStatus.FAILED:
      return t('Run Failed');
    case FlowRunStatus.PAUSED:
      return t('Flow Run is paused');
    case FlowRunStatus.QUOTA_EXCEEDED:
      return t('Run Failed due to quota exceeded');
    case FlowRunStatus.RUNNING:
      return t('Running');
    case FlowRunStatus.TIMEOUT:
      return t('Run exceeded {timeout} seconds, try to optimize your steps.', {
        timeout,
      });
    case FlowRunStatus.INTERNAL_ERROR:
      return t('Run failed for an unknown reason, contact support.');
  }
}

const RunDetailsBar = React.memo(
  ({ run, canExitRun, exitRun, isLoading }: RunDetailsBarProps) => {
    const { Icon, variant } = run
      ? flowRunUtils.getStatusIcon(run.status)
      : { Icon: QuestionMarkIcon, variant: 'default' };

    const { data: timeoutSeconds } = flagsHooks.useFlag<number>(
      ApFlagId.FLOW_RUN_TIME_SECONDS,
    );

    if (!run) {
      return <></>;
    }

    return (
      <div
        className="fixed bottom-4 p-4 left-1/2 transform -translate-x-1/2 w-[400px] bg-background shadow-lg border h-16 flex items-center justify-start 
       rounded-lg z-[9999]"
      >
        <Icon
          className={cn('w-6 h-6 mr-3', {
            'text-foreground': variant === 'default',
            'text-success': variant === 'success',
            'text-destructive': variant === 'error',
          })}
        />
        <div className="flex-col flex flex-grow text-foreground gap-0">
          <div className="text-sm">
            {getStatusText(run.status, timeoutSeconds ?? -1)}
          </div>
          <div className="text-xs text-muted-foreground">
            {run?.id ?? t('Unknown')}
          </div>
        </div>
        {canExitRun && (
          <Button
            variant={'outline'}
            onClick={() => exitRun()}
            loading={isLoading}
            onKeyboardShortcut={() => exitRun()}
            keyboardShortcut="Esc"
          >
            {t('Exit Run')}
          </Button>
        )}
      </div>
    );
  },
);

RunDetailsBar.displayName = 'RunDetailsBar';
export { RunDetailsBar };