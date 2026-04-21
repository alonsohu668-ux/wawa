'use client';

import {useState} from 'react';

export default function NewsletterForm({
  placeholder,
  button,
}: {
  placeholder: string;
  button: string;
}) {
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Thanks! We'll notify: ${email}`);
    setEmail('');
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:border-amber-600 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
      >
        {button}
      </button>
    </form>
  );
}
