"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({ locale }) {
  const pathname = usePathname();
  const isContactPage = pathname?.endsWith("/contact");

  return (
    <footer className="section-shell hairline-top w-full text-white pt-24 pb-16 px-6">
      
      {!isContactPage && (
        <div className="max-w-7xl mx-auto mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="eyebrow">Get in touch</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase leading-tight max-w-sm">
              Looking to start your<br/>next project?
            </h2>
            <p className="text-base text-white/70 leading-relaxed max-w-md">
              Fill out some info and we will be in touch shortly. We can&apos;t wait to hear from you!
            </p>
            <a
              href="mailto:info@sklo.studio"
              className="text-sm text-white/50 hover:text-white transition-colors duration-300 w-fit"
            >
              …or just email us at <span className="underline underline-offset-4">info@sklo.studio</span>
            </a>
          </div>

          <div className="tile no-lift p-8 md:p-10 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            {/* Subtle background glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            
            <form className="flex flex-col gap-6 w-full relative z-10">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-white/50">Name</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name (required)" 
                    required 
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:bg-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300" 
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name (required)" 
                    required 
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:bg-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300" 
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-white/50">Email Address</span>
                <input 
                  type="email" 
                  placeholder="Email (required)" 
                  required 
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:bg-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300" 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-white/50">Your Message</span>
                <textarea 
                  placeholder="Message (required)" 
                  rows={4} 
                  required 
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:bg-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300 resize-none" 
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  type="submit" 
                  className="footer-submit-btn black-shimmer group inline-flex items-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer border border-white/10"
                  style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
                >
                  Send
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24">
        <div className="flex flex-col gap-4 max-w-sm">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-widest uppercase text-white">
            SKLO STUDIO
          </h2>
          <a 
            href="mailto:info@sklo.studio" 
            className="text-base sm:text-lg text-white/60 hover:text-white transition-colors duration-300 hover:underline w-fit"
          >
            info@sklo.studio
          </a>
        </div>

        <div className="grid grid-cols-2 gap-16 lg:gap-32 w-full lg:w-auto">
          <div className="flex flex-col gap-4">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">
              Explore
            </span>
            <Link href={`/${locale}/about`} className="text-lg sm:text-xl font-medium text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1.5 inline-block">
              About us
            </Link>
            <Link href={`/${locale}/contact`} className="text-lg sm:text-xl font-medium text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1.5 inline-block">
              Contact
            </Link>
            <Link href={`/${locale}/services`} className="text-lg sm:text-xl font-medium text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1.5 inline-block">
              Services
            </Link>
            <Link href={`/${locale}/gallery`} className="text-lg sm:text-xl font-medium text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1.5 inline-block">
              Portfolio
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">
              Follow us
            </span>
            <a href="#" className="text-lg sm:text-xl font-medium text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1.5 inline-block">
              Behance
            </a>
            <a href="#" className="text-lg sm:text-xl font-medium text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1.5 inline-block">
              Instagram
            </a>
            <a href="#" className="text-lg sm:text-xl font-medium text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1.5 inline-block">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-white/50">
        <span>© {new Date().getFullYear()} SKLO Studio.</span>
      </div>

      <style>{`
        .black-shimmer {
          position: relative;
        }
        .black-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 2.5px;
          background: linear-gradient(
            90deg,
            #000000 0%,
            #000000 30%,
            #888888 50%,
            #000000 70%,
            #000000 100%
          );
          background-size: 200% 100%;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: blackShimmer 3.2s ease-in-out infinite;
        }
        @keyframes blackShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </footer>
  );
}