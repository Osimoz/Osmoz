import { Link } from 'react-router-dom';

const spaces = [
  {
    id: 'loft-osmoz',
    title: "Le Loft",
    description: "Louez cet espace élégant pour vos réunions, séminaires, ateliers ou événements d'entreprise ! Avec son design contemporain et ses équipements de pointe, il s'adapte à toutes vos exigences professionnelles.",
    image: "/images/6_DSC4719-HDR.jpg",
    capacity: "35 personnes",
    price: "À partir de 500€",
    isComingSoon: false
  },
  {
    id: 'patio-osmoz',
    title: "L'Orangerie",
    description: "Découvrez notre espace lumineux avec verrières, idéalement situé au calme dans une cour privée. Parfait pour vos événements d'entreprise, séminaires et ateliers dans un cadre unique et inspirant.",
    image: "/images/patio/patio.salon-vue-complete.jpeg",
    capacity: "25 personnes",
    price: "À partir de 500€",
    isComingSoon: true
  }
];

export default function Spaces() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-light mb-4">Nos <em className="not-italic" style={{ fontStyle: 'italic' }}>Espaces</em></h1>
          <p className="text-gray-600 font-light">
            Des lieux uniques pour vos évenements, réunions et conférence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {spaces.map((space) => (
            <div key={space.id} className="relative">
              {space.isComingSoon ? (
                // Coming Soon Card (no link, heavily blurred)
                <div className="group cursor-default bg-white rounded-lg overflow-hidden relative">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img 
                      src={space.image}
                      alt={space.title}
                      className="w-full h-full object-cover blur-[20px] grayscale"
                    />
                    {/* Heavy Coming Soon Overlay */}
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-lg">
                          <span className="text-black text-2xl font-light tracking-[0.3em] block mb-2">
                            COMING SOON
                          </span>
                          <span className="text-gray-600 text-sm font-light tracking-wide">
                            Bientôt disponible
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 opacity-40 pointer-events-none">
                    <h3 className="text-2xl font-light mb-3 text-gray-400">{space.title}</h3>
                    <p className="text-gray-400 font-light leading-relaxed mb-6">
                      {space.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-400 font-light">
                      <span>{space.capacity}</span>
                      <span>{space.price}</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular Card (with link)
                <Link to={`/spaces/${space.id}`}>
                  <div className="group cursor-pointer bg-white rounded-lg overflow-hidden relative before:absolute before:inset-0 before:z-10 before:bg-black/0 before:transition-colors hover:before:bg-black/5">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img 
                        src={space.image}
                        alt={space.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-light mb-3">{space.title}</h3>
                      <p className="text-gray-600 font-light leading-relaxed mb-6">
                        {space.description}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500 font-light">
                        <span>{space.capacity}</span>
                        <span>{space.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}