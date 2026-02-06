const partners = [
    { name: "Global Coaching", logo: "GC" },
    { name: "EduVantage", logo: "EV" },
    { name: "SmartAcademy", logo: "SA" },
    { name: "ProLearn", logo: "PL" },
    { name: "InstituteOne", logo: "IO" },
    { name: "FutureSkill", logo: "FS" },
];

const Partners = () => {
    return (
        <section id="partners" className="py-12 bg-slate-50/50 border-y border-slate-100">
            <div className="container mx-auto px-6 lg:px-12">
                <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">
                    Trusted by leading institutions
                </p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale transition-all">
                    {partners.map((partner) => (
                        <div key={partner.name} className="flex items-center gap-2 group hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 font-black text-slate-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                {partner.logo}
                            </div>
                            <span className="text-xl font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
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
