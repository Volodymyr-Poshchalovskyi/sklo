"use client";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-40 pb-24 px-6 bg-[#0d0d0f] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <div className="flex flex-col gap-12 w-full max-w-lg">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
              CONTACT US
            </h1>
            <a 
              href="mailto:info@sklo.studio" 
              className="text-sm text-white/70 hover:text-white transition-colors w-fit"
            >
              info@sklo.studio
            </a>
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
                rows={4} 
                required 
                className="bg-transparent border-b border-white/30 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors resize-none" 
              />
            </div>
            
            <div className="pt-4 flex justify-start">
              <button 
                type="submit" 
                className="bg-white text-black text-xs font-bold uppercase tracking-widest px-12 py-4 hover:bg-white/80 transition-colors"
              >
                SEND
              </button>
            </div>
          </form>
        </div>

        <div className="w-full aspect-square bg-white/5 relative overflow-hidden flex items-center justify-center">
          <span className="text-white/20 text-xs tracking-widest uppercase">
            Placeholder
          </span>
        </div>

      </div>
    </main>
  );
}