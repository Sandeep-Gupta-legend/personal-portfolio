@echo off
REM Portfolio Backend Startup Script (Windows)
REM This script helps you start the backend server with helpful messages

echo ================================================
echo     Portfolio Backend - Starting Server
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found
node -v

REM Check if we're in the right directory
if not exist "server\" (
    echo [ERROR] 'server' directory not found!
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

REM Change to server directory
cd server

REM Check if .env file exists
if not exist ".env" (
    echo [ERROR] .env file not found in server directory!
    echo.
    echo Creating .env file from template...
    if exist "..\.env.example" (
        copy "..\.env.example" ".env"
        echo [OK] .env file created
        echo.
        echo [IMPORTANT] Please edit server\.env and update:
        echo    - DB_PASSWORD (your MySQL root password)
        echo    - Other settings as needed
        echo.
        pause
    ) else (
        echo [ERROR] .env.example not found. Please create server\.env manually
        pause
        exit /b 1
    )
)

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
)

echo.
echo Starting backend server...
echo    The server will automatically:
echo    * Connect to MySQL
echo    * Create database 'portfolio_db' if needed
echo    * Create all required tables
echo    * Start the API server on port 5000
echo.
echo Tip: Keep this window open while using the portfolio
echo.
echo ================================================
echo.

REM Start the server
call npm run dev
