import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Aplica a todas as rotas exceto API, assets e arquivos com extensão.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
