'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface StepperProps {
  steps: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  orientation?: 'horizontal' | 'vertical';
  allowStepClick?: boolean;
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepChange,
  orientation = 'horizontal',
  allowStepClick = false,
  className,
}: StepperProps) {
  const handleStepClick = (index: number) => {
    if (allowStepClick && index <= currentStep) {
      onStepChange?.(index);
    }
  };

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isClickable = allowStepClick && (isCompleted || isActive);

        return (
          <React.Fragment key={index}>
            <button
              onClick={() => handleStepClick(index)}
              disabled={!isClickable}
              className={cn(
                'flex items-center gap-3 transition-opacity',
                orientation === 'horizontal' ? 'flex-col' : 'flex-row',
                isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default',
                !isActive && !isCompleted && 'opacity-50'
              )}
            >
              <div
                className={cn(
                  'relative flex items-center justify-center w-10 h-10 rounded-full transition-all',
                  'border-2 font-semibold',
                  isCompleted && 'bg-green-500 border-green-500 text-white',
                  isActive && 'bg-purple-600 border-purple-600 text-white scale-110',
                  !isActive && !isCompleted && 'bg-gray-100 border-gray-300 text-gray-500'
                )}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              <div className={cn(
                'text-center',
                orientation === 'horizontal' ? 'max-w-[120px]' : 'flex-1'
              )}>
                <div className={cn(
                  'text-sm font-medium',
                  isActive && 'text-purple-600',
                  isCompleted && 'text-green-600',
                  !isActive && !isCompleted && 'text-gray-500'
                )}>
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-gray-500 mt-1">
                    {step.description}
                  </div>
                )}
              </div>
            </button>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'transition-colors',
                  orientation === 'horizontal'
                    ? 'flex-1 h-0.5 mx-2 min-w-[40px]'
                    : 'w-0.5 h-8 mx-5',
                  index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

interface MultiStepFormProps {
  steps: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
  }[];
  onComplete?: () => void;
  className?: string;
}

export function MultiStepForm({ steps, onComplete, className }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className={cn('space-y-8', className)}>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        allowStepClick={true}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[300px]"
        >
          {steps[currentStep].content}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all',
            'border-2 border-gray-300 text-gray-700',
            'hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleNext}
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all',
            'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
            'hover:shadow-lg',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
          )}
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default Stepper;
