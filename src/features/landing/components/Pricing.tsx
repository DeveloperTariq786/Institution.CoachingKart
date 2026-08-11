import { CheckCircle2 } from "lucide-react";
import LandingButton from "@/components/common/LandingButton";

const Pricing = () => {
  return (
    <section id="pricing" className="bg-white py-16 lg:py-20 border-t border-slate-100">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-[900] tracking-tight text-[#0f172a] md:text-4xl mb-3">
            Pricing
          </h2>
          <p className="text-slate-500 font-medium">
            Pay only for active students. No upfront fixed costs.
          </p>
        </div>

        {/* Clean Minimal Pricing Card */}
        <div className="mx-auto max-w-lg">
          <div className="relative rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-xl shadow-slate-200/50 text-center">
            <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold uppercase tracking-wider mb-4">
              POPULAR
            </span>

            <h3 className="text-2xl md:text-3xl font-black text-[#0f172a] mb-2">
              Pay Per Student
            </h3>

            <div className="mb-6">
              <div className="flex items-end justify-center gap-1">
                <span className="text-5xl md:text-6xl font-black text-[#0f172a] leading-none">7%</span>
                <span className="text-base font-semibold text-slate-500 mb-1.5">of batch price</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-w-xs mx-auto text-left mb-8 text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Charged per Student per Batch</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Charged only once for a batch</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Zero fixed monthly fees</span>
              </div>
            </div>

            <LandingButton
              text="Get Started Now"
              className="w-full"
              variant="sky"
              size="md"
              rounded="full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
