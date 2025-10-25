export const prerender = false;
import type { APIRoute } from "astro";

// MailerLite group for funding interest
const FUNDING_GROUP_ID = "169261911842489478";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = String(data.get("email") ?? "").trim();
  const bot = String(data.get("company") ?? "").trim();

  if (bot || !email) return new Response("Bad Request", { status: 400 });

  const { MAILERLITE_API_TOKEN } = process.env as Record<string, string | undefined>;
  if (!MAILERLITE_API_TOKEN) {
    return new Response("Server misconfigured: missing MailerLite token.", { status: 500 });
  }

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, groups: [FUNDING_GROUP_ID] }),
  });

  if (res.status === 200 || res.status === 201 || res.status === 204) {
    return new Response(null, { status: 204 });
  }

  let message = "MailerLite error";
  try { message = (await res.text()) || message; } catch (_) {}
  return new Response(message, { status: res.status || 500 });
};

