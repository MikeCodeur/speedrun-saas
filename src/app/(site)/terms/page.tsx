import Link from 'next/link'
import { termsSections, termsUpdatedAt } from './data'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Conditions d’utilisation',
  description: 'Conditions générales d’utilisation du service my-saas',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Conditions d’utilisation
        </h1>
        <span className="text-xs text-white/60">
          Mise à jour: {termsUpdatedAt}
        </span>
      </div>

      <p className="mt-4 text-white/70">
        Merci d’utiliser my-saas. Veuillez lire attentivement ces conditions. En
        utilisant le service, vous acceptez ces termes.
      </p>

      <div className="mt-8 space-y-8">
        {termsSections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-medium">{section.title}</h2>
            <div className="mt-2 space-y-3 text-white/70">
              {section.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
        En cas de question, contactez-nous:{' '}
        <a className="underline" href="mailto:legal@example.com">
          legal@example.com
        </a>
      </div>

      <div className="flex gap-3">
        <Button
          label="Nous écrire"
          variant="primary"
          href="mailto:contact@example.com"
        />
        <Button label="Découvrir le produit" variant="secondary" href="/" />
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="text-sm text-white/80 underline hover:text-white"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  )
}
