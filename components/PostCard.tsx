import Link from 'next/link';
import { TrendingUp, Users, Star, ExternalLink } from 'lucide-react';
import { PostData } from '@/lib/database';

interface PostCardProps {
  post: PostData;
  industry: string;
}

export function PostCard({ post, industry }: PostCardProps) {
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

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-500">{post.upvotes} upvotes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-slate-500">Score: {post.uniqueness_score}</span>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPotentialColor(post.business_potential)}`}>
            {post.business_potential} potential
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/industry/${industry}/post/${post.id}`}
          className="block group mb-3"
        >
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.business_title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {post.summary}
        </p>

        {/* Audience */}
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-600 line-clamp-1">{post.audience}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Link
            href={`/industry/${industry}/post/${post.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            View Details →
          </Link>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="text-sm">Source</span>
          </a>
        </div>
      </div>
    </div>
  );
}