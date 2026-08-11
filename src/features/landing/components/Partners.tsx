const partners = [
    { 
        name: "Zenith Exam Prep Academy", 
        logo: "/partners/Zenith-Exam-Prep-Academy.jpg" 
    },
    { 
        name: "CodeCraft Coding Institute", 
        logo: "/partners/CodeCraft-Coding-Institute.jpg" 
    },
    { 
        name: "NeuraLearn AI & Future Skills", 
        logo: "/partners/NeuraLearn-AI-&-Future-Skills.jpg" 
    },
];

const Partners = () => {
    return (
        <section id="partners" className="py-12 bg-slate-50/50 border-y border-slate-100">
            <div className="container mx-auto px-6 lg:px-12">
                <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">
                    Our Partner Institutions
                </p>

                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 transition-all">
                    {partners.map((partner) => (
                        <div 
                            key={partner.name} 
                            className="flex items-center gap-3 group hover:opacity-100 transition-all cursor-default"
                        >
                            <img 
                                src={partner.logo} 
                                alt={partner.name} 
                                className="h-12 w-12 rounded-xl object-cover border border-slate-200/80 shadow-sm group-hover:scale-105 transition-transform" 
                            />
                            <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
