import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";
import RichTextEditor from "@/components/ui/rich-text-editor";

interface AboutProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const About = ({ content, onChange, placeholder }: AboutProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    About the Institution
                </CardTitle>
                <CardDescription>
                    Write a detailed description about your institution. You can add images too.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RichTextEditor
                    content={content}
                    onChange={onChange}
                    placeholder={placeholder || "Tell visitors about your institution, its history, mission, and what makes it special..."}
                />
            </CardContent>
        </Card>
    );
};

export default About;
