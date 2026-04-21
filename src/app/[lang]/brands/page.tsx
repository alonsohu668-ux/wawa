import {use} from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import productsData from '@/data/products.json';
import {translations} from '@/lib/i18n';
import type {Locale} from '@/lib/i18n';

interface Props {
  params: Promise<{lang: string}>;
}

export default function BrandsPage({params}: Props) {
  const {lang} = use(params);
  const t = translations[lang as keyof typeof translations]?.brands || translations.en.brands;

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header lang={lang}/>
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-zinc-100 mb-4">{t.title}</h1>
            <p className="text-zinc-500 max-w-xl mx-auto">
              We partner exclusively with certified manufacturers who meet our strict quality standards.
            </p>
          </div>

          <div className="space-y-8">
            {productsData.brands.map((brand) => (
              <div key={brand.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-amber-600 transition-all">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-64 flex-shrink-0">
                    <div className="aspect-video bg-zinc-800 rounded-xl flex items-center justify-center text-4xl font-bold text-zinc-700">
                      {brand.name[0]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-zinc-100 mb-1">{brand.name}</h2>
                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                          <span>📍 {brand.origin}</span>
                          <span>📅 {t.since} {brand.since}</span>
                        </div>
                      </div>
                      <a href={brand.website} target="_blank" rel="noopener noreferrer"
                        className="text-amber-500 hover:text-amber-400 text-sm font-medium">
                        {brand.website} ↗
                      </a>
                    </div>
                    <p className="text-zinc-400 leading-relaxed mb-4">
                      {brand.description[lang as keyof typeof translations] || brand.description.en}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {brand.tags.map(tag => (
                        <span key={tag}
                          className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
