import Link from 'next/link'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-white/[0.02] backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-wide">
            my-saas
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-white/80 hover:text-white">
              Accueil
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white">
              À propos
            </Link>
            <Link href="/terms" className="text-white/80 hover:text-white">
              Conditions
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-20 border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-6 py-8 text-xs text-white/60">
          © {new Date().getFullYear()} my-saas — Tous droits réservés.
        </div>
      </footer>
    </div>
  )
}
