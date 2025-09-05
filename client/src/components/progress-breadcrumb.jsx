import { Check } from 'lucide-react';

export function ProgressBreadcrumb({ steps }) {
  return (
    <div className="mb-8" data-testid="progress-breadcrumb">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    step.status === 'complete'
                      ? 'bg-green-500 text-white'
                      : step.status === 'current'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }
                `}
                data-testid={`step-${step.id}`}
              >
                {step.status === 'complete' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`
                  ml-2 text-sm font-medium
                  ${
                    step.status === 'complete'
                      ? 'text-green-600'
                      : step.status === 'current'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }
                `}
              >
                {step.name}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`
                  w-12 h-0.5 mx-4
                  ${step.status === 'complete' ? 'bg-green-500' : 'bg-border'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
