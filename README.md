# AppsFlyer Web-to-App Test Site

A comprehensive testing environment for AppsFlyer Smart Banners and Smart Script functionality. This website allows you to test both Smart Banners and Smart Script features with your own AppsFlyer configuration.

## 🌐 Live Demo

**GitHub Pages**: [https://eunjoo-af.github.io/appsflyer-web-to-app-test-page](https://eunjoo-af.github.io/appsflyer-web-to-app-test-page)

## ✨ Features

- ✅ **Smart Banner Testing** - Test mobile web-to-app banners
- ✅ **Smart Script Testing** - Generate dynamic OneLink URLs
- ✅ **Secure Key Input** - No hardcoded sensitive information
- ✅ **Interactive Controls** - Real-time banner and script testing
- ✅ **Mobile Simulation** - Test on desktop with mobile simulation
- ✅ **Debug Tools** - Comprehensive logging and error handling
- ✅ **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Option 1: Use GitHub Pages (Recommended)

1. **Visit the live site**: [https://eunjoo-af.github.io/appsflyer-web-to-app-test-page](https://eunjoo-af.github.io/appsflyer-web-to-app-test-page)
2. **Enter your AppsFlyer Web Dev Key** in the form
3. **Start testing** Smart Banners and Smart Script

### Option 2: Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/eunjoo-af/appsflyer-web-to-app-test-page.git
   cd appsflyer-web-to-app-test-page
   ```

2. **Make the startup script executable**
   ```bash
   chmod +x start.sh
   ```

3. **Start the server**
   ```bash
   ./start.sh
   ```

4. **Open in browser**: `http://localhost:8000`

## 🔧 Setup Instructions

### 1. Get Your AppsFlyer Web Dev Key

1. Log into your [AppsFlyer dashboard](https://dashboard.appsflyer.com/)
2. Go to the **Website workplace**
3. Create a new Website workplace if you don't have one
4. Copy your **Web Dev Key** from the dashboard

### 2. Get Your OneLink URL (Optional)

1. In your AppsFlyer dashboard, go to **OneLink**
2. Create a new OneLink or copy an existing one
3. Copy the OneLink URL

### 3. Test the Functionality

1. **Enter your Web Dev Key** in the form on the website
2. **Optionally enter your OneLink URL**
3. **Click "Initialize AppsFlyer"**
4. **Start testing** with the interactive controls

## 🎯 Testing Features

### Smart Banner Testing
- **Show/Hide Banner** - Control banner visibility
- **Update Parameters** - Add custom parameters to OneLink URLs
- **Mobile Detection** - Test on mobile devices or simulate mobile
- **Debug SDK** - Check SDK status and connectivity

### Smart Script Testing
- **Generate OneLink URLs** - Create dynamic URLs with parameters
- **Parameter Mapping** - Test UTM parameter mapping
- **Click ID Handling** - Test Facebook and Google click IDs
- **URL Display** - View generated URLs with parameter breakdown

### Keyboard Shortcuts
- `Ctrl/Cmd + 1`: Show Banner
- `Ctrl/Cmd + 2`: Hide Banner
- `Ctrl/Cmd + 3`: Update Parameters
- `Ctrl/Cmd + 4`: Test Smart Script
- `Ctrl/Cmd + 5`: Show Initial OneLink

## 🔐 Security Features

- **No hardcoded keys** - All sensitive information is user-provided
- **Dynamic SDK loading** - SDKs only load after key validation
- **Input validation** - Comprehensive key format checking
- **Secure by design** - Safe for public repositories

## 📁 Project Structure

```
├── index.html              # Main website with key input form
├── styles.css              # CSS styles and responsive design
├── script.js               # JavaScript functionality and SDK loading
├── config.example.js       # Example configuration template
├── .gitignore              # Git ignore rules for sensitive files
├── start.sh                # Local development server script
├── server.py               # Python HTTP server
├── server.js               # Node.js HTTP server
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## 🛠️ Development

### Prerequisites
- Python 3.x OR Node.js (for local development)
- Modern web browser
- AppsFlyer account and Web Dev Key

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

# Start local server
./start.sh

# Or use Python
python3 server.py

# Or use Node.js
node server.js
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🔍 Troubleshooting

### Common Issues

**Banner not showing:**
- Check that you're testing on mobile or using mobile simulation
- Verify your Web Dev Key is correct
- Check browser console for errors

**Smart Script returning null:**
- Check skip lists in your AppsFlyer configuration
- Verify OneLink URL is correct
- Check URL parameters

**SDK not loading:**
- Check internet connection
- Verify Web Dev Key format
- Check browser console for network errors

### Debug Steps
1. **Open browser dev tools** (F12)
2. **Check Console tab** for error messages
3. **Use "Debug SDK" button** to check SDK status
4. **Check Network tab** for failed requests

## 📚 Documentation

- [AppsFlyer Smart Banner v2 Documentation](https://dev.appsflyer.com/hc/docs/dl_smart_banner_v2)
- [AppsFlyer Smart Script v2 Documentation](https://dev.appsflyer.com/hc/docs/dl_smart_script_v2)
- [AppsFlyer Developer Hub](https://dev.appsflyer.com/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/eunjoo-af/appsflyer-web-to-app-test-page/issues)
- **Discussions**: [GitHub Discussions](https://github.com/eunjoo-af/appsflyer-web-to-app-test-page/discussions)
- **AppsFlyer Support**: [AppsFlyer Help Center](https://support.appsflyer.com/)

---

**Note**: This is a testing tool for AppsFlyer functionality. Always use your own AppsFlyer keys and test in a controlled environment. 