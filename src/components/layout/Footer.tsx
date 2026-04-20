import { Link } from "react-router-dom";

const Footer = () => {


  return (
    <footer className="hero-gradient border-t border-border py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center justify-center relative h-12 w-[180px] md:justify-start group mx-auto md:mx-0">
              <img 
                src="/assets/full-logo.webp" 
                alt="Coachingkart" 
                className="h-20 absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-1/2 -translate-y-1/2 object-contain" 
              />
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Digitizing Your Coaching Institutions
            </p>
          </div>

          {/* Copyright Section (Right) */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} <span className="font-bold text-sky-500">CoachingKart</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
