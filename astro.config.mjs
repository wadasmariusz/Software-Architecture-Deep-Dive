// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: node({ mode: 'standalone' }),
    vite: {
        plugins: [tailwindcss()],
        // Allow external host when running `astro preview` (Vite preview)
        preview: {
            allowedHosts: ["sadd.devcodi.com"],
        },
        // Helpful for local/dev runs behind proxy as well
        server: {
            host: true,
            allowedHosts: ["sadd.devcodi.com"],
        },
    },
});
