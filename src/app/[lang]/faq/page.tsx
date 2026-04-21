'use client';
import {use} from 'react';
import Header from '@/components/layout/Header';
import {translations} from '@/lib/i18n';
import type {Locale} from '@/lib/i18n';
import {useState} from 'react';
import {ChevronDown} from 'lucide-react';

interface Props {
  params: Promise<{lang: string}>;
}

const faqs = [
  {q: 'Is shipping discreet?', a: 'Yes. All orders ship in plain brown boxes with no logos, no product descriptions, and no branding visible. The sender shows as "Online Store" and no one will know what is inside the package.'},
  {q: 'How long does shipping take?', a: 'We ship from our EU warehouse in Germany. Standard delivery takes 5-7 business days across Europe. Express delivery (3 days) is available for an additional fee.'},
  {q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex) via Stripe, PayPal, BIZUM (Spain), and Klarna (Germany/Netherlands). All payments are processed securely with full buyer protection.'},
  {q: 'What is your return policy?', a: 'We offer a 30-day satisfaction guarantee. If you are not completely satisfied, return the product in original condition for a full refund. We cover return shipping costs for EU customers.'},
  {q: 'Are your dolls authentic?', a: 'Yes. Every doll comes with an official anti-counterfeit verification code from the manufacturer. You can verify authenticity on the brand website before your order arrives.'},
  {q: 'What is the difference between TPE and Silicone?', a: 'TPE (Thermoplastic Elastomer) is softer, more affordable, and feels more skin-like. Silicone is more durable, easier to clean, retains heat better, and provides a more realistic texture. Both are body-safe materials.'},
  {q: 'Do you offer customization?', a: 'Yes. We offer extensive customization options including eye color, hair color/style, skin tone, body type, and more. Custom orders typically take 2-3 weeks to produce.'},
  {q: 'What is included with each purchase?', a: 'Each doll includes: the doll body, one wig, one outfit, care accessories kit, manual, and anti-counterfeit code card.'},
];

export default function FAQPage({params}: Props) {
  const {lang} = use(params);
  const t = translations[lang as keyof typeof translations]?.faq || translations.en.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header lang={lang}/>
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-100 text-center mb-4">{t.title}</h1>
          <p className="text-zinc-500 text-center mb-12">Everything you need to know before purchasing.</p>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left">
                  <span className="text-zinc-200 font-medium pr-4">{faq.q}</span>
                  <ChevronDown size={18}
                    className={`text-zinc-500 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}/>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-amber-900/10 border border-amber-900/30 rounded-xl p-6 text-center">
            <p className="text-zinc-300 mb-3">Still have questions?</p>
            <a href="mailto:support@eurodolls.com"
              className="text-amber-500 hover:text-amber-400 font-semibold text-sm">
              Contact our team →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
