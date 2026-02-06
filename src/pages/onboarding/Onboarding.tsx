import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import OnboardingLayout from "@/features/onboarding/components/OnboardingLayout";
import InstituteDetails from "@/features/onboarding/components/InstituteDetails";
import OwnerInfo from "@/features/onboarding/components/OwnerInfo";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";
import { OnboardingRequest } from "@/features/onboarding/types";

export interface OnboardingData {
  institutionName: string;
  tuitionEmail: string;
  tuitionPhone: string;
  description: string;
  address: string;
  city: string;
  country: string;

  ownerName: string;
  ownerEmail: string;
  ownerPassword: string;
}

const INITIAL_DATA: OnboardingData = {
  institutionName: "",
  tuitionEmail: "",
  tuitionPhone: "",
  description: "",
  address: "",
  city: "",
  country: "",

  ownerName: "",
  ownerEmail: "",
  ownerPassword: "",
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);

  const { mutate, isPending } = useOnboarding({
    onSuccess: () => {
      navigate(ROUTES.LOGIN); // Typically redirect to login after registration
    },
  });

  const updateData = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleComplete = () => {
    const onboardingRequest: OnboardingRequest = {
      institutionName: data.institutionName,
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      ownerPassword: data.ownerPassword,

      description: data.description || undefined,
      location: {
        address: data.address,
        city: data.city,
        country: data.country,
      },
      tuitionEmail: data.tuitionEmail,
      tuitionPhone: data.tuitionPhone,
    };

    mutate(onboardingRequest);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InstituteDetails data={data} updateData={updateData} onNext={nextStep} />;
      case 1:
        return (
          <OwnerInfo
            data={data}
            updateData={updateData}
            onBack={prevStep}
            onComplete={handleComplete}
            isLoading={isPending}
          />
        );
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout currentStep={currentStep}>
      {renderStep()}
    </OnboardingLayout>
  );
};

export default Onboarding;
