import Link from "next/link";

export default function Footer({ locale }) {
  return (
    <footer className="w-full bg-[#0d0d0f] text-white pt-24 pb-16 px-6 border-t border-white/10">
      
      <div className="max-w-7xl mx-auto mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide uppercase leading-tight max-w-sm">
            Looking to start your<br/>next project?
          </h2>
          <p className="text-sm text-white/70 leading-relaxed max-w-md">
            Fill out some info and we will be in touch shortly. We can&apos;t wait to hear from you!
          </p>
        </div>
        
        <form className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-white/70">Name</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <input 
                  type="text" 
                  placeholder="First Name (required)" 
                  required 
                  className="bg-transparent border-b border-white/30 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <input 
                  type="text" 
                  placeholder="Last Name (required)" 
                  required 
                  className="bg-transparent border-b border-white/30 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors" 
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <input 
              type="email" 
              placeholder="Email (required)" 
              required 
              className="bg-transparent border-b border-white/30 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors" 
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <textarea 
              placeholder="Message (required)" 
              rows={1} 
              required 
              className="bg-transparent border-b border-white/30 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors resize-none overflow-hidden" 
            />
          </div>
          
          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              className="text-sm text-white hover:text-white/70 transition-colors px-4 py-1"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-widest uppercase">SKLO STUDIO</h2>
          <a href="mailto:info@sklo.studio" className="text-sm text-white/70 hover:text-white transition-colors">
            info@sklo.studio
          </a>
        </div>

        <div className="flex gap-20">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold mb-1">Explore</span>
            <Link href={`/${locale}/about`} className="text-sm text-white/70 hover:text-white transition-colors">About us</Link>
            <Link href={`/${locale}/contact`} className="text-sm text-white/70 hover:text-white transition-colors">Contact</Link>
            <Link href={`/${locale}/services`} className="text-sm text-white/70 hover:text-white transition-colors">Services</Link>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold mb-1">Follow us</span>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Behance</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <Link href={`/${locale}/contact`} className="block w-full md:w-[280px] bg-[#e6e6e6] text-black text-center py-6 font-medium hover:bg-white transition-colors">
            Contact us
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-white/50">
        <span>© {new Date().getFullYear()} SKLO Studio.</span>
      </div>
    </footer>
  );
}