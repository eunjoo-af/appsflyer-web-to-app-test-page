// Global variables for AppsFlyer configuration
let appsFlyerInitialized = false;
let userWebKey = '';
let userOneLinkUrl = '';

// Initialize AppsFlyer with user-provided keys
function initializeAppsFlyer() {
    const webKeyInput = document.getElementById('web-key-input');
    const oneLinkInput = document.getElementById('onelink-url-input');
    
    // Get user input
    userWebKey = webKeyInput.value.trim();
    userOneLinkUrl = oneLinkInput.value.trim() || 'https://your-app.onelink.me/your-link-id'; // Default fallback
    
    // Validate input
    if (!userWebKey) {
        showNotification('Please enter your AppsFlyer Web Dev Key', 'error');
        return;
    }
    
    if (userWebKey.length < 10) {
        showNotification('Web Dev Key seems too short. Please check your key.', 'error');
        return;
    }
    
    console.log('🔐 Initializing AppsFlyer with user-provided keys...');
    console.log('Web Key:', userWebKey.substring(0, 8) + '...');
    console.log('OneLink URL:', userOneLinkUrl);
    
    // Load Smart Banner SDK
    loadSmartBannerSDK();
    
    // Load Smart Script SDK
    loadSmartScriptSDK();
    
    // Show success message
    showNotification('✅ AppsFlyer initialized successfully!', 'success');
    
    // Hide key input form and show test section
    document.getElementById('key-input-section').style.display = 'none';
    document.getElementById('appsflyer-section').style.display = 'block';
    
    appsFlyerInitialized = true;
}

// Load Smart Banner SDK
function loadSmartBannerSDK() {
    const script = document.createElement('script');
    script.innerHTML = `
        !function(t,e,n,s,a,c,i,o,p){t.AppsFlyerSdkObject=a,t.AF=t.AF||function(){(t.AF.q=t.AF.q||[]).push([Date.now()].concat(Array.prototype.slice.call(arguments)))},t.AF.id=t.AF.id||i,t.AF.plugins={},o=e.createElement(n),p=e.getElementsByTagName(n)[0],o.async=1,o.src="https://websdk.appsflyer.com?"+(c.length>0?"st="+c.split(",").sort().join(",")+"&":"")+(i.length>0?"af_id="+i:""),p.parentNode.insertBefore(o,p)}(window,document,"script",0,"AF","banners",{banners: {key: "${userWebKey}"}});
        AF('banners', 'showBanner');
    `;
    document.head.appendChild(script);
    console.log('✅ Smart Banner SDK loaded');
}

// Load Smart Script SDK
function loadSmartScriptSDK() {
    // Load Smart Script script
    const script = document.createElement('script');
    script.src = 'https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js';
    script.onload = function() {
        console.log('✅ Smart Script SDK loaded');
        initializeSmartScript();
    };
    document.head.appendChild(script);
}

// Initialize Smart Script with user configuration
function initializeSmartScript() {
    const mediaSource = {keys:["utm_source","pid"],overrideValues:{"facebook":"metaweb_int"},defaultValue:"website"};
    const afSub1 = {keys:["fbclid"]};
    const campaign = {keys:["utm_campaign"]};
    const custom_ss_ui = {paramKey:"af_ss_ui",defaultValue:"true"};

    // Generate OneLink URL
    window.smartScriptResult = window.AF_SMART_SCRIPT.generateOneLinkURL({
        oneLinkURL: userOneLinkUrl,
        afParameters: {
            mediaSource: mediaSource,
            afSub1: afSub1,
            campaign: campaign,
            afCustom: [
                custom_ss_ui
            ]
        }
    });
    
    console.log('✅ Smart Script initialized');
    console.log('Generated OneLink URL:', window.smartScriptResult ? window.smartScriptResult.clickURL : 'null');
}

// Smart Banner control functions
function showBanner() {
    if (!appsFlyerInitialized) {
        showNotification('Please initialize AppsFlyer first by entering your Web Dev Key', 'error');
        return;
    }
    
    try {
        // Check if AF function exists
        if (typeof AF === 'undefined') {
            console.error('AF function is not defined. AppsFlyer SDK may not be loaded.');
            console.log('❌ AppsFlyer SDK not loaded. Check console for details.');
            return;
        }
        
        console.log('Attempting to show banner...');
        console.log('AF function available:', typeof AF);
        
        AF('banners', 'showBanner');
        console.log('✅ Smart Banner shown successfully');
        console.log('Banner should appear at the bottom of the page');
    } catch (error) {
        console.error('❌ Error showing banner:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            AF: typeof AF
        });
    }
}

function hideBanner() {
    if (!appsFlyerInitialized) {
        showNotification('Please initialize AppsFlyer first by entering your Web Dev Key', 'error');
        return;
    }
    
    try {
        AF('banners', 'hideBanner');
        console.log('✅ Smart Banner hidden');
        console.log('Banner should be removed from the page');
    } catch (error) {
        console.error('❌ Error hiding banner:', error);
        console.error('Error details:', error.message);
    }
}

function updateBannerParams() {
    if (!appsFlyerInitialized) {
        showNotification('Please initialize AppsFlyer first by entering your Web Dev Key', 'error');
        return;
    }
    
    try {
        // Example parameters that can be added to the OneLink URL
        const params = {
            deep_link_value: "test_param",
            deep_link_sub1: "demo",
            af_adset: "smart_banner_test",
            af_ad: "test_campaign",
            af_campaign: "demo_campaign"
        };
        
        AF('banners', 'updateParams', params);
        console.log('✅ Banner parameters updated:', params);
        console.log('Parameters added to OneLink URL');
    } catch (error) {
        console.error('❌ Error updating banner parameters:', error);
        console.error('Error details:', error.message);
    }
}

// Notification system for user feedback
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Device detection for testing
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Log device information for testing
console.log('Device Info:', {
    userAgent: navigator.userAgent,
    isMobile: isMobileDevice(),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height
});

// Add mobile detection warning
if (!isMobileDevice()) {
    const warning = document.createElement('div');
    warning.style.cssText = `
        background: #f39c12;
        color: white;
        padding: 1rem;
        text-align: center;
        font-weight: bold;
        margin-bottom: 1rem;
    `;
    warning.textContent = '⚠️ Smart Banners are designed for mobile devices. Use browser dev tools to simulate mobile for testing.';
    document.querySelector('main').insertBefore(warning, document.querySelector('main').firstChild);
}

// Smart Script Test Function
function testSmartScript() {
    if (!appsFlyerInitialized) {
        showNotification('Please initialize AppsFlyer first by entering your Web Dev Key', 'error');
        return;
    }
    
    console.log('=== Smart Script Test ===');
    
    // Check if Smart Script is loaded
    if (typeof window.AF_SMART_SCRIPT === 'undefined') {
        console.error('❌ Smart Script SDK is not loaded');
        console.log('Make sure the Smart Script SDK is included in the page');
        return;
    }
    
    console.log('✅ Smart Script SDK is available');
    
    // Test URL generation with different parameters
    try {
        // Test with current URL parameters
        var result = window.AF_SMART_SCRIPT.generateOneLinkURL({
            oneLinkURL: userOneLinkUrl,
            afParameters: {
                mediaSource: {keys:["utm_source","pid"],overrideValues:{"facebook":"metaweb_int"},defaultValue:"website"},
                afSub1: {keys:["fbclid"]},
                campaign: {keys:["utm_campaign"]},
                afCustom: [
                    {paramKey:"af_ss_ui",defaultValue:"true"}
                ]
            }
        });
        
        if (result) {
            console.log('✅ Smart Script URL generated successfully');
            console.log('Generated URL:', result.clickURL);
            
            // Display the generated URL prominently
            displayGeneratedOneLink(result.clickURL);
            
            // Test opening the URL
            console.log('Opening generated URL in new tab...');
            window.open(result.clickURL, '_blank');
            
            // Test QR code generation (if needed)
            if (window.AF_SMART_SCRIPT.displayQrCode) {
                console.log('QR code generation available');
            }
            
            // Test impression firing
            if (window.AF_SMART_SCRIPT.fireImpressionsLink) {
                console.log('Impression firing available');
                setTimeout(() => {
                    window.AF_SMART_SCRIPT.fireImpressionsLink();
                    console.log('✅ Impression fired');
                }, 1000);
            }
            
        } else {
            console.error('❌ Smart Script returned null');
            console.log('This might be due to skip lists or invalid parameters');
            displayGeneratedOneLink(null);
        }
        
    } catch (error) {
        console.error('❌ Error testing Smart Script:', error);
        displayGeneratedOneLink(null);
    }
}

// Function to display generated OneLink URL
function displayGeneratedOneLink(url) {
    // Remove existing OneLink display
    const existingDisplay = document.getElementById('onelink-display');
    if (existingDisplay) {
        existingDisplay.remove();
    }
    
    // Create display container
    const displayContainer = document.createElement('div');
    displayContainer.id = 'onelink-display';
    displayContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 2px solid #3498db;
        border-radius: 10px;
        padding: 20px;
        max-width: 90%;
        max-height: 80%;
        overflow-y: auto;
        z-index: 10001;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        font-family: monospace;
    `;
    
    if (url) {
        displayContainer.innerHTML = `
            <h3 style="margin: 0 0 15px 0; color: #2c3e50;">✅ Generated OneLink URL</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px; word-break: break-all;">
                <strong>URL:</strong><br>
                <span style="color: #27ae60;">${url}</span>
            </div>
            <div style="margin-bottom: 15px;">
                <strong>URL Parameters:</strong><br>
                <pre style="background: #f1f1f1; padding: 10px; border-radius: 3px; overflow-x: auto;">${decodeURIComponent(url.split('?')[1] || 'No parameters')}</pre>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="copyToClipboard('${url}')" style="background: #3498db; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">Copy URL</button>
                <button onclick="closeOneLinkDisplay()" style="background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">Close</button>
            </div>
        `;
    } else {
        displayContainer.innerHTML = `
            <h3 style="margin: 0 0 15px 0; color: #e74c3c;">❌ OneLink Generation Failed</h3>
            <div style="background: #fdf2f2; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                <strong>Possible reasons:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Skip lists are active</li>
                    <li>Invalid URL parameters</li>
                    <li>OneLink configuration issues</li>
                    <li>Network connectivity problems</li>
                </ul>
            </div>
            <div style="text-align: center;">
                <button onclick="closeOneLinkDisplay()" style="background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">Close</button>
            </div>
        `;
    }
    
    // Add overlay background
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 10000;
    `;
    overlay.onclick = closeOneLinkDisplay;
    
    document.body.appendChild(overlay);
    document.body.appendChild(displayContainer);
}

// Function to copy URL to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('✅ URL copied to clipboard');
        // Show a brief notification
        const notification = document.createElement('div');
        notification.textContent = 'URL copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10002;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }).catch(function(err) {
        console.error('❌ Failed to copy URL:', err);
    });
}

// Function to close OneLink display
function closeOneLinkDisplay() {
    const display = document.getElementById('onelink-display');
    const overlay = document.querySelector('div[style*="rgba(0,0,0,0.5)"]');
    if (display) display.remove();
    if (overlay) overlay.remove();
}

// Function to reset AppsFlyer configuration
function resetAppsFlyerConfig() {
    appsFlyerInitialized = false;
    userWebKey = '';
    userOneLinkUrl = '';
    
    // Show key input form and hide test section
    document.getElementById('key-input-section').style.display = 'block';
    document.getElementById('appsflyer-section').style.display = 'none';
    
    // Clear input fields
    document.getElementById('web-key-input').value = '';
    document.getElementById('onelink-url-input').value = '';
    
    console.log('🔄 AppsFlyer configuration reset');
    showNotification('Configuration reset. Please enter your Web Dev Key again.', 'info');
}

// Function to show the initial OneLink generated on page load
function showInitialOneLink() {
    if (!appsFlyerInitialized) {
        showNotification('Please initialize AppsFlyer first by entering your Web Dev Key', 'error');
        return;
    }
    
    console.log('=== Initial OneLink Display ===');
    
    if (typeof window.smartScriptResult !== 'undefined' && window.smartScriptResult) {
        console.log('Initial OneLink URL:', window.smartScriptResult.clickURL);
        displayGeneratedOneLink(window.smartScriptResult.clickURL);
    } else {
        console.log('No initial OneLink found. Smart Script may not have generated a URL on page load.');
        displayGeneratedOneLink(null);
    }
}

// SDK Status Check Function
function checkSDKStatus() {
    if (!appsFlyerInitialized) {
        showNotification('Please initialize AppsFlyer first by entering your Web Dev Key', 'error');
        return;
    }
    
    console.log('=== AppsFlyer SDK Status Check ===');
    console.log('AF function available:', typeof AF);
    console.log('AF function:', AF);
    
    if (typeof AF === 'undefined') {
        console.error('❌ AF function is not defined');
        console.error('This means the AppsFlyer SDK has not loaded properly');
        return false;
    } else {
        console.log('✅ AF function is available');
        
        // Test if we can call AF function
        try {
            console.log('Testing AF function call...');
            AF('banners', 'showBanner');
            console.log('✅ AF function call successful');
        } catch (error) {
            console.error('❌ AF function call failed:', error);
        }
        
        return true;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('AppsFlyer Smart Banner Test Page Loaded');
    console.log('Available functions: showBanner(), hideBanner(), updateBannerParams()');
    
    // Show welcome message
    console.log('🚀 AppsFlyer Web-to-App Test Page Loaded');
    console.log('📝 Please enter your AppsFlyer Web Dev Key to start testing');
    
    // Add keyboard shortcuts for testing
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    showBanner();
                    break;
                case '2':
                    e.preventDefault();
                    hideBanner();
                    break;
                case '3':
                    e.preventDefault();
                    updateBannerParams();
                    break;
                case '4':
                    e.preventDefault();
                    testSmartScript();
                    break;
                case '5':
                    e.preventDefault();
                    showInitialOneLink();
                    break;
            }
        }
    });
    
    // Show keyboard shortcuts info
    const shortcutsInfo = document.createElement('div');
    shortcutsInfo.style.cssText = `
        background: #ecf0f1;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #555;
    `;
    shortcutsInfo.innerHTML = `
        <strong>Keyboard Shortcuts:</strong><br>
        Ctrl/Cmd + 1: Show Banner<br>
        Ctrl/Cmd + 2: Hide Banner<br>
        Ctrl/Cmd + 3: Update Parameters<br>
        Ctrl/Cmd + 4: Test Smart Script<br>
        Ctrl/Cmd + 5: Show Initial OneLink
    `;
    document.querySelector('.info').appendChild(shortcutsInfo);
}); 