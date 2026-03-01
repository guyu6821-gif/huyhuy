// Cloudflare Pages Functions - Edge runtime
// Bu fayl Cloudflare Pages tərəfindən avtomatik işlənir

export async function onRequest(context) {
  // Static faylları birbaşa serve et
  return context.next();
}

export const config = {
  path: "/*"
};
