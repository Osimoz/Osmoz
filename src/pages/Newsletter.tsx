import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import NewsletterForm from '../components/NewsletterForm';

const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);

const articles = [
  {
    num: '01',
    titre: 'Les leviers d\'un événement réussi',
    date: '27 avril 2026',
    description: 'Découvrez comment la réussite d\'un événement professionnel dépend des moments informels, de l\'expérience émotionnelle et du lieu. 87% des collaborateurs apprennent à travers les interactions informelles.',
    contenu: 'Cet article explore les trois leviers clés : les espaces informels où émergent les meilleures idées, l\'impact émotionnel basé sur les neurosciences, et l\'importance du lieu dans la qualité des interactions. L\'indicateur de succès n\'est pas le budget, mais ce que ça produit en termes d\'interactions, d\'idées et de décisions.',
    lien: 'https://www.linkedin.com/pulse/les-leviers-dun-%C3%A9v%C3%A9nement-r%C3%A9ussi-osmozspace-p5ezf/?trackingId=a8rxagUNRWegdlfZSL%2B%2FEg%3D%3D',
  },
  {
    num: '02',
    titre: 'Et si vos formations ne dépendaient pas seulement du contenu… mais du contexte ?',
    date: '4 mai 2026',
    description: 'Les formations efficaces dépassent la qualité du contenu. Découvrez les cinq éléments clés, dont le rôle crucial de l\'environnement physique.',
    contenu: 'La réussite des formations dépend de l\'engagement du leadership, de l\'apprentissage collaboratif, des formats mixtes, et surtout de l\'environnement physique. Un environnement quotidien limite la concentration, tandis que des lieux différents stimulent l\'attention et la clarté mentale.',
    lien: 'https://www.linkedin.com/pulse/et-si-vos-formations-ne-d%C3%A9pendaient-pas-seulement-du-contenu-ppnxf/?trackingId=xdd9SaCHRLijTAeEjvqozA%3D%3D',
  },
  {
    num: '03',
    titre: 'Séminaire, team building, codir… comment convaincre les sceptiques d\'y mettre le budget ?',
    date: '20 mai 2026',
    description: 'Maîtrisez les arguments pour sécuriser le budget de vos événements en les positionnant comme investissements stratégiques avec ROI mesurable.',
    contenu: 'Apprenez à framer vos événements comme des investissements business avec des KPIs concrets : augmentation de performance commerciale, lead generation, NPS, cost-per-lead. Les chiffres seuls ne suffisent pas—positionnez vos événements comme stratégiques plutôt que discrétionnaires.',
    lien: 'https://www.linkedin.com/pulse/s%C3%A9minaire-team-building-codir-comment-convaincre-les-sceptiques-zzx9e/?trackingId=U84vPmGzRBuH2bAOUgsOEw%3D%3D',
  },
];

export default function Newsletter() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Nos Newsletters — OSMOZ | Insights culinaires & événements</title>
        <meta
          name="description"
          content="Découvrez nos newsletters OSMOZ : articles sur les leviers des événements réussis, l'importance du contexte en formation, et le ROI des séminaires."
        />
        <link rel="canonical" href="https://osmoz.work/newsletter" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* ── HERO ── */}
      <section
        className="min-h-screen flex items-center justify-center"
        style={{ paddingTop: '72px', background: '#fafaf8' }}
      >
        <div className="max-w-4xl mx-auto px-8 sm:px-14 lg:px-16 xl:px-20 py-20 text-center">
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#862637',
              fontWeight: 500,
              marginBottom: '40px',
              textTransform: 'uppercase',
            }}
          >
            Nos insights
          </p>

          <h1
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 300,
              lineHeight: 1.15,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#01142a',
              marginBottom: '36px',
            }}
          >
            Nos newsletters<br />
            <em className="italic" style={{ color: '#862637' }}>pour réussir vos événements.</em>
          </h1>

          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#6b6860',
              maxWidth: '520px',
              fontWeight: 300,
              marginBottom: '0',
              margin: '0 auto',
            }}
          >
            Découvrez nos articles sur les leviers des événements réussis, l'importance du contexte en formation, et comment justifier votre budget.
          </p>
        </div>
      </section>

      <section className="bg-[#01142a] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-[#01142a]/95 p-8 sm:p-12">
            <NewsletterForm source="newsletter-page" submitLabel="Je m’inscris" />
          </div>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section style={{ background: '#ffffff', borderTop: '1px solid rgba(28,28,26,0.08)' }}>
        <div className="max-w-7xl mx-auto" style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'clamp(32px, 4vw, 48px)' }}>
            {articles.map((article) => (
              <div
                key={article.num}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  padding: 'clamp(32px, 4vw, 48px)',
                  background: '#fafaf8',
                  border: '1px solid rgba(28,28,26,0.08)',
                  transition: 'all 0.3s ease',
                }}
                className="hover:shadow-lg hover:bg-white"
              >
                {/* Numéro */}
                <span
                  style={{
                    fontFamily: 'Playfair Display',
                    fontSize: '0.9rem',
                    fontWeight: 300,
                    color: '#c8c4bc',
                    letterSpacing: '0.1em',
                  }}
                >
                  {article.num}
                </span>

                {/* Titre */}
                <h3
                  style={{
                    fontFamily: 'Playfair Display',
                    fontWeight: 300,
                    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                    lineHeight: 1.3,
                    color: '#01142a',
                    margin: 0,
                  }}
                >
                  {article.titre}
                </h3>

                {/* Date */}
                <p
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#862637',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {article.date}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.8,
                    color: '#6b6860',
                    fontWeight: 300,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {article.description}
                </p>

                {/* Contenu */}
                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.7,
                    color: '#9b9690',
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {article.contenu}
                </p>

                {/* Bouton */}
                <a
                  href={article.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#862637',
                    textDecoration: 'none',
                    fontWeight: 400,
                    marginTop: 'auto',
                    transition: 'gap 0.3s ease',
                  }}
                  className="group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '12px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '8px';
                  }}
                >
                  Lire l'article →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          borderTop: '1px solid rgba(28,28,26,0.08)',
          padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px)',
          background: '#01142a',
          textAlign: 'center',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(254,225,212,0.6)',
              marginBottom: '24px',
            }}
          >
            Prêt à organiser votre événement ?
          </p>
          <h2
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#ffffff',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              marginBottom: '36px',
            }}
          >
            Transformez vos idées<br />
            <em className="italic" style={{ color: '#fee1d4' }}>en événements mémorables.</em>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/reservation')}
              className="hover:bg-[#fee1d4] transition-colors duration-300"
              style={{
                padding: '14px 36px',
                background: '#fee1d4',
                color: '#01142a',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 400,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Faire une demande
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="hover:text-[#fee1d4] transition-colors"
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fafaf8',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Nous contacter →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
