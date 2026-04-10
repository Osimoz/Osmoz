import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);

// ─── IMAGES ───────────────────────────────────────────────────────────────────

const heroImg     = u('images/Fleur/f13dfe88-1af9-42d7-a56c-4721a5ca37d7.JPG'); // Fleur coupe asperges — hero
const fleurPortrait = u('images/Fleur/fleur-site.png'); // portrait Fleur — photo cadrée pour le site
const petitDej    = u('images/journee-petitdej.png');
const dejImg      = u('images/journee-dejeuner.jpg');
const pauseImg    = u('images/journee-pause.jpg');
const dinerImg    = u('images/journee-diner.jpg');

const mosaiqueImg = u('images/Fleur/mosaique-plats-1.png');

// ─── MENUS ────────────────────────────────────────────────────────────────────

const menus = [
  {
    num: '01',
    titre: 'Plats à partager, Automne / Hiver',
    soustitre: '',
    occasion: 'Déjeuner · Dîner',
    intro: "Une cuisine maison, de saison, préparée sur place et pensée pour être partagée au centre de la table. Le repas est composé d'une entrée, d'un plat et d'un dessert, choisis à l'avance par le groupe.",
    note: "Un choix unique pour l'ensemble du groupe · Minimum 5 personnes · Cuisine préparée sur place",
    colonnes: [
      {
        label: 'Entrées (1 choix pour le groupe)',
        items: [
          'Aubergines rôties, courgettes au citron, feta fouettée',
          'Poivrons rôtis, chèvre frais, basilic',
          'Soupe de patate douce, gingembre, lait de coco',
          'Velouté de courge rôtie, cumin, noisettes',
        ],
      },
      {
        label: 'Plats (1 choix pour le groupe)',
        items: [
          'Crumble salé champignons, chèvre, noisettes',
          'Orzo crémeux aux crevettes, citron, herbes fraîches',
          'Polpettes al sugo, boulettes de bœuf mijotées, semoule ou fregola sarda',
        ],
      },
      {
        label: 'Desserts (1 choix pour le groupe)',
        items: [
          'Tarte au citron',
          'Crumble pommes poires, cannelle, chantilly maison',
          'Tiramisu the Italian way',
        ],
      },
    ],
  },
  {
    num: '02',
    titre: 'Plats à partager, Printemps / Été',
    soustitre: '',
    occasion: 'Déjeuner · Dîner',
    intro: 'La version estivale des plats à partager : des saveurs fraîches et légères, préparées sur place par Fleur avec les produits du marché.',
    note: "Un choix unique pour l'ensemble du groupe · Minimum 5 personnes",
    colonnes: [
      {
        label: 'Entrées (1 choix pour le groupe)',
        items: [
          'Salade de tagliatelles de carottes',
          "Taboulé d'été",
          'Tarte au confit de tomates',
        ],
      },
      {
        label: 'Plats (1 choix pour le groupe)',
        items: [
          'Dahl de lentilles corail, patates douces, lait de coco, riz',
          'Poulet mariné au citron et aux herbes, semoule',
          'Lieu noir à la sicilienne aux olives et câpres, salade de fenouil et parmesan',
        ],
      },
      {
        label: 'Desserts (1 choix pour le groupe)',
        items: [
          "Tiramisu à l'italienne",
          'Crème vegan au chocolat et lait de coco',
          'Poire pochée, émietté de palet breton au sarrasin et crème fouettée',
        ],
      },
    ],
  },
  {
    num: '03',
    titre: 'Buffet de Fleur',
    soustitre: '',
    occasion: 'Déjeuner · Cocktail',
    intro: 'Un buffet maison, de saison, préparé sur place par Fleur. Des plats frais, colorés, salés et sucrés, à picorer à votre rythme. La formule : 4 plats au choix parmi notre sélection.',
    note: 'Minimum 10 personnes · Formule 4 plats au choix (ex : 2 salés + 2 desserts)',
    colonnes: [
      {
        label: 'Plats salés',
        items: [
          'Gaspacho petits pois, menthe et concombre',
          'Salade de pommes de terre',
          'Crumble de courgettes, chèvre frais et pesto',
          'Tarte au confit de tomates',
          'Tarte petits pois, ricotta et citron',
          "Taboulé d'été",
          'Cake chorizo, mozzarella et basilic',
          'Salade quinoa, asperges vertes, petits pois, feta et citron',
        ],
      },
      {
        label: 'Desserts',
        items: [
          'Tiramisu café',
          'Tarte au citron',
          'Cake citron-pavot',
          "Gâteau au fromage blanc et fleur d'oranger",
          'Fondant poire-chocolat',
          'Crème chocolat et lait de coco (vegan)',
        ],
      },
    ],
  },
  {
    num: '04',
    titre: 'Cocktail Fingerfood',
    soustitre: '',
    occasion: 'Cocktail · Soirée',
    intro: "Des assortiments de fingerfood préparés sur place par Fleur. Du soin dans chaque bouchée, du salé jusqu'au sucré.",
    note: 'Minimum 10 personnes · Service debout',
    colonnes: [
      {
        label: 'Salé',
        items: [
          'Rouleau de printemps frais, sauce cacahuète onctueuse',
          'Brioche tiède au porc effiloché, crème légère au curry doux & concombre croquant',
          'Bouchées feuilletées, crème fouettée et œufs de lompe',
          "Mini croque-monsieur jambon blanc & sel au piment d'Espelette",
          "Œuf mimosa, mayonnaise à l'estragon frais",
        ],
      },
      {
        label: 'Sucré',
        items: [
          'Mini moelleux chocolat à la crème de marron',
        ],
      },
    ],
  },
];

// ─── MOMENTS ──────────────────────────────────────────────────────────────────

const moments = [
  {
    num: '01',
    temps: 'Petit déjeuner',
    tags: ["Brigat'", 'Terroir du Nil'],
    desc: "Le ton est donné dès le matin. Viennoiseries et pains frais de nos boulangeries partenaires, pour un accueil à la hauteur de votre journée.",
    image: petitDej,
    alt: 'Petit déjeuner OSMOZ — viennoiseries et pains frais',
  },
  {
    num: '02',
    temps: 'Déjeuner',
    tags: ['Adar', 'Les Cuistots Migrateurs', 'Cheffe Fleur'],
    desc: "Des prestataires engagés dans une cuisine de qualité, préparée sur place. Plats à partager, buffet ou lunchbox : trois formats selon le rythme de votre événement.",
    image: dejImg,
    alt: 'Déjeuner OSMOZ — cuisine de qualité',
  },
  {
    num: '03',
    temps: 'Pause gourmande',
    tags: ['Café & thé', 'Douceurs du moment'],
    desc: "Une pause pensée pour recharger les esprits autant que les corps. Un moment de respiration dans votre journée, soigné dans ses moindres détails.",
    image: pauseImg,
    alt: 'Pause gourmande OSMOZ',
  },
  {
    num: '04',
    temps: 'Dîner & cocktail',
    tags: ['Cocktail dînatoire', 'Dîner assis'],
    desc: "Pour terminer en beauté ou célébrer un moment fort. Nos espaces se transforment au fil de la journée, et la table avec eux.",
    image: dinerImg,
    alt: 'Dîner OSMOZ — soirée élégante',
  },
];

// ─── ACTIVITÉS ────────────────────────────────────────────────────────────────

const activites = [
  {
    num: '01',
    titre: 'Animations culinaires',
    soustitre: 'Atelier · Sur place',
    intro: 'Des ateliers animés par des professionnels pour créer un moment de convivialité autour de la cuisine. Idéal en ice breaker ou pour dynamiser une journée.',
    items: [
      {
        nom: 'Atelier Pizzaiolo',
        duree: '2h',
        desc: "Réalisation d'une pâte artisanale de A à Z. Ouverture, garniture, enfournement. Chaque participant repart avec sa pizza.",
      },
      {
        nom: 'Atelier Pâtisserie : Œuf en Chocolat',
        duree: '2h',
        desc: "Animé par des intervenants professionnels. Moulage, assemblage et décoration d'un œuf en chocolat. Tout le matériel est fourni, chacun repart avec sa création.",
      },
      {
        nom: "L'Effet Mer, Dégustation Huîtres",
        duree: 'Sur-mesure',
        desc: "Un hôte ou une hôtesse circule parmi vos invités pour proposer une expérience fluide, élégante et chaleureuse autour des huîtres.",
      },
    ],
  },
  {
    num: '02',
    titre: 'Quiz & challenges',
    soustitre: '1h à 1h30 · Ice breaker ou plénière',
    intro: "Des formats ludiques et sur-mesure pour dynamiser vos équipes, créer de la cohésion et rendre vos événements mémorables.",
    items: [
      {
        nom: 'Bagel Quiz',
        duree: '1h',
        desc: "Questions ludiques via une web application : nuggets, sel ou poivre, menus, l'addition. Personnalisable selon vos objectifs. Proposé en ice breaker ou pour dynamiser une plénière.",
      },
      {
        nom: 'Blind Test',
        duree: '30min – 1h30',
        desc: "Culture pop', chansons cultes, phrases de films mythiques. Option : chanteuse en live. Contenu développé sur mesure.",
      },
      {
        nom: 'Meet & Win',
        duree: '1h – 1h30',
        desc: "Créer de la valeur en équipe à partir de ressources limitées dans un temps imparti. Faible logistique, fort impact sur la cohésion.",
      },
    ],
  },
  {
    num: '03',
    titre: 'Créativité & immersion',
    soustitre: '2h à 3h · Cohésion & RSE',
    intro: "Des expériences immersives qui mobilisent la créativité, la collaboration et la gestion de projet, avec ou sans réalité virtuelle.",
    items: [
      {
        nom: 'Atelier Doublage',
        duree: '2h – 2h30',
        desc: "Les équipes réécrivent et doublent un extrait de film en y intégrant leurs propres codes et créativité. Présentation en direct devant le groupe.",
      },
      {
        nom: 'Green City, RSE',
        duree: '2h – 3h',
        desc: "Construction en équipe de la maquette de la ville idéale de demain. Développe la créativité, la gestion de projet et sensibilise aux enjeux RSE.",
      },
      {
        nom: 'Réalité Virtuelle, Démineur',
        duree: 'Sur-mesure',
        desc: "Coopérer en ayant différentes visions du monde. Communication rapide et efficace pour désamorcer une bombe virtuelle.",
      },
      {
        nom: 'Réalité Virtuelle, Minotaure',
        duree: 'Sur-mesure',
        desc: "Plongée dans un univers inconnu pour révéler les modes de décision et réflexes sous pression. Débrief individuel avec coach inclus.",
      },
    ],
  },
];

// ─── REASSURANCE ─────────────────────────────────────────────────────────────

const reassurances = [
  {
    number: '01',
    titre: 'Rien de préconfiguré',
    desc: "Vous nous dites ce que vous voulez, on adapte. Format, équipe, contraintes horaires, régimes alimentaires : chaque prestation est construite pour vous, pas pour un groupe générique.",
  },
  {
    number: '02',
    titre: "On s'occupe de tout en amont",
    desc: "Vaisselle, mise en place, service, Cheffe privée. Vous n'avez pas à vous en préoccuper. Moins de logistique dans votre tête, plus d'attention pour vos équipes. Une fois dans le lieu, vous êtes comme chez vous à la maison !",
  },
  {
    number: '03',
    titre: "Des partenaires qu'on a choisis",
    desc: "On ne travaille pas avec n'importe qui. Nos prestataires cuisinent de saison, préparent sur place, et partagent notre obsession du détail. Vous sentez la différence dans l'assiette.",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function Experience() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(-1);

  // Parallax immersive section
  const immersiveRef = useRef<HTMLDivElement>(null);
  const [immersiveProgress, setImmersiveProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!immersiveRef.current) return;
      const rect = immersiveRef.current.getBoundingClientRect();
      const total = immersiveRef.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      setImmersiveProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Expérience — OSMOZ | Cuisine & moments culinaires à Paris</title>
        <meta
          name="description"
          content="L'expérience culinaire OSMOZ : cuisine sur place par Fleur, petit déjeuner, déjeuner, pause gourmande et dîner. Des prestations pensées pour vos équipes à Paris."
        />
        <link rel="canonical" href="https://osmoz.work/experience" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* ── 1. HERO ── */}
      <section
        className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ paddingTop: '72px' }}
      >
        {/* Left — texte */}
        <div
          className="relative flex flex-col justify-center px-8 sm:px-14 lg:px-16 xl:px-20 py-20"
          style={{ background: '#fafaf8' }}
        >
          <div
            className="absolute top-0 bottom-0 right-0 hidden lg:block"
            style={{ width: '1px', background: 'rgba(28,28,26,0.08)' }}
          />

          <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#862637', fontWeight: 500, marginBottom: '40px', textTransform: 'uppercase' }}>
            L'expérience OSMOZ
          </p>

          <h1
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 300,
              lineHeight: 1.05,
              fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
              color: '#01142a',
              marginBottom: '36px',
            }}
          >
            Une journée qui compte,<br />
            <em className="italic">dans les moindres</em><br />
            détails.
          </h1>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: '#6b6860',
              maxWidth: '420px',
              fontWeight: 300,
              marginBottom: '56px',
            }}
          >
            De la première viennoiserie au dernier verre, chaque moment est pensé pour accompagner votre équipe tout au long de la journée.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('fleur')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:bg-[#862637] transition-colors duration-300"
              style={{ padding: '14px 32px', background: '#01142a', color: '#fafaf8', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 400, border: 'none', cursor: 'pointer' }}
            >
              Découvrir l'expérience
            </button>
            <button
              onClick={() => navigate('/reservation')}
              className="hover:text-[#01142a] transition-colors"
              style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6860', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Faire une demande →
            </button>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: 'absolute', bottom: '40px', left: 'clamp(32px, 5vw, 80px)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '1px', background: '#c8c4bc' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b6860' }}>Défiler</span>
          </div>
        </div>

        {/* Right — photo */}
        <div className="hidden lg:block relative overflow-hidden" style={{ minHeight: '100%' }}>
          <img
            src={heroImg}
            alt="Fleur, cheffe privée OSMOZ"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── 2. INTRO NARRATIVE ── */}
      <section
        style={{
          borderTop: '1px solid rgba(28,28,26,0.08)',
          padding: 'clamp(80px, 10vw, 160px) clamp(24px, 5vw, 60px)',
          background: '#fafaf8',
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-20 items-start">
          <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 lg:sticky lg:top-28 pt-1">
            Notre approche
          </p>
          <div className="max-w-3xl">
            <h2
              className="font-light text-[#01142a] mb-10"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', lineHeight: '1.3' }}
            >
              Un événement réussi se joue aussi{' '}
              <em className="italic text-[#862637]">à table.</em>
            </h2>
            <p
              className="font-light text-gray-500 md:columns-2 md:gap-12"
              style={{ fontSize: '16px', lineHeight: 2 }}
            >
              Chez OSMOZ, l'expérience ne s'arrête pas à la porte de la salle. Nous avons
              sélectionné des partenaires culinaires qui partagent nos exigences : des produits
              de saison, une cuisine préparée sur place, un soin du détail qui se sent dans
              chaque assiette. Du petit déjeuner au dîner, chaque moment est pensé pour que
              votre équipe se sente vraiment accueillie.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. IMMERSIVE PARALLAX ── */}
      <div ref={immersiveRef} style={{ position: 'relative', height: '200vh' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Image avec parallax */}
          <img
            src={fleurPortrait}
            alt="Cuisine de Fleur — OSMOZ"
            style={{
              position: 'absolute',
              top: '-10%',
              left: 0,
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              objectPosition: 'center 25%',
              transform: `translateY(${immersiveProgress * 12}%)`,
              willChange: 'transform',
            }}
          />

          {/* Overlay progressif */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `rgba(1,20,42,${0.15 + immersiveProgress * 0.55})`,
              transition: 'background 0.05s',
            }}
          />

          {/* Texte central — apparaît en défilant */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 clamp(24px, 5vw, 80px)',
              textAlign: 'center',
              opacity: immersiveProgress > 0.12 ? 1 : 0,
              transform: `translateY(${Math.max(0, (0.12 - immersiveProgress)) * 200}px)`,
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(254,225,212,0.7)',
              marginBottom: '32px',
              fontWeight: 400,
            }}>
              La cuisine de Fleur
            </p>
            <h2
              style={{
                fontFamily: 'Playfair Display',
                fontWeight: 300,
                fontSize: 'clamp(2.2rem, 5vw, 5rem)',
                lineHeight: 1.1,
                color: '#ffffff',
                maxWidth: '800px',
                marginBottom: '40px',
              }}
            >
              Une cuisine maison, <em className="italic" style={{ color: '#fee1d4' }}>de saison,</em> et colorée !
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'rgba(254,225,212,0.4)', margin: '0 auto' }} />
          </div>

          {/* Indicateur de scroll bas de page — disparaît en défilant */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              opacity: 1 - immersiveProgress * 4,
              transition: 'opacity 0.3s',
            }}
          >
            <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Défiler</span>
            <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.25)', animation: 'none' }} />
          </div>
        </div>
      </div>

      {/* ── 5. CUISINE DE FLEUR ── */}
      <section id="fleur" style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#fafaf8' }}>

        {/* Texte pleine largeur */}
        <div
          style={{
            padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 60px)',
          }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-20 items-start">
            <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#862637', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '4px' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#862637' }} />
              Cheffe privée
            </p>
            <div>
              <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 300, lineHeight: 1.15, color: '#01142a', marginBottom: '32px', fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}>
                On vous présente<br />
                <em className="italic" style={{ color: '#862637' }}>notre Cheffe privée adorée !</em>
              </h2>
              <div style={{ fontSize: '15px', lineHeight: 2, color: '#6b6860', fontWeight: 300, maxWidth: '560px', marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p>
                  Fleur a rejoint OSMOZ il y a quelques mois et on vous fait découvrir sa cuisine.
                  Apparemment, la food et le wine la rendent heureuse. Nous, c'est sa cuisine !
                </p>
                <p>
                  Tout est fait maison avec des produits de saison, en buffet, cocktails ou en plats à partager.
                </p>
                <p>
                  Nos coups de cœur : son <em style={{ fontStyle: 'italic', color: '#01142a' }}>orzo crémeux aux crevettes</em>, ses <em style={{ fontStyle: 'italic', color: '#01142a' }}>polpettes al sugo</em> ou encore le <em style={{ fontStyle: 'italic', color: '#01142a' }}>tiramisu</em>, qui font l'unanimité à chaque fois !
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Cuisine sur place', 'Produits de saison', 'Maison & généreux'].map(tag => (
                  <span key={tag} style={{ padding: '6px 14px', border: '1px solid rgba(28,28,26,0.12)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6860' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mosaïque plats — avec respiration */}
        <div className="w-full" style={{ padding: '0 clamp(24px, 4vw, 60px) clamp(64px, 8vw, 120px)' }}>
          <img
            src={mosaiqueImg}
            alt="Mosaïque des plats de Fleur — OSMOZ"
            loading="lazy"
            className="w-full h-auto block"
            style={{ display: 'block' }}
          />
        </div>
      </section>

      {/* ── 4. MENUS ── */}
      <section style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#ffffff' }}>

        {/* En-tête section */}
        <div style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px) clamp(48px, 6vw, 80px)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-20 items-end">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 pt-1">
              Ses menus
            </p>
            <div>
              <h2
                className="font-light text-[#01142a]"
                style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', lineHeight: 1.2, marginBottom: '16px' }}
              >
                Ce que Fleur prépare pour vous.
              </h2>
              <p style={{ fontSize: '14px', color: '#9b9690', fontWeight: 300, letterSpacing: '0.02em' }}>
                Cliquez sur un menu pour découvrir les plats.
              </p>
            </div>
          </div>
        </div>

        {/* Accordéon */}
        <div className="max-w-7xl mx-auto" style={{ padding: '0 clamp(24px, 5vw, 60px) clamp(80px, 10vw, 140px)' }}>
          {menus.map((menu, i) => {
            const open = activeMenu === i;
            return (
              <div key={menu.titre} style={{ borderTop: '1px solid rgba(28,28,26,0.08)' }}>

                {/* Ligne cliquable */}
                <button
                  onClick={() => setActiveMenu(open ? -1 : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(28px, 4vw, 44px) 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(20px, 3vw, 48px)', flex: 1 }}>
                    <span style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(0.75rem, 1vw, 0.9rem)', fontWeight: 300, color: '#c8c4bc', letterSpacing: '0.05em', flexShrink: 0 }}>
                      {menu.num}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: 'Playfair Display',
                          fontWeight: 300,
                          fontSize: 'clamp(1.4rem, 3vw, 2.8rem)',
                          lineHeight: 1.1,
                          color: open ? '#862637' : '#01142a',
                          fontStyle: 'italic',
                          transition: 'color 0.3s ease',
                          margin: 0,
                        }}
                      >
                        {menu.titre}
                      </h3>
                      {menu.soustitre && (
                        <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9b9690', marginTop: '6px', fontWeight: 400 }}>
                          {menu.soustitre}
                        </p>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
                    <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9b9690', display: 'none' }} className="sm:inline">
                      {menu.occasion}
                    </span>
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid rgba(28,28,26,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 200,
                        color: open ? '#862637' : '#01142a',
                        transition: 'all 0.3s ease',
                        transform: open ? 'rotate(45deg)' : 'none',
                        flexShrink: 0,
                        lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Contenu accordéon */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ paddingBottom: 'clamp(48px, 6vw, 80px)' }}>

                      {/* Intro */}
                      <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#6b6860', fontWeight: 300, marginBottom: '40px', maxWidth: '620px' }}>
                        {menu.intro}
                      </p>

                      {/* Colonnes plats */}
                      <div
                        className={`grid grid-cols-1 ${menu.colonnes.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}
                        style={{ gap: '0', borderTop: '1px solid rgba(28,28,26,0.07)' }}
                      >
                        {menu.colonnes.map((col, ci) => (
                          <div
                            key={col.label}
                            style={{
                              padding: 'clamp(24px, 3vw, 36px) clamp(20px, 2.5vw, 32px) clamp(24px, 3vw, 36px) 0',
                              paddingLeft: ci > 0 ? 'clamp(20px, 2.5vw, 32px)' : '0',
                              borderLeft: ci > 0 ? '1px solid rgba(28,28,26,0.07)' : 'none',
                            }}
                          >
                            <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#862637', marginBottom: '20px', fontWeight: 500 }}>
                              {col.label}
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {col.items.map((item) => (
                                <li
                                  key={item}
                                  style={{
                                    fontSize: '13px',
                                    color: '#01142a',
                                    fontWeight: 300,
                                    padding: '10px 0',
                                    borderBottom: '1px solid rgba(28,28,26,0.05)',
                                    lineHeight: 1.6,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '12px',
                                  }}
                                >
                                  <span style={{ width: '16px', height: '1px', background: 'rgba(134,38,55,0.3)', flexShrink: 0, marginTop: '8px', display: 'inline-block' }} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Note bas */}
                      <p style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b5b0a8', marginTop: '24px' }}>
                        {menu.note}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
          {/* Dernière hairline */}
          <div style={{ borderTop: '1px solid rgba(28,28,26,0.08)' }} />
        </div>

      </section>

      {/* ── 5. MOMENTS DE LA JOURNÉE ── */}
      <section style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#fafaf8' }}>

        {/* En-tête */}
        <div style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px) clamp(56px, 7vw, 96px)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-20 items-end">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 pt-1">La journée</p>
            <h2 className="font-light text-[#01142a]" style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)', lineHeight: 1.2 }}>
              Chaque moment, pensé pour vous.
            </h2>
          </div>
        </div>

        {/* Grille 2×2 — même format pour toutes les images */}
        <div className="max-w-7xl mx-auto" style={{ padding: '0 clamp(24px, 5vw, 60px) clamp(80px, 10vw, 140px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
            {moments.map((m) => (
              <div key={m.temps} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Photo — ratio fixe identique pour tous */}
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#e8e4dc' }}>
                  <img
                    src={m.image}
                    alt={m.alt}
                    loading="lazy"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  />
                  {/* Numéro overlay */}
                  <span style={{
                    position: 'absolute', top: '20px', left: '20px',
                    fontFamily: 'Playfair Display', fontWeight: 300, fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em',
                  }}>
                    {m.num}
                  </span>
                </div>

                {/* Texte sous l'image */}
                <div style={{ paddingBottom: '8px' }}>
                  <p style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#862637', marginBottom: '10px', fontWeight: 500 }}>
                    {m.temps}
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#6b6860', fontWeight: 300, marginBottom: '16px' }}>
                    {m.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {m.tags.map(t => (
                      <span key={t} style={{ padding: '4px 12px', border: '1px solid rgba(28,28,26,0.10)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9b9690' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. ACTIVITÉS & ANIMATIONS ── */}
      <section style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#ffffff' }}>

        {/* En-tête */}
        <div style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px) clamp(48px, 6vw, 80px)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-20 items-end">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 pt-1">Activités</p>
            <div>
              <h2 className="font-light text-[#01142a]" style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)', lineHeight: 1.2, marginBottom: '16px' }}>
                Animations & expériences pour vos équipes.
              </h2>
              <p style={{ fontSize: '14px', color: '#9b9690', fontWeight: 300, maxWidth: '520px', lineHeight: 1.8 }}>
                En ice breaker, pour dynamiser une plénière ou clôturer une journée. Des activités sur-mesure pour rendre chaque événement mémorable.
              </p>
            </div>
          </div>
        </div>

        {/* Accordéon activités */}
        <div className="max-w-7xl mx-auto" style={{ padding: '0 clamp(24px, 5vw, 60px) clamp(80px, 10vw, 140px)' }}>
          {activites.map((cat, i) => {
            const openAct = activeMenu === 100 + i;
            return (
              <div key={cat.titre} style={{ borderTop: '1px solid rgba(28,28,26,0.08)' }}>

                {/* Ligne accordéon */}
                <button
                  onClick={() => setActiveMenu(openAct ? -1 : 100 + i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(24px, 3.5vw, 40px) 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(20px, 3vw, 48px)', flex: 1 }}>
                    <span style={{ fontFamily: 'Playfair Display', fontSize: '0.85rem', fontWeight: 300, color: '#c8c4bc', letterSpacing: '0.05em', flexShrink: 0 }}>
                      {cat.num}
                    </span>
                    <div>
                      <h3 style={{ fontFamily: 'Playfair Display', fontWeight: 300, fontSize: 'clamp(1.3rem, 2.5vw, 2.4rem)', lineHeight: 1.1, color: openAct ? '#862637' : '#01142a', fontStyle: 'italic', transition: 'color 0.3s', margin: 0 }}>
                        {cat.titre}
                      </h3>
                      <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9b9690', marginTop: '6px' }}>
                        {cat.soustitre}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    border: '1px solid rgba(28,28,26,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', fontWeight: 200,
                    color: openAct ? '#862637' : '#01142a',
                    transition: 'all 0.3s ease',
                    transform: openAct ? 'rotate(45deg)' : 'none',
                    flexShrink: 0, lineHeight: 1,
                  }}>+</span>
                </button>

                {/* Contenu */}
                <div style={{ display: 'grid', gridTemplateRows: openAct ? '1fr' : '0fr', transition: 'grid-template-rows 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ paddingBottom: 'clamp(40px, 5vw, 72px)' }}>
                      <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#6b6860', fontWeight: 300, marginBottom: '36px', maxWidth: '580px' }}>
                        {cat.intro}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderTop: '1px solid rgba(28,28,26,0.07)' }}>
                        {cat.items.map((item) => (
                          <div key={item.nom} style={{ padding: 'clamp(20px, 2.5vw, 28px) 0', borderBottom: '1px solid rgba(28,28,26,0.07)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'start' }}>
                            <div>
                              <p style={{ fontFamily: 'Playfair Display', fontWeight: 400, fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', color: '#01142a', marginBottom: '8px', fontStyle: 'italic' }}>
                                {item.nom}
                              </p>
                              <p style={{ fontSize: '13px', lineHeight: 1.75, color: '#6b6860', fontWeight: 300, maxWidth: '560px' }}>
                                {item.desc}
                              </p>
                            </div>
                            <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b5b0a8', whiteSpace: 'nowrap', paddingTop: '4px' }}>
                              {item.duree}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
          <div style={{ borderTop: '1px solid rgba(28,28,26,0.08)' }} />
        </div>
      </section>

      {/* ── 6. RÉASSURANCE ── */}
      <section
        style={{
          borderTop: '1px solid rgba(28,28,26,0.08)',
          background: '#01142a',
          overflow: 'hidden',
        }}
      >
        {/* Citation centrale */}
        <div
          style={{
            padding: 'clamp(72px, 9vw, 120px) clamp(24px, 5vw, 60px)',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(254,225,212,0.5)', marginBottom: '32px' }}>
            Notre promesse
          </p>
          <h2
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 300,
              fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)',
              lineHeight: 1.25,
              color: '#ffffff',
              maxWidth: '760px',
              margin: '0 auto',
            }}
          >
            Ce qu'on fait pour que vous{' '}
            <em className="italic" style={{ color: '#fee1d4' }}>n'ayez pas à y penser.</em>
          </h2>
        </div>

        {/* 3 blocs */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {reassurances.map((r, i) => (
            <div
              key={r.number}
              style={{
                padding: 'clamp(48px, 6vw, 80px) clamp(32px, 4vw, 56px)',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 300, color: 'rgba(254,225,212,0.15)', lineHeight: 1, marginBottom: '32px' }}>
                {r.number}
              </p>
              <h3 style={{ fontFamily: 'Playfair Display', fontWeight: 300, fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', color: '#ffffff', lineHeight: 1.3, marginBottom: '16px', fontStyle: 'italic' }}>
                {r.titre}
              </h3>
              <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section
        style={{
          borderTop: '1px solid rgba(28,28,26,0.08)',
          padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px)',
          background: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#6b6860', marginBottom: '24px' }}>
            Organiser votre journée
          </p>
          <h2
            className="mx-auto"
            style={{
              fontFamily: 'Playfair Display', fontWeight: 300, lineHeight: 1.2,
              color: '#01142a', fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
              maxWidth: '600px', marginBottom: '24px',
            }}
          >
            Une journée pensée{' '}
            <em className="italic" style={{ color: '#862637' }}>dans les moindres détails.</em>
          </h2>
          <p style={{ fontSize: '15px', fontWeight: 300, color: '#6b6860', maxWidth: '400px', margin: '0 auto 48px', lineHeight: 1.9 }}>
            Dites-nous ce que vous souhaitez. On s'occupe de tout.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/reservation')}
              className="hover:bg-[#862637] transition-colors duration-300"
              style={{ padding: '14px 36px', background: '#01142a', color: '#fafaf8', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 400, border: 'none', cursor: 'pointer' }}
            >
              Faire une demande
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="hover:text-[#01142a] transition-colors"
              style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6860', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Nous contacter →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
