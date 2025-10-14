# 1) Budowanie Astro (SSR) z pnpm
FROM node:lts AS build
WORKDIR /app

# Włącz Corepack i pnpm
RUN corepack enable

# Instalacja zależności z cache lockfile
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Skopiuj resztę projektu i zbuduj
COPY . .
RUN pnpm run build

# 2) Serwowanie buildu statycznego przez Astro Preview
FROM node:lts AS runtime
WORKDIR /app

# Skopiuj node_modules i build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/.astro ./.astro
COPY --from=build /app/astro.config.mjs ./astro.config.mjs

# Ustaw zmienne środowiskowe
ENV HOST=0.0.0.0
ENV PORT=4321

# Wystaw port i uruchom SSR Node
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
