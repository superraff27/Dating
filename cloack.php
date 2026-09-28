<?php
// ============================================================
// 🔥 CLOAKING SCRIPT - Filter Bot & Country
// ============================================================

// Daftar bot/crawler yang HARUS di-block (dikasih halaman aman)
$bots = [
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
    'WhatsApp'
];

// Country yang diizinkan (Tier 1)
$allowed_countries = ['US', 'GB', 'CA', 'AU', 'NZ', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI'];

// ============================================================
// CEK USER AGENT
// ============================================================
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';

foreach ($bots as $bot) {
    if (stripos($user_agent, $bot) !== false) {
        // Bot terdeteksi → kasih halaman aman
        header('Location: https://www.google.com');
        exit;
    }
}

// ============================================================
// CEK COUNTRY (via IP)
// ============================================================
$ip = $_SERVER['REMOTE_ADDR'] ?? '';

// Pake API gratis (atau MaxMind kalo punya)
$geo = @json_decode(file_get_contents("http://ip-api.com/json/{$ip}?fields=countryCode"), true);
$country = $geo['countryCode'] ?? 'US';

if (!in_array($country, $allowed_countries)) {
    // Country gak diizinkan → kasih halaman aman
    header('Location: https://www.google.com');
    exit;
}

// ============================================================
// KALO LOLOS → TAMPILIN LANDING PAGE
// ============================================================
readfile('main-lander.html');
?>