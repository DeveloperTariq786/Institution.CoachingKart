import { OnboardingData } from "@/pages/onboarding/Onboarding";
import { ArrowRight, Building2, MapPin, Mail, Phone, FileText, Globe, Image as ImageIcon } from "lucide-react";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";

interface InstituteDetailsProps {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const InstituteDetails = ({ data, updateData, onNext }: InstituteDetailsProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid =
    data.institutionName.trim() &&
    data.tuitionEmail.trim() &&
    data.tuitionPhone.trim() &&
    data.address.trim() &&
    data.city.trim() &&
    data.country.trim();

  const fields: FormFieldConfig[] = [
    {
      id: "institutionName",
      label: "Institution Name",
      placeholder: "e.g. Test Tuition Academy",
      value: data.institutionName,
      onChange: (value) => updateData({ institutionName: value }),
      required: true,
      icon: Building2,
      colSpan: 2,
    },
    {
      id: "tuitionEmail",
      label: "Tuition Email",
      type: "email",
      placeholder: "tuition@example.com",
      value: data.tuitionEmail,
      onChange: (value) => updateData({ tuitionEmail: value }),
      required: true,
      icon: Mail,
    },
    {
      id: "tuitionPhone",
      label: "Tuition Phone",
      placeholder: "+1-555-123-4567",
      value: data.tuitionPhone,
      onChange: (value) => updateData({ tuitionPhone: value }),
      required: true,
      icon: Phone,
    },
    {
      id: "description",
      label: "Description",
      placeholder: "A brief description of your institution",
      value: data.description,
      onChange: (value) => updateData({ description: value }),
      icon: FileText,
      componentType: 'textarea',
      colSpan: 2,
    },
    {
      id: "address",
      label: "Address",
      placeholder: "123 Main St",
      value: data.address,
      onChange: (value) => updateData({ address: value }),
      required: true,
      icon: MapPin,
      colSpan: 2,
    },
    {
      id: "city",
      label: "City",
      placeholder: "Anytown",
      value: data.city,
      onChange: (value) => updateData({ city: value }),
      required: true,
      icon: Globe,
    },
    {
      id: "country",
      label: "Country",
      placeholder: "US",
      value: data.country,
      onChange: (value) => updateData({ country: value }),
      required: true,
      icon: Globe,
    },

  ];

  return (
    <div className="max-h-[80vh] overflow-y-auto px-6 py-2 custom-scrollbar">
      <CommonForm
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText="Continue"
        isSubmitDisabled={!isFormValid}
        submitButtonIcon={ArrowRight}
        title="Institution Details"
        description="Register your coaching institute to get started."
        stepIndicator="Step 1 of 2"
        headerIcon={Building2}
      />
    </div>
  );
};

export default InstituteDetails;
