# EuroDolls 🦞

> Premium European Silicone & TPE Love Dolls e-commerce platform

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Zinc/Amber design system
- **State**: Zustand (cart with localStorage persistence)
- **Payments**: Stripe API route ready
- **i18n**: 5 languages (EN/ES/PT/FR/DE) with locale routing
- **Deployment**: Vercel (EU node recommended)

## Features

- 🌐 5-language路由 (EN/ES/PT/FR/DE)
- 🛒 购物车 + Stripe结算
- 🎨 深色主题 + 金色点缀 (Western European审美)
- ✨ 动漫 + 写实两种风格产品
- 📱 全响应式设计
- ⚡ 静态生成 + 按需SSR混合

## Getting Started

```bash
npm install
npm run dev
```

Visit: http://localhost:3000

## Environment Variables (.env.local)

```env
# Stripe (required for checkout)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# PayPal (optional)
PAYPAL_CLIENT_ID=...
PAYPAL_SECRET=...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Deploy to Vercel (EU Node)

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/euro-dolls.git
   git push -u origin master
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import project → select GitHub repo
   - Framework: Next.js
   - Region: Frankfurt (eu-central-1) recommended
   - Add environment variables from `.env.example`

3. **Configure Domain**
   - Add your domain (e.g., eurodolls.com)
   - Update `NEXT_PUBLIC_APP_URL` to your domain

## Project Structure

```
src/
├── app/
│   ├── [lang]/           # Locale routes (en/es/pt/fr/de)
│   │   ├── page.tsx      # Home
│   │   ├── shop/         # Product listing
│   │   ├── product/[id]/ # Product detail
│   │   ├── cart/         # Shopping cart
│   │   ├── brands/       # Brand showcase
│   │   ├── about/        # About / Factory story
│   │   └── faq/          # FAQ
│   └── api/stripe/       # Stripe checkout API
├── components/
│   └── layout/Header.tsx # Nav + language switcher
├── data/products.json    # Product catalog
└── lib/
    ├── i18n.ts           # All 5 language translations
    └── store/cart.ts     # Zustand cart store
```

## Routes

| Path | Description |
|------|-------------|
| `/en` `/es` `/pt` `/fr` `/de` | Homepage per language |
| `/[lang]/shop` | Product catalog |
| `/[lang]/product/[id]` | Product detail |
| `/[lang]/cart` | Shopping cart |
| `/[lang]/brands` | Brand showcase |
| `/[lang]/about` | Factory story |
| `/[lang]/faq` | FAQ |

## Next Steps After First Deploy

1. Replace placeholder product images with licensed supplier photos
2. Connect real payment providers (Stripe live keys, PayPal)
3. Set up email automation (newsletter, order confirmations)
4. Add actual shipping provider integration
5. Configure custom domain + SSL

## Recommended Suppliers

| Brand | Style | Notes |
|-------|-------|-------|
| Sino-doll | Anime + Realistic | Best dual-style, EU export exp. |
| Zelex | Realistic (EU taste) | Premium, EU warehouse available |
| Piper Doll | TPE + Silicone | Anime-friendly, good pricing |

---

Built by 刹那's Agent 🦞 · Vercel-ready · EU-optimized
