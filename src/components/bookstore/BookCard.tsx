import React from 'react';
import { BookOpen } from 'lucide-react';

interface BookCardProps {
  title: string;
  author: string;
  image: string;
  description: string;
}

export const BookCard: React.FC<BookCardProps> = ({ title, author, image, description }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-subtle border border-slate-200/80 hover:shadow-card transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="aspect-[3/4] bg-slate-50 rounded-xl mb-4 p-2 flex items-center justify-center overflow-hidden border border-slate-100">
          <img
            src={image}
            alt={title}
            className="h-full w-auto object-contain rounded shadow-sm group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <span className="text-[11px] font-bold text-navy-700 uppercase tracking-wider block mb-1">
          {author}
        </span>
        <h4 className="text-base font-bold text-navy-950 mb-2 leading-snug line-clamp-2">
          {title}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span className="inline-flex items-center gap-1 text-navy-900 font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-navy-700" />
          Conference Curated
        </span>
      </div>
    </div>
  );
};
