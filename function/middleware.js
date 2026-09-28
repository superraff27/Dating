// ============================================================
// 🔥 CLOAKING MIDDLEWARE - Cloudflare Pages Functions
// ============================================================

export async function onRequest(context) {
  const { request, next } = context;
  const userAgent = request.headers.get('User-Agent') || '';
  const country = request.cf?.country || 'US';
  const url = new URL(request.url);

  // ============================================================
  // 🔧 KONFIGURASI
  // ============================================================
  const SAFE_URL = 'https://www.google.com';
  const ALLOWED_COUNTRIES = ['US', 'GB', 'CA', 'AU', 'NZ', 'DE', 'FR'];

  // ============================================================
  // 🚫 DAFTAR BOT YANG HARUS DI-BLOCK
  // ============================================================
  const BOTS = [
    'facebookexternalhit',
    'Facebot',
    'Twitterbot',
    'Googlebot',
    'bingbot',
    'YandexBot',
    'DuckDuckBot',
    'Baiduspider',
    'Slurp',
    'Sogou',
    'Exabot',
    'ia_archiver',
    'SemrushBot',
    'AhrefsBot',
    'MJ12bot',
    'DotBot',
    'PetalBot',
    'Bytespider',
    'Applebot',
    'LinkedInBot',
    'Pinterestbot',
    'TelegramBot',
    'WhatsApp',
    'MetaInspector',
    'Chrome-Lighthouse',
    'HeadlessChrome',
    'PhantomJS',
    'Puppeteer',
    'Playwright'
  ];

  // ============================================================
  // 1. CEK BOT
  // ============================================================
  const isBot = BOTS.some(bot =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );

  if (isBot) {
    console.log('🚫 BOT DETECTED:', userAgent.substring(0, 50));
    return Response.redirect(SAFE_URL, 302);
  }

  // ============================================================
  // 2. CEK COUNTRY
  // ============================================================
  if (!ALLOWED_COUNTRIES.includes(country)) {
    console.log('🚫 BLOCKED COUNTRY:', country);
    return Response.redirect(SAFE_URL, 302);
  }

  // ============================================================
  // 3. CEK USER-AGENT KOSONG (Bot biasanya kosong)
  // ============================================================
  if (!userAgent || userAgent.length < 10) {
    console.log('🚫 EMPTY USER-AGENT');
    return Response.redirect(SAFE_URL, 302);
  }

  // ============================================================
  // 4. LOLOS → LANJUT KE HALAMAN
  // ============================================================
  console.log('✅ HUMAN DETECTED:', country, userAgent.substring(0, 50));
  return next();
}