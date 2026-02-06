import { ROUTES } from "@/core/routes/paths";
import LandingButton from "@/components/common/LandingButton";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-12 md:pt-40 md:min-h-[80vh] lg:min-h-screen lg:pt-52 lg:pb-32">
      {/* Background Animated Orbs / Bubbles - Dominant Visuals */}
      <div className="absolute top-[10%] left-[0%] z-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-sky-400/30 blur-[80px] md:blur-[120px] animate-float-slow opacity-90" />
      <div className="absolute top-[20%] right-[0%] z-0 h-[350px] w-[350px] md:h-[600px] md:w-[600px] rounded-full bg-indigo-400/20 blur-[100px] md:blur-[140px] animate-pulse-slow opacity-80" />
      <div className="absolute bottom-[-10%] left-[20%] z-0 h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-sky-300/30 blur-[60px] md:blur-[100px] animate-float opacity-90" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-12 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-[900] leading-[1.1] tracking-[-0.03em] text-[#0f172a] md:text-6xl lg:text-7xl mb-6 animate-slide-up">
            <span className="block whitespace-normal md:whitespace-nowrap">Make Your Offline Coaching</span>
            <span className="block text-sky-500">Online in Minutes</span>
          </h1>

          <p className="max-w-5xl text-base leading-relaxed text-slate-500 md:text-lg lg:text-xl mb-10 animate-slide-up [animation-delay:200ms] mx-auto px-4 flex flex-col items-center">
            <span className="md:block">CoachingKart lets you bring your coaching online, managing your institute,</span>
            <span className="md:block">courses, and letting your students access learning from anywhere,</span>
            <span className="md:block">all without building or maintaining your own app or website.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 animate-slide-up [animation-delay:400ms]">
            <LandingButton
              text="Start Now"
              className="w-full sm:w-auto"
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

export default Hero;

