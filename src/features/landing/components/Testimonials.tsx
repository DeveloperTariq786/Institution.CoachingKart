import { Quote } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

const testimonials = [
  {
    name: "Dr. Rajesh Sharma",
    role: "Founder & Director",
    organization: "Zenith Exam Prep Academy",
    logo: "/partners/Zenith-Exam-Prep-Academy.jpg",
    quote: "CoachingKart transformed how we manage competitive exam batches and student enrollments. The seamless pay-per-student model makes scaling effortless."
  },
  {
    name: "Anand Verma",
    role: "Head of Operations",
    organization: "CodeCraft Coding Institute",
    logo: "/partners/CodeCraft-Coding-Institute.jpg",
    quote: "Managing live classes and course content used to be complex. With CoachingKart, our students get a top-tier digital portal while we save hours on admin work."
  },
  {
    name: "Dr. Neha Kapoor",
    role: "Academic Director",
    organization: "NeuraLearn AI & Future Skills",
    logo: "/partners/NeuraLearn-AI-&-Future-Skills.jpg",
    quote: "Our student engagement increased dramatically after launching on CoachingKart. The custom institutional experience is world-class!"
  }
];

const Testimonials = () => {
  return (
    <section id="stories" className="bg-background py-20 lg:py-28 overflow-hidden font-plus">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-[900] tracking-tight text-[#0f172a] md:text-5xl lg:text-6xl mb-6">
            Success <span className="text-sky-500">Stories</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Hear from educators who are building better learning experiences with <span className="font-bold text-sky-600">CoachingKart.</span>
          </p>
        </div>
      </div>

      {/* Testimonials Scrolling Container */}
      <div className="relative flex overflow-hidden py-10">
        <div className="flex animate-marquee hover-pause gap-8 whitespace-nowrap">
          {/* Repeat items for seamless loop */}
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <Card
              key={index}
              className="w-[290px] md:w-[360px] shrink-0 border-slate-100 bg-white shadow-lg shadow-slate-200/40 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/30 hover:shadow-sky-500/10 rounded-2xl"
            >
              <CardContent className="p-6 whitespace-normal">
                {/* Quote Icon */}
                <Quote className="mb-3 h-7 w-7 text-sky-500/20" />

                {/* Quote Text */}
                <p className="mb-5 text-slate-600 text-sm leading-relaxed font-medium italic">
                  "{testimonial.quote}"
                </p>

                {/* Institution Logo & Author Info */}
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
                    <img
                      src={testimonial.logo}
                      alt={testimonial.organization}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0f172a] text-sm leading-tight">
                      {testimonial.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-xs font-bold text-sky-600">
                      {testimonial.organization}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default Testimonials;
