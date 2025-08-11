// AppsFlyer Configuration Example
// Copy this file to config.js and replace with your actual keys

const APPSFLYER_CONFIG = {
    // Your AppsFlyer Web Key (get from AppsFlyer dashboard)
    // Go to: AppsFlyer Dashboard > Website workplace > Copy your Web Key
    WEB_KEY: "your_web_key_here",
    
    // Your OneLink URL (get from AppsFlyer dashboard)
    // Go to: AppsFlyer Dashboard > OneLink > Create or copy your OneLink URL
    ONELINK_URL: "https://your-app.onelink.me/your-link-id",
    
    // Environment
    ENV: "development" // or "production"
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APPSFLYER_CONFIG;
} else {
    window.APPSFLYER_CONFIG = APPSFLYER_CONFIG;
} 