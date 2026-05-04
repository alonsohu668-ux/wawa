'use client';
import {useState, useMemo} from 'react';
import Link from 'next/link';
import {use} from 'react';
import Header from '@/components/layout/Header';
import productsData from '@/data/products.json';
import {translations} from '@/lib/i18n';
import type {Locale} from '@/lib/i18n';
import {useCartStore} from '@/lib/store/cart';
import {ChevronLeft, Check, Truck, Shield, RotateCcw, MessageCircle} from 'lucide-react';

interface Props {
  params: Promise<{lang: string; id: string}>;
}

export default function ProductPage({params}: Props) {
  const {lang, id} = use(params);
  const t = translations[lang as keyof typeof translations]?.shop || translations.en.shop;
  const product = productsData.products.find(p => p.id === id);
  const addItem = useCartStore(s => s.addItem);
  const [qty, setQty] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const related = useMemo(() =>
    productsData.products.filter(p => p.id !== id).slice(0, 4),
    [id]
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-100 mb-4">Product Not Found</h1>
          <Link href={`/${lang}/shop`} className="text-amber-500 hover:text-amber-400">← Back to Shop</Link>
        </div>
      </div>
    );
  }

  const specs = [
    {label: t.height, value: `${product.height} cm`},
    {label: t.weight, value: `${product.weight} kg`},
    {label: t.material, value: product.material},
    {label: t.cupSize, value: product.cupSize},
    {label: t.skinTone, value: product.skinTone},
    {label: 'Style', value: product.style === 'anime' ? 'Anime' : 'Realistic'},
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header lang={lang}/>
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-amber-500">{lang.toUpperCase()}</Link>
            <span>/</span>
            <Link href={`/${lang}/shop`} className="hover:text-amber-500">Shop</Link>
            <span>/</span>
            <span className="text-zinc-300">{product.name[lang as keyof typeof translations] || product.name.en}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <img 
                  src={product.images?.[selectedImageIndex] || '/images/products/placeholder.jpg'} 
                  alt={product.name[lang as keyof typeof translations] || product.name.en} 
                  className="w-full h-full object-cover" 
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {product.images.slice(0, 10).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`aspect-square bg-zinc-900 border rounded-lg overflow-hidden transition-all ${
                        selectedImageIndex === i ? 'border-amber-500 ring-2 ring-amber-500/50' : 'border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name[lang as keyof typeof translations] || product.name.en} ${i + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              {product.badge && (
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded mb-3 ${
                  product.badge === 'NEW' ? 'bg-emerald-600 text-white' :
                  product.badge === 'HOT' ? 'bg-rose-600 text-white' :
                  'bg-amber-600 text-white'
                }`}>
                  {product.badge}
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-2">
                {product.name[lang as keyof typeof translations] || product.name.en}
              </h1>
              <p className="text-zinc-500 text-sm mb-4">{product.brand} · SKU: {product.id.toUpperCase()}</p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-amber-500">€{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-zinc-600 line-through">€{product.originalPrice.toLocaleString()}</span>
                    <span className="text-sm text-emerald-500 font-semibold">
                      Save €{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <p className="text-zinc-400 leading-relaxed mb-6">
                {product.description[lang as keyof typeof translations] || product.description.en}
              </p>

              {/* Specs */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  {specs.map(spec => (
                    <div key={spec.label} className="flex justify-between">
                      <span className="text-zinc-500 text-sm">{spec.label}</span>
                      <span className="text-zinc-200 text-sm font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <Check size={16} className="text-emerald-500"/>
                <span className="text-emerald-500 text-sm font-medium">{t.inStock}</span>
                <span className="text-zinc-600 text-sm">· Ships from EU warehouse in 3-7 days</span>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-zinc-700 rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-3 text-zinc-400 hover:text-zinc-200 text-lg">−</button>
                  <span className="px-4 text-zinc-200 font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)}
                    className="px-4 py-3 text-zinc-400 hover:text-zinc-200 text-lg">+</button>
                </div>
                <button onClick={() => addItem({
                  id: product.id,
                  name: product.name[lang as keyof typeof translations] || product.name.en,
                  price: product.price,
                  image: product.images?.[0] || '/images/products/placeholder.jpg',
                  quantity: qty,
                  options: { material: product.material, height: `${product.height}cm` }
                })}
                  className="flex-1 bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold py-3.5 rounded-lg transition-colors">
                  {t.addToCart}
                </button>
              </div>

              {/* Trust Icons */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  {icon: Truck, text: 'Free EU shipping on orders over €500'},
                  {icon: Shield, text: '30-day satisfaction guarantee'},
                  {icon: RotateCcw, text: 'Full refund, no questions asked'},
                  {icon: MessageCircle, text: '24/7 WhatsApp support available'},
                ].map(({icon: Icon, text}) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-zinc-400">
                    <Icon size={16} className="text-amber-500"/>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">{t.relatedProducts}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => (
                <Link key={p.id} href={`/${lang}/product/${p.id}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-600 transition-all">
                  <div className="aspect-square bg-zinc-800 relative">
                    <img src={p.images?.[0] || '/images/products/placeholder.jpg'} alt={p.name[lang as keyof typeof translations] || p.name.en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-zinc-200 text-sm">{p.name[lang as keyof typeof translations] || p.name.en}</p>
                    <p className="text-amber-500 font-bold mt-1">€{p.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
