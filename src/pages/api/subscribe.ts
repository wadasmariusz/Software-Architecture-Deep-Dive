// src/pages/api/subscribe.ts
// src/pages/api/subscribe.ts
export const prerender = false;
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const email = String(data.get("email") ?? "").trim();
    const bot = String(data.get("company") ?? "").trim();

    // Basic validation and honeypot check
    if (bot || !email) return new Response("Bad Request", { status: 400 });

    // Ensure required env vars are present (avoid silent 401 from upstream)
    const { MAILERLITE_API_TOKEN, MAILERLITE_GROUP_ID } = process.env as Record<string, string | undefined>;
    if (!MAILERLITE_API_TOKEN || !MAILERLITE_GROUP_ID) {
        return new Response("Server misconfigured: missing MailerLite credentials.", { status: 500 });
    }

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ email, groups: [MAILERLITE_GROUP_ID] }),
    });

    if (res.status === 200 || res.status === 201) {
        return new Response(null, { status: 204 });
    }

    // Pass through upstream status (e.g., 401 Unauthorized) with a concise message
    let message = "MailerLite error";
    try {
        const text = await res.text();
        message = text || message;
    } catch (_) {
        // ignore
    }
    return new Response(message, { status: res.status || 500 });
};
