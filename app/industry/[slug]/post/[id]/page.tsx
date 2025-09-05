import Link from 'next/link';
import { ArrowLeft, TrendingUp, Users, Star, ExternalLink, Lightbulb, Target, Zap } from 'lucide-react';
import { getPostById } from '@/lib/database';
import { notFound } from 'next/navigation';

interface PostDetailPageProps {
  params: {
    slug: string;
    id: string;
  };
}

const industryInfo = {
  pharmacy: {
    name: 'Pharmacy',
    gradient: 'from-green-400 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
  },
  smallbusiness: {
    name: 'Small Business',
    gradient: 'from-blue-400 to-indigo-500',
    bgGradient: 'from-blue-50 to-indigo-50',
  },
  teachers: {
    name: 'Teachers',
    gradient: 'from-purple-400 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  automation: {
    name: 'Automation',
    gradient: 'from-orange-400 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
  },
  realtors: {
    name: 'Realtors',
    gradient: 'from-indigo-400 to-teal-500',
    bgGradient: 'from-indigo-50 to-teal-50',
  },
  restaurants: {
    name: 'Restaurants',
    gradient: 'from-red-400 to-green-500',
    bgGradient: 'from-red-50 to-green-50',
  },
  diy: {
    name: 'DIY',
    gradient: 'from-teal-400 to-orange-500',
    bgGradient: 'from-teal-50 to-orange-50',
  },
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const post = await getPostById(params.slug, parseInt(params.id));
  const industry = industryInfo[params.slug as keyof typeof industryInfo];

  if (!post || !industry) {
    notFound();
  }

  const getPotentialColor = (potential: string) => {
    switch (potential.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatEnhancements = (text: string) => {
    return text.split(/\d+\./).filter(item => item.trim()).map(item => item.trim());
  };

  const formatInsights = (text: string) => {
    return text.split('\n').filter(item => item.trim()).map(item => item.replace(/^-\s*/, '').trim());
  };

  const formatBusinessIdeas = (text: string) => {
    return text.split('\n').filter(item => item.trim()).map(item => item.replace(/^-\s*/, '').trim());
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${industry.bgGradient} py-12`}>
        <div className="absolute inset-0 bg-grid-slate-100/[0.03] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href={`/industry/${params.slug}`} 
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to {industry.name}</span>
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 pr-8">
                {post.business_title}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">{post.upvotes} upvotes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-slate-600">Uniqueness: {post.uniqueness_score}/10</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPotentialColor(post.business_potential)}`}>
                  {post.business_potential} potential
                </div>
              </div>
            </div>
            
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-200 hover:bg-white transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm font-medium">View Original</span>
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Summary */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Summary</h2>
                <p className="text-slate-700 leading-relaxed">{post.summary}</p>
              </div>

              {/* Assessment */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Market Assessment</h2>
                <p className="text-slate-700 leading-relaxed">{post.assessment}</p>
              </div>

              {/* Business Enhancements */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Business Enhancements</h2>
                </div>
                <div className="space-y-4">
                  {formatEnhancements(post.business_enhancement).map((enhancement, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-slate-700 leading-relaxed">{enhancement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Ideas */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Product Ideas</h2>
                </div>
                <div className="space-y-4">
                  {formatInsights(post.business_ideas).map((idea, index) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <p className="text-slate-700 leading-relaxed">{idea}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Original Content */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Original Discussion</h2>
                <h3 className="text-base font-bold text-slate-700 mb-2">{post.title}</h3>
                <p className="text-slate-700 leading-relaxed">{post.content}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Key Insights */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-5 w-5 text-slate-400" />
                  <h3 className="text-lg font-bold text-slate-900">Key Insights</h3>
                </div>
                <div className="space-y-2">
                  {formatInsights(post.key_insights).map((insight, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="bg-slate-100 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                      <p className="text-slate-600 text-sm leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Target Audience */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="h-5 w-5 text-slate-400" />
                  <h3 className="text-lg font-bold text-slate-900">Target Audience</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{post.audience}</p>
              </div>

              {/* Key Metrics */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Business Potential</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPotentialColor(post.business_potential)}`}>
                      {post.business_potential}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Uniqueness Score</span>
                    <span className="text-sm font-bold text-slate-900">{post.uniqueness_score}/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Community Engagement</span>
                    <span className="text-sm font-bold text-slate-900">{post.upvotes} upvotes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}