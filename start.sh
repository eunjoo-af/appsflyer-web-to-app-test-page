#!/bin/bash

echo "🚀 Starting AppsFlyer Smart Banner Test Server"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "📦 Using Python server..."
    python3 server.py
elif command -v python &> /dev/null; then
    echo "📦 Using Python server..."
    python server.py
# Check if Node.js is available
elif command -v node &> /dev/null; then
    echo "📦 Using Node.js server..."
    node server.js
else
    echo "❌ Error: Neither Python nor Node.js found."
    echo "Please install Python 3 or Node.js to run the server."
    echo ""
    echo "Alternative: Open index.html directly in your browser"
    echo "Note: Some features may not work without a local server"
    exit 1
fi 