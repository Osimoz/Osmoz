import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type ApiArticle = {
  id?: string | number;
  title?: string;
  slug?: string;
  meta_description?: string;
  excerpt?: string;
  created_at?: string;
  content_html?: string;
};

const FR_MONTHS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

function formatFrDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return `${d.getDate()} ${FR_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

type State =
  | { phase: 'loading' }
  | { phase: 'not-found' }
  | { phase: 'error'; message: string }
  | { phase: 'ready'; article: ApiArticle };

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [state, setState] = useState<State>({ phase: 'loading' });

  useEffect(() => {
    if (!slug) {
      setState({ phase: 'not-found' });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        // 1) Récupère la liste, trouve par slug, puis 2) fetch par id pour le content_html.
        const listRes = await fetch('/.netlify/functions/articles-proxy');
        if (!listRes.ok) throw new Error(`Liste indisponible (HTTP ${listRes.status})`);
        const listPayload = (await listRes.json()) as { articles?: ApiArticle[] };
        const list = listPayload.articles ?? [];
        const match = list.find((a) => a.slug === slug);
        if (!match || match.id == null) {
          if (!cancelled) setState({ phase: 'not-found' });
          return;
        }
        const detailRes = await fetch(
          `/.netlify/functions/articles-proxy?id=${encodeURIComponent(String(match.id))}`
        );
        if (!detailRes.ok) throw new Error(`Article indisponible (HTTP ${detailRes.status})`);
        const detail = (await detailRes.json()) as ApiArticle | { data?: ApiArticle; article?: ApiArticle };
        // L'API peut renvoyer l'article tel quel ou wrappé.
        let article: ApiArticle | undefined;
        if (detail && typeof detail === 'object') {
          if ('content_html' in detail || 'title' in detail) {
            article = detail as ApiArticle;
          } else {
            const w = detail as { data?: ApiArticle; article?: ApiArticle };
            article = w.data ?? w.article;
          }
        }
        if (!article) {
          if (!cancelled) setState({ phase: 'not-found' });
          return;
        }
        // Fusionne les champs de la liste (meta, created_at) avec ceux du detail.
        if (!cancelled) {
          setState({
            phase: 'ready',
            article: { ...match, ...article },
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState({ phase: 'error', message: err instanceof Error ? err.message : 'Erreur inconnue' });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state.phase === 'loading') {
    return (
      <div style={{ background: '#fbfbf3', minHeight: '60vh' }}>
        <div className="max-w-3xl mx-auto" style={{ padding: 'clamp(120px, 14vw, 180px) clamp(24px, 5vw, 60px)' }}>
          <div
            aria-hidden="true"
            style={{
              height: '32px',
              background: '#efece5',
              borderRadius: 4,
              marginBottom: 16,
              width: '40%',
              animation: 'osmoz-pulse 1.6s ease-in-out infinite',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              height: '56px',
              background: '#efece5',
              borderRadius: 4,
              marginBottom: 32,
              width: '85%',
              animation: 'osmoz-pulse 1.6s ease-in-out infinite',
            }}
          />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{
                height: '14px',
                background: '#efece5',
                borderRadius: 4,
                marginBottom: 12,
                width: i === 3 ? '60%' : '100%',
                animation: 'osmoz-pulse 1.6s ease-in-out infinite',
              }}
            />
          ))}
          <style>{`@keyframes osmoz-pulse {0%,100%{opacity:.6}50%{opacity:.95}}`}</style>
        </div>
      </div>
    );
  }

  if (state.phase === 'not-found' || state.phase === 'error') {
    return (
      <div style={{ background: '#fbfbf3', minHeight: '60vh' }}>
        <Helmet>
          <title>Article introuvable — OSMOZ</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div
          className="max-w-2xl mx-auto text-center"
          style={{ padding: 'clamp(120px, 14vw, 180px) clamp(24px, 5vw, 60px)' }}
        >
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#862637',
              fontWeight: 500,
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}
          >
            {state.phase === 'error' ? 'Erreur de chargement' : 'Article introuvable'}
          </p>
          <h1
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.2,
              color: '#01142a',
              marginBottom: '32px',
            }}
          >
            {state.phase === 'error' ? state.message : "Cet article n'existe pas ou n'est plus disponible."}
          </h1>
          <Link
            to="/articles"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#862637',
              textDecoration: 'none',
              fontWeight: 400,
            }}
          >
            ← Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  const { article } = state;
  const canonical = `https://osmoz-space.com/articles/${article.slug ?? ''}`;
  const metaTitle = article.title ? `${article.title} — OSMOZ` : 'Article OSMOZ';
  const metaDescription = article.meta_description ?? article.excerpt ?? '';

  return (
    <div style={{ background: '#fbfbf3' }}>
      <Helmet>
        <title>{metaTitle}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={metaTitle} />
        {metaDescription && <meta property="og:description" content={metaDescription} />}
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="OSMOZ" />
      </Helmet>

      <article
        className="mx-auto"
        style={{
          maxWidth: '720px',
          padding: 'clamp(96px, 12vw, 160px) clamp(24px, 5vw, 60px) clamp(64px, 8vw, 120px)',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: '#1c1c1a',
        }}
      >
        <Link
          to="/articles"
          style={{
            display: 'inline-block',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#862637',
            textDecoration: 'none',
            fontWeight: 400,
            marginBottom: '40px',
          }}
        >
          ← Tous les articles
        </Link>

        {article.created_at && (
          <p
            style={{
              fontSize: '9px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#862637',
              fontWeight: 500,
              marginBottom: '16px',
            }}
          >
            {formatFrDate(article.created_at)}
          </p>
        )}

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 300,
            lineHeight: 1.15,
            fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
            color: '#01142a',
            marginBottom: '40px',
          }}
        >
          {article.title}
        </h1>

        {article.meta_description && (
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: '#6b6860',
              fontWeight: 300,
              marginBottom: '48px',
              borderLeft: '2px solid #862637',
              paddingLeft: '20px',
              fontStyle: 'italic',
            }}
          >
            {article.meta_description}
          </p>
        )}

        {article.content_html ? (
          <div
            className="osmoz-article-body"
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#1c1c1a',
              fontWeight: 400,
            }}
            dangerouslySetInnerHTML={{ __html: article.content_html }}
          />
        ) : (
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: '#6b6860',
              fontWeight: 300,
            }}
          >
            Contenu indisponible.
          </p>
        )}

        <div style={{ marginTop: '64px', borderTop: '1px solid rgba(28,28,26,0.08)', paddingTop: '32px' }}>
          <Link
            to="/articles"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#862637',
              textDecoration: 'none',
              fontWeight: 400,
            }}
          >
            ← Retour aux articles
          </Link>
        </div>

        {/* Quelques règles inline pour le HTML rendu (titres, paragraphes, liens, listes).
            Ciblé sur .osmoz-article-body pour ne rien polluer d'autre. */}
        <style>
          {`
            .osmoz-article-body h2 {
              font-family: 'Playfair Display', serif;
              font-weight: 300;
              font-size: clamp(1.5rem, 2.5vw, 2rem);
              line-height: 1.25;
              color: #01142a;
              margin-top: 56px;
              margin-bottom: 20px;
            }
            .osmoz-article-body h3 {
              font-family: 'Playfair Display', serif;
              font-weight: 400;
              font-size: clamp(1.2rem, 2vw, 1.4rem);
              line-height: 1.3;
              color: #01142a;
              margin-top: 40px;
              margin-bottom: 16px;
            }
            .osmoz-article-body p {
              margin: 0 0 20px 0;
            }
            .osmoz-article-body a {
              color: #862637;
              text-decoration: underline;
              text-underline-offset: 3px;
            }
            .osmoz-article-body a:hover { color: #01142a; }
            .osmoz-article-body ul, .osmoz-article-body ol {
              padding-left: 1.4em;
              margin: 0 0 24px 0;
            }
            .osmoz-article-body li { margin-bottom: 10px; }
            .osmoz-article-body blockquote {
              border-left: 3px solid #862637;
              padding: 4px 0 4px 20px;
              margin: 32px 0;
              color: #6b6860;
              font-style: italic;
            }
            .osmoz-article-body img { max-width: 100%; height: auto; margin: 32px 0; }
            .osmoz-article-body code {
              background: #efece5;
              padding: 2px 6px;
              border-radius: 3px;
              font-size: 0.9em;
            }
            .osmoz-article-body strong { font-weight: 600; color: #01142a; }
          `}
        </style>
      </article>
    </div>
  );
}
