import { Link } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";

const Header = () => {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-full border border-slate-200 bg-white/70 px-6 py-2 backdrop-blur-xl shadow-lg flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.LANDING} className="flex items-center h-10 w-[180px] relative shrink-0">
          <img 
            src="/assets/full-logo.webp" 
            alt="Coachingkart" 
            className="h-18 absolute left-0 top-1/2 -translate-y-1/2 object-contain" 
          />
        </Link>

        {/* Navigation Links - Centered */}
        <nav className="hidden lg:flex items-center gap-10">
          {['Features', 'Stories', 'Partners', 'Pricing', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            to={ROUTES.LOGIN}
            className="rounded-full bg-sky-500 px-8 py-2.5 text-sm font-bold text-white transition-all hover:bg-sky-600 hover:scale-[1.02] active:scale-95 shadow-md shadow-sky-500/20"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
