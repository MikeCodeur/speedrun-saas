import { Button } from '@/components/ui/Buttonold'

export default function Page() {
  // console.log(name)
  console.log('>>>>about page')
  return (
    <>
      <div className="mx-auto max-w-5xl px-6 py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80 backdrop-blur">
          <span className="size-1.5 rounded-full bg-emerald-400" />À propos
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
          Construire des expériences sobres, rapides et humaines
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Nous concevons des produits SaaS axés sur la performance,
          l’accessibilité et la simplicité. Notre approche: un design
          minimaliste, un code clair, et une attention maniaque aux détails.
        </p>
      </div>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <h3 className="text-lg font-medium">Performance d’abord</h3>
            <p className="mt-2 text-sm text-white/70">
              Rendering moderne, tailles minimisées et assets optimisés pour
              charger en un éclair.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <h3 className="text-lg font-medium">Accessibilité</h3>
            <p className="mt-2 text-sm text-white/70">
              Contrastes élevés, navigation au clavier et bonnes pratiques ARIA
              par défaut.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <h3 className="text-lg font-medium">Transparence</h3>
            <p className="mt-2 text-sm text-white/70">
              Mesures de qualité visibles, feuilles de route publiques et
              retours rapides.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                Envie d’en savoir plus ?
              </h2>
              <p className="mt-2 max-w-xl text-white/70">
                Contactez-nous pour discuter de vos besoins, de notre stack ou
                d’un partenariat.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="default">Nous écrire</Button>
              <Button variant="secondary">Découvrir le SAAS</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
