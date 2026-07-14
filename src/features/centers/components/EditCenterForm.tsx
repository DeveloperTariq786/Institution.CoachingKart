import { useState } from "react";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { MapPin, Phone, Building2, Image as ImageIcon, MapPinned, Save } from "lucide-react";
import { useCenters } from "../hooks/useCenters";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { Center } from "../types/center";

interface EditCenterFormProps {
    center: Center;
}

export const EditCenterForm = ({ center }: EditCenterFormProps) => {
    const navigate = useNavigate();
    const { updateCenter, isProcessing } = useCenters();

    const [formData, setFormData] = useState({
        name: center.name || "",
        phone: center.phone || "",
        image: null as File | null,
        address: center.location?.address || "",
        city: center.location?.city || "",
        state: center.location?.state || "",
        country: center.location?.country || "India",
        postalCode: center.location?.postalCode || "",
        latitude: center.location?.latitude || "",
        longitude: center.location?.longitude || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await updateCenter(center.id, {
            name: formData.name,
            phone: formData.phone,
            ...(formData.image ? { image: formData.image } : {}),
            location: {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                postalCode: formData.postalCode,
                latitude: Number(formData.latitude),
                longitude: Number(formData.longitude),
            },
        });

        if (success) {
            navigate(ROUTES.CENTERS);
        }
    };

    const formFields: FormFieldConfig[] = [
        {
            id: "name",
            label: "Center Name",
            placeholder: "Enter center name (e.g., Main Branch, Patna)",
            value: formData.name,
            onChange: (value) => setFormData({ ...formData, name: value }),
            required: true,
            icon: Building2,
            colSpan: 2,
        },
        {
            id: "phone",
            label: "Contact Phone",
            placeholder: "Enter phone number",
            value: formData.phone,
            onChange: (value) => setFormData({ ...formData, phone: value }),
            required: true,
            icon: Phone,
        },
        {
            id: "image",
            label: "Center Display Image (Optional)",
            placeholder: "Upload new center photo to replace",
            value: formData.image,
            onChange: (file) => setFormData({ ...formData, image: file }),
            required: false,
            componentType: "file",
            icon: ImageIcon,
            accept: "image/*",
        },
        {
            id: "address",
            label: "Street Address",
            placeholder: "e.g., Parray Pora, Srinagar",
            value: formData.address,
            onChange: (value) => setFormData({ ...formData, address: value }),
            required: true,
            icon: MapPin,
        },
        {
            id: "city",
            label: "City",
            placeholder: "e.g., Srinagar",
            value: formData.city,
            onChange: (value) => setFormData({ ...formData, city: value }),
            required: true,
            icon: MapPin,
        },
        {
            id: "state",
            label: "State",
            placeholder: "e.g., Jammu & Kashmir",
            value: formData.state,
            onChange: (value) => setFormData({ ...formData, state: value }),
            required: true,
            icon: MapPin,
        },
        {
            id: "postalCode",
            label: "Postal Code",
            placeholder: "e.g., 190015",
            value: formData.postalCode,
            onChange: (value) => setFormData({ ...formData, postalCode: value }),
            required: true,
            icon: MapPin,
        },
        {
            id: "country",
            label: "Country",
            placeholder: "e.g., India",
            value: formData.country,
            onChange: (value) => setFormData({ ...formData, country: value }),
            required: true,
            icon: MapPin,
        },
        {
            id: "geo-helper",
            label: "",
            value: "",
            onChange: () => { },
            componentType: "custom",
            customComponent: (
                <div className="md:col-span-2 pb-2">
                    <div className="flex items-start gap-3 px-4 py-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-900 shadow-sm transition-all duration-300 hover:shadow-md">
                        <MapPinned className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm font-bold tracking-tight">Enable Precise Discovery</p>
                            <p className="text-xs text-indigo-700 leading-relaxed font-medium">
                                Providing exact latitude and longitude helps us suggest your institution's center to nearby students, making it effortless for them to find your doors.
                            </p>
                        </div>
                    </div>
                </div>
            ),
            colSpan: 2,
        },
        {
            id: "latitude",
            label: "Latitude",
            placeholder: "e.g., 25.5941",
            value: formData.latitude,
            onChange: (value) => setFormData({ ...formData, latitude: value }),
            required: true,
            icon: MapPin,
        },
        {
            id: "longitude",
            label: "Longitude",
            placeholder: "e.g., 85.1376",
            value: formData.longitude,
            onChange: (value) => setFormData({ ...formData, longitude: value }),
            required: true,
            icon: MapPin,
        },
    ];

    return (
        <CommonForm
            fields={formFields}
            onSubmit={handleSubmit}
            submitButtonText="Save Changes"
            isLoading={isProcessing}
            submitButtonIcon={Save}
            onBack={() => navigate(ROUTES.CENTERS)}
            headerIcon={MapPinned}
        />
    );
};
