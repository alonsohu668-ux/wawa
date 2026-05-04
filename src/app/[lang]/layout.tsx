import AgeGate from '@/components/AgeGate';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{lang: string}>;
}) {
  const {lang} = await params;
  return (
    <html lang={lang} className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#18181b"/>
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <AgeGate />
        {children}
      </body>
    </html>
  );
}
