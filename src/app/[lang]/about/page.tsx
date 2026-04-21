import {use} from 'react';
import Header from '@/components/layout/Header';
import {translations} from '@/lib/i18n';
import type {Locale} from '@/lib/i18n';
import {Factory, Truck, Shield, Users, Globe, Award} from 'lucide-react';

interface Props {
  params: Promise<{lang: string}>;
}

export default function AboutPage({params}: Props) {
  const {lang} = use(params);
  const t = translations[lang as keyof typeof translations]?.about || translations.en.about;

  const stats = [
    {label: 'Products Delivered', value: '5,000+'},
    {label: 'Countries Served', value: '28'},
    {label: 'Happy Customers', value: '4,800+'},
    {label: 'Years Experience', value: '8+'},
  ];

  const values = [
    {icon: Shield, title: 'Authenticity First', text: 'Every product comes with an official anti-counterfeit code. We verify every shipment directly with manufacturers.'},
    {icon: Truck, title: 'European Logistics', text: 'Our German warehouse enables fast, discreet delivery across all EU countries within 7 days.'},
    {icon: Factory, title: 'Direct Factory Partnerships', text: 'We visit our partner factories annually to ensure production standards meet our quality requirements.'},
    {icon: Users, title: 'Customer Care', text: '24/7 WhatsApp and live chat support. Real people, not bots, ready to help you choose the right product.'},
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header lang={lang}/>
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">{t.title}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Bringing premium quality love dolls to European customers at fair prices since 2018.
              We believe in transparency, authenticity, and exceptional service.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map(stat => (
              <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-amber-500 mb-1">{stat.value}</div>
                <div className="text-zinc-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {values.map(({icon: Icon, title, text}) => (
              <div key={title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-600/10 rounded-lg">
                    <Icon size={20} className="text-amber-500"/>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Mission Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">{t.mission}</h2>
            <p className="text-zinc-400 leading-relaxed">{t.missionText}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-zinc-100 mb-3">{t.factory}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{t.factoryText}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-zinc-100 mb-3">{t.shipping}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{t.shippingText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
