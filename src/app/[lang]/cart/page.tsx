'use client';
import {useState} from 'react';
import Link from 'next/link';
import {use} from 'react';
import Header from '@/components/layout/Header';
import {useCartStore} from '@/lib/store/cart';
import {translations} from '@/lib/i18n';
import {Trash2, Minus, Plus, ShoppingBag, ArrowLeft} from 'lucide-react';

interface Props {
  params: Promise<{lang: string}>;
}

export default function CartPage({params}: Props) {
  const {lang} = use(params);
  const t = translations[lang as keyof typeof translations]?.shop || translations.en.shop;
  const items = useCartStore(s => s.items);
  const removeItem = useCartStore(s => s.removeItem);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const total = useCartStore(s => s.total);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const subtotal = total();
  const shipping = subtotal >= 500 ? 0 : 49;
  const grandTotal = subtotal + shipping;

  async function handleCheckout() {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, lang: lang }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert('Checkout not configured. Add Stripe keys to .env.local');
    } catch {
      alert('Checkout error. Please try again.');
    }
    setCheckoutLoading(false);
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Header lang={lang}/>
        <div className="pt-32 pb-16 px-4 text-center">
          <ShoppingBag size={64} className="text-zinc-700 mx-auto mb-4"/>
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">{t.emptyCart || 'Your cart is empty'}</h1>
          <Link href={`/${lang}/shop`} className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mt-4">
            <ArrowLeft size={16}/> {t.continueShopping || 'Continue Shopping'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header lang={lang}/>
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-zinc-100 mb-8">Shopping Cart</h1>

          <div className="space-y-4 mb-8">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="w-24 h-24 bg-zinc-800 rounded-lg flex items-center justify-center text-3xl font-bold text-zinc-700 flex-shrink-0">
                  {item.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-zinc-200 font-medium truncate">{item.name}</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    {item.options.material} · {item.options.height}
                  </p>
                  <p className="text-amber-500 font-bold mt-1">€{item.price.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.id)}
                    className="text-zinc-600 hover:text-red-500 transition-colors p-1">
                    <Trash2 size={16}/>
                  </button>
                  <div className="flex items-center border border-zinc-700 rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-200"><Minus size={12}/></button>
                    <span className="px-2 text-zinc-200 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-200"><Plus size={12}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>{t.subtotal || 'Subtotal'}</span>
                <span>€{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-500">FREE</span> : `€${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-zinc-600">Free shipping on orders over €500</p>
              )}
              <div className="border-t border-zinc-700 pt-3 flex justify-between">
                <span className="text-zinc-200 font-bold text-lg">{t.total || 'Total'}</span>
                <span className="text-amber-500 font-bold text-lg">€{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={handleCheckout} disabled={checkoutLoading}
              className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold py-3.5 rounded-lg transition-colors">
              {checkoutLoading ? 'Loading...' : (t.checkout || 'Proceed to Checkout')}
            </button>

            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="text-zinc-600 text-xs">Pay with:</span>
              {['Stripe', 'PayPal', 'BIZUM'].map(p => (
                <span key={p} className="text-zinc-500 text-xs font-semibold">{p}</span>
              ))}
            </div>

            <Link href={`/${lang}/shop`}
              className="flex items-center justify-center gap-2 text-zinc-500 hover:text-amber-500 text-sm mt-4 transition-colors">
              <ArrowLeft size={14}/> {t.continueShopping || 'Continue Shopping'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
