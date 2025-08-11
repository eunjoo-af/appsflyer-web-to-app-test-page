#!/usr/bin/env python3
"""
Simple HTTP server for testing AppsFlyer Smart Banner website locally.
Run this script to serve the website on http://localhost:8000
"""

import http.server
import socketserver
import os
import sys

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    PORT = 8000
    
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Create server
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 Server started at http://localhost:{PORT}")
        print(f"📱 Open this URL on your mobile device or use browser dev tools to simulate mobile")
        print(f"🔧 Press Ctrl+C to stop the server")
        print(f"📁 Serving files from: {os.getcwd()}")
        print(f"🌐 Smart Banner test page: http://localhost:{PORT}/index.html")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n🛑 Server stopped")
            httpd.shutdown()

if __name__ == "__main__":
    main() 