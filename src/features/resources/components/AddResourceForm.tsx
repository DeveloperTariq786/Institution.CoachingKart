import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Link2, Type, FileUp, Loader2 } from "lucide-react";
import { useResources } from "../hooks/useResources";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "@/components/ui/rich-text-editor";

interface AddResourceFormProps {
    lectureId: string;
}

export const AddResourceForm = ({ lectureId }: AddResourceFormProps) => {
    const { addResources, isSubmitting } = useResources();
    const navigate = useNavigate();

    const [files, setFiles] = useState<File[]>([]);
    const [links, setLinks] = useState<string[]>([""]);
    const [texts, setTexts] = useState<string[]>([""]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleLinkChange = (index: number, value: string) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };

    const addLinkField = () => setLinks([...links, ""]);
    const removeLinkField = (index: number) => setLinks(links.filter((_, i) => i !== index));

    const handleTextChange = (index: number, value: string) => {
        const newTexts = [...texts];
        newTexts[index] = value;
        setTexts(newTexts);
    };

    const addTextField = () => setTexts([...texts, ""]);
    const removeTextField = (index: number) => setTexts(texts.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const filteredLinks = links.filter(l => l.trim() !== "");
        const filteredTexts = texts.filter(t => t.trim() !== "");

        if (files.length === 0 && filteredLinks.length === 0 && filteredTexts.length === 0) {
            return;
        }

        const success = await addResources({
            lectureId,
            files: files.length > 0 ? files : undefined,
            externalUrl: filteredLinks.length > 0 ? filteredLinks : undefined,
            textContent: filteredTexts.length > 0 ? filteredTexts : undefined,
        });

        if (success) {
            navigate(-1);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* File Upload Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <FileUp className="w-5 h-5 text-orange-500" />
                        Upload Files
                    </h3>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-orange-200 transition-colors bg-slate-50/50">
                    <input
                        type="file"
                        id="file-upload"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-slate-100">
                            <Plus className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400">PDF,PPTX,DOCX, JPG, PNG ... (Max 15MB each)</p>
                    </label>
                </div>
                {files.length > 0 && (
                    <div className="grid gap-2">
                        {files.map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg">
                                <span className="text-sm text-slate-600 truncate">{file.name}</span>
                                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={() => removeFile(i)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* External Links Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Link2 className="w-5 h-5 text-green-500" />
                        External Links
                    </h3>
                    <Button type="button" variant="outline" size="sm" onClick={addLinkField}>
                        <Plus className="w-4 h-4 mr-1" /> Add Link
                    </Button>
                </div>
                <div className="space-y-3">
                    {links.map((link, i) => (
                        <div key={i} className="flex gap-2">
                            <Input
                                placeholder="https://example.com"
                                value={link}
                                onChange={(e) => handleLinkChange(i, e.target.value)}
                                className="bg-white"
                            />
                            {links.length > 1 && (
                                <Button type="button" variant="ghost" size="icon" className="text-slate-400" onClick={() => removeLinkField(i)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Text Content Section - Commented out for now
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Type className="w-5 h-5 text-blue-500" />
                        Text Content
                    </h3>
                    <Button type="button" variant="outline" size="sm" onClick={addTextField}>
                        <Plus className="w-4 h-4 mr-1" /> Add Text
                    </Button>
                </div>
                <div className="space-y-3">
                    {texts.map((text, i) => (
                        <div key={i} className="flex gap-2 items-start">
                            <div className="flex-1 min-h-[250px] border border-slate-200 rounded-lg overflow-hidden">
                                <RichTextEditor
                                    content={text}
                                    onChange={(content) => handleTextChange(i, content)}
                                    placeholder="Enter lecture details or notes..."
                                />
                            </div>
                            {texts.length > 1 && (
                                <Button type="button" variant="ghost" size="icon" className="text-slate-400 mt-2" onClick={() => removeTextField(i)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            */}

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-[#0c2340] hover:bg-[#0c2340]/90 px-8"
                    disabled={isSubmitting || (files.length === 0 && links.filter(l => l.trim() !== "").length === 0 && texts.filter(t => t.trim() !== "").length === 0)}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        "Create Resources"
                    )}
                </Button>
            </div>
        </form>
    );
};
