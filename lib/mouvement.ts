/**
 * Le réglage système « réduire les animations », lisible depuis du JavaScript.
 *
 * Pourquoi ce module existe : `app/globals.css` porte déjà la règle générale qui
 * ramène toutes les durées à 0.001ms sous `prefers-reduced-motion: reduce`. Elle
 * couvre les animations et les transitions CSS — c'est-à-dire tout sauf le
 * mouvement que JavaScript pilote lui-même. Or c'est précisément là que ce
 * portfolio bouge le plus : Lenis réécrit la position de défilement image par
 * image, GSAP interpole des nombres. Aucune règle CSS ne les atteint.
 *
 * Framer Motion a son `useReducedMotion()`, et les composants qui l'utilisent sont
 * couverts. Ce module est l'équivalent pour les deux autres.
 */

const REQUETE = '(prefers-reduced-motion: reduce)'

/**
 * `false` côté serveur et sur un navigateur qui ne connaît pas la requête : on ne
 * peut pas deviner, et deviner « réduit » priverait tout le monde d'animation.
 * Le composant appelant doit donc rester correct dans les deux cas — c'est
 * pourquoi `AnimatedCounter` rend sa valeur finale dès le serveur.
 */
export function mouvementReduit(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia(REQUETE).matches
}

/**
 * Prévient quand le réglage change, sans recharger la page. Un visiteur qui active
 * « réduire les animations » pendant sa visite le fait généralement parce que la
 * page vient de le gêner : attendre un rechargement serait répondre à côté.
 *
 * Rend la fonction de désabonnement.
 */
export function surChangementDeMouvement(rappel: (reduit: boolean) => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {}
  const requete = window.matchMedia(REQUETE)
  const ecouteur = (e: MediaQueryListEvent) => rappel(e.matches)
  requete.addEventListener('change', ecouteur)
  return () => requete.removeEventListener('change', ecouteur)
}
