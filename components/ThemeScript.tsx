/**
 * Applique le thème AVANT le premier paint : sans ça, la page s'affiche en
 * sombre puis bascule en clair au montage de React (flash blanc/bleu).
 * Server Component — le script est inliné dans le HTML.
 */
export const THEME_STORAGE_KEY = "theme";

const SCRIPT = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(t);
}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
