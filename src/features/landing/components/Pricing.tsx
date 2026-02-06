import { Check } from "lucide-react";
import LandingButton from "@/components/common/LandingButton";

const features = [
  "Android App",
  "Website",
  "Admin Portal",
  "Unlimited Recorded Courses",
  "Unlimited Live Classes",
  "Unlimited Student Enrolments",
  "Unlimited Storage",
  "A.I. Powered Leads",
  "24/7 Support"
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-white py-16 lg:py-20 border-t border-slate-100">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-[900] tracking-tight text-[#0f172a] md:text-4xl mb-4">
            Pricing
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Everything you need to run your institution.
          </p>
        </div>

        {/* Single Free Plan Card - Restored Compact UI */}
        <div className="mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 md:p-10 shadow-xl shadow-slate-200/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-3xl font-black text-[#0f172a] mb-2">
                  All-in-One Plan
                </h3>

                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-5xl font-[900] text-[#0f172a]">₹0</span>
                </div>

                <p className="text-slate-500 mb-6 max-w-[280px]">
                  A complete digital ecosystem for your coaching growth.
                </p>

                <LandingButton
                  text="Start Free Now"
                  className="w-full md:w-auto"
                  variant="sky"
                  size="md"
                  rounded="full"
                />
              </div>

              <div className="flex-1 bg-slate-50 rounded-2xl p-5 md:p-6">
                <h4 className="text-[10px] font-[900] text-slate-400 uppercase tracking-[0.2em] mb-4">Core Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-y-2 gap-x-4">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                      <span className="text-sm font-semibold text-slate-600 truncate">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
