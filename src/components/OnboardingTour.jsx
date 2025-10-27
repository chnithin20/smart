import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const OnboardingTour = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenTour) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  if (!isVisible || !steps || steps.length === 0) return null;

  const step = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 animate-fade-in" />

      {/* Tour Card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full pointer-events-auto animate-scale-in">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close tour"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-300 leading-relaxed">{step.description}</p>
            
            {step.image && (
              <div className="mt-4 rounded-lg overflow-hidden border border-gray-700">
                <img src={step.image} alt={step.title} className="w-full" />
              </div>
            )}

            {step.tips && (
              <div className="mt-4 bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <p className="text-sm text-blue-300 font-semibold mb-2">💡 Pro Tip:</p>
                <p className="text-sm text-blue-200">{step.tips}</p>
              </div>
            )}
          </div>

          {/* Progress Dots */}
          <div className="px-6 pb-4">
            <div className="flex justify-center space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-blue-500 w-8'
                      : index < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-600'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Skip Tour
            </button>

            <div className="flex items-center space-x-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center space-x-2"
                >
                  <ArrowLeft size={16} />
                  <span>Previous</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
              >
                <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
                {currentStep === steps.length - 1 ? (
                  <Check size={16} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;
