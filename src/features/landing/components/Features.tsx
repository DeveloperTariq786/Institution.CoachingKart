import {
  Building2,
  Palette,
  BookOpen,
  Video,
  Users,
  Trophy
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Register Your Coaching",
    description: "Get your tuition online in just a few simple steps."
  },
  {
    icon: Palette,
    title: "Customize Your Institute",
    description: "Add your logo, name, description, and choose your own color theme."
  },
  {
    icon: BookOpen,
    title: "Courses & Programs",
    description: "Create courses, batches, and programs offered by your coaching."
  },
  {
    icon: Video,
    title: "Online Lectures from Home",
    description: "Students can attend live classes and watch recorded lectures anytime."
  },
  {
    icon: Users,
    title: "Faculty & Centers",
    description: "Show your faculty details and display offline coaching center locations."
  },
  {
    icon: Trophy,
    title: "Results & Performance",
    description: "Showcase student results and achievements to build trust and credibility."
  }
];

const Features = () => {
  return (
    <section id="features" className="relative bg-white py-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[20%] left-[-5%] -z-0 h-96 w-96 rounded-full bg-sky-50/50 blur-[100px]" />
      <div className="absolute bottom-[20%] right-[-5%] -z-0 h-96 w-96 rounded-full bg-indigo-50/50 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-[900] tracking-tight text-[#0f172a] md:text-4xl lg:text-5xl mb-6">
            Our Features
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            CoachingKart brings everything needed to run, manage, and grow coaching—without the hassle of managing it all themselves.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white border border-slate-100 rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-2xl bg-slate-50 p-4 transition-colors duration-500 group-hover:bg-sky-500 shadow-sm">
                  <feature.icon className="h-6 w-6 text-sky-500 transition-colors duration-500 group-hover:text-white" />
                </div>

                <h3 className="mb-2 text-xl font-bold text-[#0f172a] tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-slate-500 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
