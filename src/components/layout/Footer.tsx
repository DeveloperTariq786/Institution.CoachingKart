import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Linkedin, href: "#" },
  ];


  return (
    <footer className="hero-gradient border-t border-border py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center justify-center gap-2 md:justify-start group">
              <span className="text-xl font-black tracking-tight text-slate-900">Coaching<span className="text-sky-500">Kart</span></span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Digitizing Your Coaching Institutions
            </p>
          </div>

          {/* Copyright Section (Center) */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 CoachingKart. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
