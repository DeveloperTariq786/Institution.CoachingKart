import { Center } from "../types/center";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";

interface CenterCardProps {
    center: Center;
}

export const CenterCard = ({ center }: CenterCardProps) => {
    return (
        <Card className="group overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-lg">
            <div className="relative h-32 overflow-hidden">
                <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <CardContent className="p-4 space-y-3">
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {center.name}
                </h3>

                <div className="space-y-2 pt-1">
                    <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 line-clamp-2">
                            {center.location?.address || "No address provided"}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                        <p className="text-xs font-medium text-slate-700">
                            {center.phone}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
