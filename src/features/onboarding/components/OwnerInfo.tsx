import { OnboardingData } from "@/pages/onboarding/Onboarding";
import { User, Mail, Lock, Check } from "lucide-react";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";

interface OwnerInfoProps {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  onBack: () => void;
  onComplete: () => void;
  isLoading?: boolean;
}

const OwnerInfo = ({ data, updateData, onBack, onComplete, isLoading }: OwnerInfoProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  const isFormValid =
    data.ownerName.trim() &&
    data.ownerEmail.trim() &&
    data.ownerPassword.length >= 8;

  const fields: FormFieldConfig[] = [
    {
      id: "ownerName",
      label: "Owner Name",
      placeholder: "e.g. Alice Admin",
      value: data.ownerName,
      onChange: (value) => updateData({ ownerName: value }),
      required: true,
      icon: User,
    },
    {
      id: "ownerEmail",
      label: "Owner Email",
      type: "email",
      placeholder: "alice@example.com",
      value: data.ownerEmail,
      onChange: (value) => updateData({ ownerEmail: value }),
      required: true,
      icon: Mail,
    },
    {
      id: "ownerPassword",
      label: "Owner Password",
      type: "password",
      placeholder: "StrongP@ssw0rd",
      value: data.ownerPassword,
      onChange: (value) => updateData({ ownerPassword: value }),
      required: true,
      icon: Lock,
      minLength: 8,
      colSpan: 2,
    },
  ];

  return (
    <div className="px-6 py-2">
      <CommonForm
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText="Complete Registration"
        isSubmitDisabled={!isFormValid}
        isLoading={isLoading}
        submitButtonIcon={Check}
        onBack={onBack}
        title="Owner Information"
        description="Tell us about yourself to secure the institution account."
        stepIndicator="Step 2 of 2"
        headerIcon={User}
      />
    </div>
  );
};

export default OwnerInfo;
