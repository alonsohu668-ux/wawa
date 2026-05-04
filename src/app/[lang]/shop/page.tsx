'use client';
import {useState} from 'react';
import Link from 'next/link';
import {use} from 'react';
import Header from '@/components/layout/Header';
import productsData from '@/data/products.json';
import {translations} from '@/lib/i18n';
import {useCartStore} from '@/lib/store/cart';

interface Props {
  params: Promise<{lang: string}>;
}

export default function ShopPage({params}: Props) {
  const {lang} = use(params);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('featured');

  const t = translations[lang as keyof typeof translations]?.shop || translations.en.shop;

  const filtered = (() => {
    let p = [...productsData.products];
    if (filter === 'anime') p = p.filter(x => x.style === 'anime');
    else if (filter === 'realistic') p = p.filter(x => x.style === 'realistic');
    else if (filter === 'torso') p = p.filter(x => x.tags.includes('torso'));
    if (sort === 'price-low') p.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') p.sort((a, b) => b.price - a.price);
    return p;
  })();

  const addItem = useCartStore(s => s.addItem);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header lang={lang}/>
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-100">{t.title || 'Our Collection'}</h1>
              <p className="text-zinc-500 text-sm mt-1">{filtered.length} products</p>
            </div>
            <div className="flex items-center gap-3">
              <select value={filter} onChange={e => setFilter(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm px-3 py-2 rounded-lg focus:border-amber-600 focus:outline-none">
                <option value="all">{t.all || 'All'}</option>
                <option value="realistic">{t.realistic || 'Realistic'}</option>
                <option value="anime">{t.anime || 'Anime'}</option>
                <option value="torso">{t.torso || 'Torso'}</option>
              </select>
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm px-3 py-2 rounded-lg focus:border-amber-600 focus:outline-none">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => (
              <div key={product.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-600 transition-all hover:-translate-y-0.5 group">
                <Link href={`/${lang}/product/${product.id}`}>
                  <div className="aspect-square bg-zinc-800 relative">
                    <img src={product.images?.[0] || '/images/products/placeholder.jpg'} alt={product.name[lang as keyof typeof product.name] as string || product.name.en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.badge && (
                      <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded ${
                        product.badge === 'NEW' ? 'bg-emerald-600 text-white' :
                        product.badge === 'HOT' ? 'bg-rose-600 text-white' :
                        'bg-amber-600 text-white'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-amber-600 text-zinc-950 font-bold text-sm px-4 py-2 rounded-lg">
                        {t.viewDetails || 'View Details'}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-3">
                  <p className="text-zinc-500 text-xs">{product.brand} · {product.height}cm · {product.material}</p>
                  <p className="text-zinc-200 text-sm font-medium mt-1 leading-snug truncate">
                    {product.name[lang as keyof typeof product.name] as string || product.name.en}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-amber-500 font-bold">€{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-zinc-600 line-through text-xs">€{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <button onClick={() => addItem({
                    id: product.id,
                    name: product.name[lang as keyof typeof product.name] as string || product.name.en,
                    price: product.price,
                    image: product.images?.[0] || '/images/products/placeholder.jpg',
                    quantity: 1,
                    options: { material: product.material, height: `${product.height}cm` }
                  })}
                    className="w-full mt-3 bg-zinc-800 hover:bg-amber-600 hover:text-zinc-950 text-zinc-300 text-xs font-semibold py-2 rounded-lg transition-colors">
                    {t.addToCart || 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
