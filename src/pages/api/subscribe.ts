// src/pages/api/subscribe.ts
// src/pages/api/subscribe.ts
export const prerender = false;
import type { APIRoute } from "astro";
import { MAILERLITE_API_TOKEN, MAILERLITE_GROUP_ID } from "astro:env/server";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const email = String(data.get("email") ?? "").trim();
    const bot = String(data.get("company") ?? "").trim();
    if (bot || !email) return new Response("Bad Request", { status: 400 });

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ email, groups: [MAILERLITE_GROUP_ID] }),
    });

    if (res.status === 200 || res.status === 201) return new Response(null, { status: 204 });
    return new Response((await res.text()) || "MailerLite error", { status: 500 });
};

