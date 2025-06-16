export default function ClientLogos() {
    const logos = [
      "/logos/google.svg",
      "/logos/sncf.svg",
      "/logos/generali.svg",
      "/logos/swisslife.svg",
      "/logos/arkema.svg",
      "/logos/dataiku.svg",
      "/logos/quicksign.svg",
      "/logos/bayard.svg",
      "/logos/lavie.svg",
    ];
  
    return (
      <section className="bg-[#fbfbf3] py-10 border-t border-[#e5e5e5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-light uppercase text-[#01142a] tracking-widest mb-6">
            Ils nous font confiance
          </p>
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {logos.concat(logos).map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Logo ${idx}`}
                  className="h-10 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  