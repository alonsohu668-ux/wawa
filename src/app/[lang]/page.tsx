import Link from 'next/link';
import Header from '@/components/layout/Header';
import NewsletterForm from '@/components/NewsletterForm';
import productsData from '@/data/products.json';
import {translations} from '@/lib/i18n';

interface Props {
  params: Promise<{lang: string}>;
}

export default async function HomePage({params}: Props) {
  const {lang} = await params;
  const t = translations[lang as keyof typeof translations]?.shop || translations.en.shop;
  const tTrust = translations[lang as keyof typeof translations]?.trust || translations.en.trust;
  const tSubscribe = translations[lang as keyof typeof translations]?.subscribe || translations.en.subscribe;
  const tFooter = translations[lang as keyof typeof translations]?.footer || translations.en.footer;
  const brandsData = productsData.brands;
  const featuredProducts = productsData.products.slice(0, 4);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header lang={lang}/>

      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-zinc-950 to-zinc-950"/>
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"/>
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-2xl">
            <span className="inline-block text-amber-500 text-sm font-semibold tracking-widest uppercase mb-4">
              Premium Quality · EU Warehouse
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-zinc-100">
              Premium Silicone & TPE Love Dolls
            </h1>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Authentic European-style and anime dolls. Discreet shipping across Europe.
              Free shipping on orders over €500.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${lang}/shop`}
                className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-semibold px-8 py-3.5 rounded-lg transition-colors">
                Shop Now
              </Link>
              <Link href={`/${lang}/brands`}
                className="border border-zinc-700 hover:border-amber-500 text-zinc-300 hover:text-amber-500 font-semibold px-8 py-3.5 rounded-lg transition-colors">
                Our Brands
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {Object.entries(tTrust).map(([key, val]: [string, any]) => (
              <div key={key} className="text-center">
                <div className="text-amber-500 text-xl mb-1">✓</div>
                <div className="text-xs font-semibold text-zinc-200">{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-100 mb-8">{t.title || 'Our Collection'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {key: 'all', label: t.all || 'All', icon: '◆'},
              {key: 'silicone', label: t.silicone || 'Silicone', icon: '●'},
              {key: 'anime', label: t.anime || 'Anime', icon: '★'},
              {key: 'torso', label: t.torso || 'Torso', icon: '▲'},
            ].map(cat => (
              <Link key={cat.key} href={`/${lang}/shop?filter=${cat.key}`}
                className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-600 transition-all hover:-translate-y-0.5">
                <div className="text-3xl mb-3 text-amber-500">{cat.icon}</div>
                <div className="font-semibold text-zinc-200 group-hover:text-amber-500">{cat.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-100">{t.featured || 'Featured Products'}</h2>
            <Link href={`/${lang}/shop`} className="text-amber-500 hover:text-amber-400 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => {
              const name = (product.name[lang as keyof typeof product.name] as string) || product.name.en;
              return (
                <Link key={product.id} href={`/${lang}/product/${product.id}`}
                  className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-600 transition-all">
                  <div className="aspect-square bg-zinc-800 relative">
                    <img src={product.images?.[0] || '/images/products/placeholder.jpg'} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.badge && (
                      <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded text-white ${
                        product.badge === 'NEW' ? 'bg-emerald-600' :
                        product.badge === 'HOT' ? 'bg-rose-600' :
                        'bg-amber-600'}`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-zinc-500 text-xs">{product.brand} · {product.height}cm</p>
                    <p className="text-zinc-200 text-sm font-medium mt-1 truncate">{name}</p>
                    <p className="text-amber-500 font-bold mt-2">€{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-100 mb-8">Our Brands</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {brandsData.map((brand: any) => (
              <div key={brand.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-600 transition-all">
                <div className="text-amber-500 font-bold text-lg mb-2">{brand.name}</div>
                <p className="text-zinc-400 text-sm mb-3">
                  {(brand.description as any)?.[lang] || (brand.description as any)?.en || ''}
                </p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>📍 {brand.origin}</span>
                  <span>📅 Since {brand.since}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-amber-900/10 border-y border-amber-900/30">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">{tSubscribe.title}</h2>
          <p className="text-zinc-400 text-sm mb-6">{tSubscribe.subtitle}</p>
          <NewsletterForm placeholder={tSubscribe.email} button={tSubscribe.button} />
        </div>
      </section>

      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xl font-bold">
              <span className="text-amber-500">Euro</span>
              <span className="text-zinc-100">Dolls</span>
            </div>
            <p className="text-zinc-500 text-xs">{tFooter.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
