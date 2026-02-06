import { Quote } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

const testimonials = [
  {
    name: "Vijay Kumar Pooniya",
    organization: "Vijay Education",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    quote: "CoachingKart transformed how I deliver content to my students. The platform is intuitive and powerful."
  },
  {
    name: "Mohit Goenka",
    organization: "Eduniti",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    quote: "Our student engagement increased by 40% after switching to CoachingKart. Highly recommended!"
  },
  {
    name: "Baljinder Singh",
    organization: "Positive Vibes",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    quote: "The best decision I made for my coaching business. Simple, effective, and professional."
  },
  {
    name: "Priya Sharma",
    organization: "Bright Academy",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    quote: "Management is so much easier now. I can focus on teaching while the platform handles the rest."
  },
  {
    name: "Rajesh Khanna",
    organization: "Khanna Classes",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    quote: "The automated testing feature saved me hundreds of hours. My students love the instant results."
  },
  {
    name: "Anjali Mehta",
    organization: "Mehta Tutorials",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    quote: "A complete solution for any modern coaching center. The branding options are fantastic."
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
            Join 10,000+ educators who have transformed their coaching with CoachingKart.
          </p>
        </div>
      </div>

      {/* Testimonials Scrolling Container */}
      <div className="relative flex overflow-hidden py-10">
        <div className="flex animate-marquee hover-pause gap-8 whitespace-nowrap">
          {/* Double the items for seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <Card
              key={index}
              className="w-[350px] md:w-[450px] shrink-0 border-slate-100 bg-white shadow-xl shadow-slate-200/40 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/30 hover:shadow-sky-500/10 rounded-[2.5rem]"
            >
              <CardContent className="p-8 whitespace-normal">
                {/* Quote Icon */}
                <Quote className="mb-6 h-10 w-10 text-sky-500/20" />

                {/* Quote Text */}
                <p className="mb-8 text-slate-600 text-lg leading-relaxed font-medium italic">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-sky-500/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0f172a] text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm font-semibold text-sky-600">
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
