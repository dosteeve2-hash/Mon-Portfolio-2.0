import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/site";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  // Une locale inconnue chargeait un JSON inexistant et cassait le rendu.
  const locale = hasLocale(LOCALES, requested) ? requested : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
