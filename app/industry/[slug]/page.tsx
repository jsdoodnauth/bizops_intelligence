import Link from 'next/link';
import { ArrowLeft, TrendingUp, Users, Star, ExternalLink } from 'lucide-react';
import { getPostsByIndustry } from '@/lib/database';
import { PostCard } from '@/components/PostCard';

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

const industryInfo = {
  pharmacy: {
    name: 'Pharmacy',
    description: 'Healthcare innovations and pharmaceutical business opportunities',
    gradient: 'from-green-400 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
  },
  smallbusiness: {
    name: 'Small Business',
    description: 'Growth strategies and enhancement opportunities for small businesses',
    gradient: 'from-blue-400 to-indigo-500',
    bgGradient: 'from-blue-50 to-indigo-50',
  },
  teachers: {
    name: 'Teachers',
    description: 'Educational technology and teaching enhancement solutions',
    gradient: 'from-purple-400 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  automation: {
    name: 'Automation',
    description: 'Process automation and efficiency improvement opportunities',
    gradient: 'from-orange-400 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
  },
  realtors: {
    name: 'Realtors',
    description: 'Property sales, client management, and real estate business growth strategies',
    gradient: 'from-indigo-400 to-teal-500',
    bgGradient: 'from-indigo-50 to-teal-50',
  },
  restaurants: {
    name: 'Restaurants',
    description: 'Culinary trends, restaurant management, and growth opportunities',
    gradient: 'from-red-400 to-green-500',
    bgGradient: 'from-red-50 to-green-50',
  },
};

export default async function IndustryPage({ params }: IndustryPageProps) {
  const posts = await getPostsByIndustry(params.slug);
  const industry = industryInfo[params.slug as keyof typeof industryInfo];

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Industry Not Found</h1>
          <p className="text-slate-600 mb-4">The industry you're looking for doesn't exist.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${industry.bgGradient} py-16`}>
        <div className="absolute inset-0 bg-grid-slate-100/[0.03] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Industries</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {industry.name} Opportunities
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl">
                {industry.description}
              </p>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
                <span className="text-sm font-medium text-slate-700">
                  {posts.length} Opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-slate-400" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">No opportunities found</h2>
              <p className="text-slate-600">
                We're currently analyzing posts for this industry. Check back soon for insights!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  industry={params.slug} 
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}