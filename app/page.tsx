import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Cog, GraduationCap, Pill, House, Utensils } from 'lucide-react';

const industries = [
  {
    name: 'Pharmacy',
    slug: 'pharmacy',
    description: 'Healthcare innovations and pharmaceutical business opportunities',
    icon: Pill,
    gradient: 'from-green-400 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    stats: 'Healthcare & Wellness',
  },
  {
    name: 'Small Business',
    slug: 'smallbusiness',
    description: 'Growth strategies and enhancement opportunities for small businesses',
    icon: TrendingUp,
    gradient: 'from-blue-400 to-indigo-500',
    bgGradient: 'from-blue-50 to-indigo-50',
    stats: 'Business Growth',
  },
  {
    name: 'Teachers',
    slug: 'teachers',
    description: 'Educational technology and teaching enhancement solutions',
    icon: GraduationCap,
    gradient: 'from-purple-400 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    stats: 'Education & Training',
  },
  {
    name: 'Automation',
    slug: 'automation',
    description: 'Process automation and efficiency improvement opportunities',
    icon: Cog,
    gradient: 'from-orange-400 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    stats: 'Process Innovation',
  },
  {
    name: 'Realtors',
    slug: 'realtors',
    description: 'Property sales, client management, and real estate business growth strategies',
    icon: House,
    gradient: 'from-indigo-400 to-teal-500',
    bgGradient: 'from-indigo-50 to-teal-50',
    stats: 'Real Estate & Sales',
  },
  {
    name: 'Restaurants',
    slug: 'restaurants',
    description: 'Culinary trends, restaurant management, and growth opportunities in the food industry',
    icon: Utensils,
    gradient: 'from-yellow-400 to-lime-500',
    bgGradient: 'from-yellow-50 to-lime-50',
    stats: 'Food & Hospitality',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-24">
        <div className="absolute inset-0 bg-grid-slate-100/[0.03] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Discover Hidden
              <span className="block">Business Opportunities</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform social insights into actionable business enhancements. Our AI-powered analysis 
              identifies high-potential opportunities across key industries for product development professionals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-slate-700 font-medium">Product Development Focus</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-slate-700 font-medium">AI-Analyzed Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">
              Why Choose BizOps Intelligence?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">High-Potential Opportunities</h3>
                <p className="text-slate-600">Discover business ideas ranked by uniqueness scores and community engagement.</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Targeted Audience Insights</h3>
                <p className="text-slate-600">Understand your potential customers and market segments with detailed audience analysis.</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Cog className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Actionable Enhancements</h3>
                <p className="text-slate-600">Get specific, implementable business enhancement strategies and product development ideas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Explore Industry Insights
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select an industry to discover curated business enhancement opportunities 
              and innovative product ideas identified from community discussions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => {
              const IconComponent = industry.icon;
              return (
                <Link
                  key={industry.slug}
                  href={`/industry/${industry.slug}`}
                  className="group block"
                >
                  <div className={`relative overflow-hidden bg-gradient-to-br ${industry.bgGradient} rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${industry.gradient} shadow-lg`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                        {industry.name}
                      </h3>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {industry.description}
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        <div className="bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-sm font-medium text-slate-700">
                            {industry.stats}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}