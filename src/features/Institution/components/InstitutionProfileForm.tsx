import { useState } from "react";
import { Building2, Mail, Phone, FileText, MapPin, Save } from "lucide-react";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import ImageUpload from "./ImageUpload";
import { InstitutionProfile } from "../types/institution.types";

interface InstitutionProfileFormProps {
    initialData?: InstitutionProfile;
    onSubmit: (data: InstitutionProfile) => void;
    isLoading?: boolean;
}

const InstitutionProfileForm = ({ initialData, onSubmit, isLoading }: InstitutionProfileFormProps) => {
    const [formData, setFormData] = useState<InstitutionProfile>(initialData || {
        id: "",
        institutionName: "",
        description: "",
        logo: "",
        coverimage: "",
        location: {
            address: "",
            city: "",
        },
        tuitionEmail: "",
        tuitionPhone: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const fields: FormFieldConfig[] = [
        {
            id: "institutionName",
            label: "Institution Name",
            placeholder: "e.g. Excellence Academy",
            value: formData.institutionName,
            onChange: (value) => setFormData({ ...formData, institutionName: value }),
            required: true,
            icon: Building2,
            colSpan: 2,
        },
        {
            id: "tuitionEmail",
            label: "Institution Email",
            type: "email",
            placeholder: "contact@example.com",
            value: formData.tuitionEmail,
            onChange: (value) => setFormData({ ...formData, tuitionEmail: value }),
            required: true,
            icon: Mail,
        },
        {
            id: "tuitionPhone",
            label: "Institution Phone",
            placeholder: "7889396003",
            value: formData.tuitionPhone,
            onChange: (value) => setFormData({ ...formData, tuitionPhone: value }),
            required: true,
            icon: Phone,
        },
        {
            id: "description",
            label: "Description",
            placeholder: "Tell us about your institution...",
            value: formData.description,
            onChange: (value) => setFormData({ ...formData, description: value }),
            icon: FileText,
            componentType: 'textarea',
            colSpan: 2,
        },
        {
            id: "address",
            label: "Address",
            placeholder: "123 Tech Park",
            value: formData.location.address,
            onChange: (value) => setFormData({ ...formData, location: { ...formData.location, address: value } }),
            required: true,
            icon: MapPin,
            colSpan: 2,
        },
        {
            id: "city",
            label: "City",
            placeholder: "Bangalore",
            value: formData.location.city,
            onChange: (value) => setFormData({ ...formData, location: { ...formData.location, city: value } }),
            required: true,
            icon: MapPin,
        },
        {
            id: "logo",
            label: "Institution Logo",
            value: "",
            onChange: () => { },
            componentType: 'custom',
            customComponent: (
                <ImageUpload
                    value={formData.logo}
                    onChange={(file) => setFormData({ ...formData, logo: file })}
                    onRemove={() => setFormData({ ...formData, logo: "" })}
                    label="Upload Logo"
                    description="Square image, minimum 200x200px. Appears in header and branding."
                    aspectRatio="square"
                />
            ),
            colSpan: 2,
        },
        {
            id: "coverimage",
            label: "Cover Image",
            value: "",
            onChange: () => { },
            componentType: 'custom',
            customComponent: (
                <ImageUpload
                    value={formData.coverimage}
                    onChange={(file) => setFormData({ ...formData, coverimage: file })}
                    onRemove={() => setFormData({ ...formData, coverimage: "" })}
                    label="Upload Cover Image"
                    description="Recommended: 1500x500px. Displayed at the top of your public profile."
                    aspectRatio="video"
                />
            ),
            colSpan: 2,
        },
    ];

    return (
        <div className="w-full">
            <CommonForm
                fields={fields}
                onSubmit={handleSubmit}
                submitButtonText="Save Changes"
                isLoading={isLoading}
                submitButtonIcon={Save}
                className="max-w-4xl"
            />
        </div>
    );
};

export default InstitutionProfileForm;
