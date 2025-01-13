import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Post = Database['public']['Tables']['posts']['Row'] & {
  profiles: {
    name: string;
    avatar_url: string | null;
  };
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<Post | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            name,
            avatar_url
          )
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error || !data) {
        console.error('Error fetching post:', error);
        navigate('/blog');
        return;
      }

      setPost(data as Post);
      setLoading(false);
    }

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="aspect-[16/9] bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-light">Retour au blog</span>
        </button>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
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
            <h1 className="text-4xl font-light mb-6">{post.title}</h1>
            <p className="text-xl font-light text-gray-600 italic" style={{ fontFamily: 'Playfair Display' }}>
              {post.excerpt}
            </p>
          </header>

          <div className="aspect-[16/9] rounded-lg overflow-hidden mb-8">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div 
            className="prose prose-lg max-w-none font-light prose-headings:font-light"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              {post.profiles.avatar_url && (
                <img
                  src={post.profiles.avatar_url}
                  alt={post.profiles.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{post.profiles.name}</p>
                <p className="text-sm text-gray-500">Auteur</p>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}