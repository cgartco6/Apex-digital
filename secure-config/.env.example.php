<?php
// Environment variables - NEVER commit to repository
// Rename to env.php and update with your actual values

// Database configuration
define('DB_HOST', '!DB_HOST_HERE!');
define('DB_NAME', '!DB_NAME_HERE!');
define('DB_USER', '!DB_USER_HERE!');
define('DB_PASS', '!DB_PASSWORD_HERE!');

// API keys
define('STRIPE_API_KEY', '!STRIPE_API_KEY_HERE!');
define('PAYPAL_API_KEY', '!PAYPAL_API_KEY_HERE!');
define('OPENAI_API_KEY', '!OPENAI_API_KEY_HERE!');
define('FACEBOOK_APP_ID', '!FACEBOOK_APP_ID_HERE!');
define('FACEBOOK_APP_SECRET', '!FACEBOOK_APP_SECRET_HERE!');
define('TWITTER_API_KEY', '!TWITTER_API_KEY_HERE!');
define('TWITTER_API_SECRET', '!TWITTER_API_SECRET_HERE!');
define('INSTAGRAM_APP_ID', '!INSTAGRAM_APP_ID_HERE!');
define('INSTAGRAM_APP_SECRET', '!INSTAGRAM_APP_SECRET_HERE!');

// Encryption keys
define('ENCRYPTION_KEY', '!RANDOM_32_CHAR_STRING_HERE!');
define('JWT_SECRET', '!ANOTHER_RANDOM_STRING_HERE!');

// Bank account details
define('FNB_ACCOUNT', '!FNB_ACCOUNT_NUMBER_HERE!');
define('RESERVE_ACCOUNT', '!RESERVE_ACCOUNT_NUMBER_HERE!');
define('OWNER_PAYOUT_ACCOUNT', '!OWNER_PAYOUT_ACCOUNT_HERE!');

// Security settings
define('REQUIRE_2FA', true);
define('ALLOWED_IP_RANGES', '192.168.1.0/24, 127.0.0.1');

// Payment distribution
define('AI_FUND_PERCENT', 20);
define('RESERVE_PERCENT', 20);
define('PAYOUT_PERCENT', 60);

// AI Settings
define('AI_TRAINING_INTERVAL', 86400); // 24 hours in seconds
define('AI_LEARNING_RATE', 0.1);
define('AI_MAX_MEMORY', 104857600); // 100MB

// Website Settings
define('SITE_URL', 'https://apex-digital.co.za');
define('CONTACT_EMAIL', 'info@apex-digital.co.za');
define('SUPPORT_EMAIL', 'support@apex-digital.co.za');
define('ADMIN_EMAIL', 'admin@apex-digital.co.za');
?>
