import { detectActualType, ComponentTypeEnum } from '@/lib/helper'

/**
 * Composant Isomorphique
 *
 * Ce composant n'a PAS de "use client" et n'est PAS async.
 * Il peut donc être utilisé dans:
 * - Un React Server Component (RSC)
 * - Un Client Component (RCC)
 *
 * Son comportement change selon l'environnement d'exécution réel.
 */
export function IsomorphicCard({ title }: { title: string }) {
  const actualType = detectActualType()

  const bgColor =
    actualType === ComponentTypeEnum.SERVER
      ? 'bg-blue-100 dark:bg-blue-900'
      : 'bg-green-100 dark:bg-green-900'

  const borderColor =
    actualType === ComponentTypeEnum.SERVER
      ? 'border-blue-500'
      : 'border-green-500'

  return (
    <div className={`rounded-lg border-2 ${borderColor} ${bgColor} p-4`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-1 text-sm">
        <p>
          <span className="font-medium">Type déclaré:</span>{' '}
          <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700">
            Isomorphique
          </span>
        </p>
        <p>
          <span className="font-medium">Exécuté sur:</span>{' '}
          <span
            className={`px-2 py-0.5 rounded ${
              actualType === ComponentTypeEnum.SERVER
                ? 'bg-blue-500 text-white'
                : 'bg-green-500 text-white'
            }`}
          >
            {actualType}
          </span>
        </p>
      </div>
    </div>
  )
}
