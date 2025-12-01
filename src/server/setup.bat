@echo off
:: Portfolio Backend Setup Script (Windows)
:: Author: Sandeep Rammilan Gupta

echo ========================================
echo    Portfolio Backend Setup
echo ========================================
echo.

:: Check Node.js installation
echo Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
) else (
    echo [OK] Node.js is installed
    node -v
)

:: Check npm installation
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed!
    pause
    exit /b 1
) else (
    echo [OK] npm is installed
    npm -v
)

echo.
echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
) else (
    echo [OK] Dependencies installed successfully
)

:: Create .env file
echo.
if not exist ".env" (
    echo Creating .env file...
    copy ..\.env.example .env
    echo [OK] .env file created
    echo [WARNING] Please update the .env file with your MySQL credentials
) else (
    echo [WARNING] .env file already exists
)

:: Summary
echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Update the .env file with your MySQL credentials
echo 2. Create the database using MySQL Workbench or command line:
echo    mysql -u root -p ^< database\schema.sql
echo 3. Run 'npm run dev' to start the development server
echo 4. Test the API at http://localhost:5000/api/health
echo.
echo Happy coding! 
echo.
pause
