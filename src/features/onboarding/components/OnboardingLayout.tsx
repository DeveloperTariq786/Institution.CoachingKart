import { ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { EXTERNAL_LINKS } from "@/core/data/external-links";
import OnboardingProgress from "./OnboardingProgress";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
}

const stepLabels = ["Institute Details", "Owner Information"];

const OnboardingLayout = ({ children, currentStep }: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm px-6 py-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center h-10 w-[180px] relative shrink-0">
            <img 
              src="/assets/full-logo.webp" 
              alt="Coachingkart" 
              className="h-18 absolute left-0 top-1/2 -translate-y-1/2 object-contain" 
            />
          </Link>

          <a 
             href={EXTERNAL_LINKS.HELP_VIDEO}
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg px-3 py-2 hover:bg-primary/5"
          >
            <HelpCircle className="h-4 w-4" />
            Need Help?
          </a>
        </div>
      </header>

      {/* Mobile Progress Bar */}
      <div className="border-b bg-background/80 backdrop-blur-sm px-6 py-4 lg:hidden">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">Step {currentStep + 1} of 2</span>
          <span className="font-semibold text-primary">
            {stepLabels[currentStep]}
          </span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-sky-500/5 lg:grid lg:grid-cols-[320px_1fr]">
            {/* Desktop Sidebar */}
            <div className="hidden bg-slate-50/50 p-10 lg:block">
              <OnboardingProgress currentStep={currentStep} />
            </div>

            {/* Form Content */}
            <div className="p-10 md:p-14">
              {children}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OnboardingLayout;
