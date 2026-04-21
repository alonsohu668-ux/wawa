'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {Menu, X, ShoppingBag, Globe, ChevronDown} from 'lucide-react';
import {useCartStore} from '@/lib/store/cart';

const navLinks: Record<string, {href: string; label: string}[]> = {
  en: [
    {href: '/en/shop', label: 'Shop'},
    {href: '/en/brands', label: 'Brands'},
    {href: '/en/blog', label: 'Blog'},
    {href: '/en/about', label: 'About'},
    {href: '/en/faq', label: 'FAQ'},
  ],
  es: [
    {href: '/es/shop', label: 'Tienda'},
    {href: '/es/brands', label: 'Marcas'},
    {href: '/es/blog', label: 'Blog'},
    {href: '/es/about', label: 'Nosotros'},
    {href: '/es/faq', label: 'FAQ'},
  ],
  pt: [
    {href: '/pt/shop', label: 'Loja'},
    {href: '/pt/brands', label: 'Marcas'},
    {href: '/pt/blog', label: 'Blog'},
    {href: '/pt/about', label: 'Sobre'},
    {href: '/pt/faq', label: 'FAQ'},
  ],
  fr: [
    {href: '/fr/shop', label: 'Boutique'},
    {href: '/fr/brands', label: 'Marques'},
    {href: '/fr/blog', label: 'Blog'},
    {href: '/fr/about', label: 'À propos'},
    {href: '/fr/faq', label: 'FAQ'},
  ],
  de: [
    {href: '/de/shop', label: 'Shop'},
    {href: '/de/brands', label: 'Marken'},
    {href: '/de/blog', label: 'Blog'},
    {href: '/de/about', label: 'Über uns'},
    {href: '/de/faq', label: 'FAQ'},
  ],
};

const langLabels: Record<string, string> = {
  en: 'English', es: 'Español', pt: 'Português', fr: 'Français', de: 'Deutsch'
};

export default function Header({lang}: {lang: string}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const links = navLinks[lang] || navLinks.en;
  const cart = useCartStore(s => s.items);
  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
      <div className="bg-amber-600 text-zinc-950 text-xs font-semibold text-center py-1.5 tracking-wide">
        🔒 Envío discreto · Diskrete Lieferung · Livraison discrète · Discreet Shipping
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${lang}`} className="text-xl font-bold tracking-wider">
            <span className="text-amber-500">Euro</span>
            <span className="text-zinc-100">Dolls</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <Link key={link.href} href={link.href}
                className="text-sm text-zinc-400 hover:text-amber-500 transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-zinc-400 hover:text-amber-500 transition-colors">
                <Globe size={16}/> {langLabels[lang] || lang} <ChevronDown size={14}/>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl py-1 z-50">
                  {Object.entries(langLabels).map(([code, label]) => (
                    <Link key={code} href={`/${code}`}
                      className={`block px-4 py-2 text-sm hover:bg-zinc-800 hover:text-amber-500 ${lang === code ? 'text-amber-500' : 'text-zinc-400'}`}
                      onClick={() => setLangOpen(false)}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href={`/${lang}/cart`} className="relative text-zinc-400 hover:text-amber-500 transition-colors">
              <ShoppingBag size={20}/>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-zinc-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden text-zinc-400" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4 space-y-3">
          {links.map(link => (
            <Link key={link.href} href={link.href}
              className="block text-sm text-zinc-400 hover:text-amber-500 py-2"
              onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
