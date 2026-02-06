import { Building2, User, Check, HelpCircle } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number;
}

const steps = [
  {
    id: 0,
    title: "Institute Details",
    subtitle: "Basic information",
    icon: Building2,
  },
  {
    id: 1,
    title: "Owner Info",
    subtitle: "Contact details",
    icon: User,
  },
];

const OnboardingProgress = ({ currentStep }: OnboardingProgressProps) => {
  return (
    <div className="flex h-full flex-col">

      <div className="flex-1 space-y-1">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative">
              <div
                className={`flex items-start gap-4 rounded-2xl p-4 transition-all duration-500 ${isCurrent ? "bg-white shadow-xl shadow-sky-500/10" : ""
                  }`}
              >
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${isCompleted
                    ? "bg-sky-500 text-white"
                    : isCurrent
                      ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30"
                      : "bg-slate-200 text-slate-500"
                    }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                {/* Text */}
                <div className="pt-0.5">
                  <p
                    className={`text-sm font-black transition-colors ${isCurrent || isCompleted ? "text-slate-900" : "text-slate-400"
                      }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">{step.subtitle}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default OnboardingProgress;
