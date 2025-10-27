@echo off
echo ========================================
echo Starting Smart Parking Application
echo ========================================
echo.

REM Check if node_modules exists in server
if not exist "server\node_modules" (
    echo Installing server dependencies...
    cd server
    call npm install
    cd ..
    echo.
)

REM Check if .env exists in server
if not exist "server\.env" (
    echo WARNING: server\.env file not found!
    echo Please run server\setup-env.bat first
    echo.
    pause
    exit /b 1
)

echo Starting Email Server...
start "Email Server" cmd /k "cd server && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Application...
start "Smart Parking Frontend" cmd /k "npm start"

echo.
echo ========================================
echo Both servers are starting...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Email Server: http://localhost:3001
echo.
echo Press any key to close this window
echo (Servers will continue running in separate windows)
pause > nul
