#!/bin/bash

# Portfolio Backend Startup Script
# This script helps you start the backend server with helpful messages

echo "================================================"
echo "    Portfolio Backend - Starting Server"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node -v)"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL command not found in PATH"
    echo "   Make sure MySQL is installed and running"
    echo ""
fi

# Check if we're in the right directory
if [ ! -d "server" ]; then
    echo "❌ Error: 'server' directory not found!"
    echo "   Please run this script from the project root directory"
    exit 1
fi

# Change to server directory
cd server

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found in server directory!"
    echo "   Creating .env file from template..."
    if [ -f "../.env.example" ]; then
        cp ../.env.example .env
        echo "✅ .env file created"
        echo ""
        echo "⚠️  IMPORTANT: Please edit server/.env and update:"
        echo "   - DB_PASSWORD (your MySQL root password)"
        echo "   - Other settings as needed"
        echo ""
        read -p "Press Enter after updating .env file to continue..."
    else
        echo "❌ .env.example not found. Please create server/.env manually"
        exit 1
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed"
fi

echo ""
echo "🚀 Starting backend server..."
echo "   The server will automatically:"
echo "   ✓ Connect to MySQL"
echo "   ✓ Create database 'portfolio_db' if needed"
echo "   ✓ Create all required tables"
echo "   ✓ Start the API server on port 5000"
echo ""
echo "💡 Tip: Keep this terminal open while using the portfolio"
echo ""
echo "================================================"
echo ""

# Start the server
npm run dev
