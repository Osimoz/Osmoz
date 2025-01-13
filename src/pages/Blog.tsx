import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Post = Database['public']['Tables']['posts']['Row'];

export default function Blog() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(50);

        if (error) throw error;

        if (isMounted) {
          setPosts(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        if (isMounted) {
          setError('Impossible de charger les articles. Veuillez réessayer plus tard.');
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-black text-white px-6 py-3 rounded-lg text-sm tracking-widest font-light hover:bg-white hover:text-black border border-black transition-all duration-300"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-light mb-6">Notre <em className="not-italic" style={{ fontStyle: 'italic' }}>Blog</em></h1>
          <p className="text-xl font-light text-gray-600" style={{ fontFamily: 'Playfair Display' }}>
            Actualités, conseils et tendances sur les espaces de travail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="font-light">
                      {new Date(post.published_at || post.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                    <span>•</span>
                    <span className="font-light">{post.category}</span>
                  </div>
                  <h2 className="text-xl font-light group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 text-black group-hover:text-gray-600 transition-colors">
                    <span className="text-sm font-light">Lire la suite</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}