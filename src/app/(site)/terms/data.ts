import { Button } from '@/components/ui/Button'

export type TermsSection = {
  id: string
  title: string
  paragraphs: string[]
}

export const termsUpdatedAt = '2025-10-13'

export const termsSections: TermsSection[] = [
  {
    id: 'objet',
    title: 'Objet',
    paragraphs: [
      'Les présentes conditions d’utilisation ("Conditions") régissent l’accès et l’usage du service SaaS ("Service").',
      'En accédant au Service, vous acceptez sans réserve ces Conditions.',
    ],
  },
  {
    id: 'acces',
    title: 'Accès au Service',
    paragraphs: [
      'Le Service est fourni "en l’état" et peut faire l’objet de mises à jour sans préavis.',
      'Nous nous efforçons d’assurer une disponibilité élevée, sans garantie d’absence d’interruption.',
    ],
  },
  {
    id: 'compte',
    title: 'Compte et sécurité',
    paragraphs: [
      'Vous êtes responsable du maintien de la confidentialité de vos identifiants et de toute activité réalisée via votre compte.',
      'Signalez immédiatement toute utilisation non autorisée.',
    ],
  },
  {
    id: 'usage',
    title: 'Usage autorisé',
    paragraphs: [
      'Vous vous engagez à ne pas utiliser le Service à des fins illégales, abusives ou susceptibles d’entraver son bon fonctionnement.',
      'Toute tentative de contournement des mesures de sécurité est interdite.',
    ],
  },
  {
    id: 'propriete',
    title: 'Propriété intellectuelle',
    paragraphs: [
      'Le Service, ses composants logiciels, marques, logos et contenus sont protégés par le droit de la propriété intellectuelle.',
      'Aucun transfert de droits n’est opéré au titre des présentes Conditions.',
    ],
  },
  {
    id: 'donnees',
    title: 'Données et confidentialité',
    paragraphs: [
      'Les données traitées dans le cadre du Service sont gérées conformément à notre politique de confidentialité.',
      'Vous devez disposer de toutes les autorisations nécessaires pour les données que vous importez.',
    ],
  },
  {
    id: 'responsabilite',
    title: 'Responsabilité',
    paragraphs: [
      'Dans la limite permise par la loi, notre responsabilité ne saurait être engagée pour les dommages indirects.',
      'En toute hypothèse, la responsabilité totale est limitée aux montants payés au titre du Service sur les 12 derniers mois.',
    ],
  },
  {
    id: 'resiliation',
    title: 'Résiliation',
    paragraphs: [
      'Vous pouvez mettre fin à l’utilisation du Service à tout moment.',
      'Nous pouvons suspendre ou résilier l’accès en cas de violation des Conditions.',
    ],
  },
  {
    id: 'droit-applicable',
    title: 'Droit applicable',
    paragraphs: [
      'Les présentes Conditions sont régies par le droit applicable au siège de l’éditeur du Service.',
      'Tout litige sera soumis aux juridictions compétentes.',
    ],
  },
]
