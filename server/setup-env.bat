@echo off
echo ========================================
echo Smart Parking Email Server Setup
echo ========================================
echo.

REM Check if .env exists
if exist .env (
    echo .env file already exists!
    echo.
    choice /C YN /M "Do you want to overwrite it"
    if errorlevel 2 goto :end
)

REM Copy .env.example to .env
copy .env.example .env

echo.
echo .env file created successfully!
echo.
echo Please edit .env file and add your email credentials:
echo 1. Open .env in a text editor
echo 2. Replace 'your-email@gmail.com' with your actual email
echo 3. Replace 'your-app-password' with your Gmail App Password
echo.
echo For Gmail App Password:
echo - Go to: https://myaccount.google.com/apppasswords
echo - Generate a new App Password
echo - Copy and paste it in .env
echo.
pause

:end
