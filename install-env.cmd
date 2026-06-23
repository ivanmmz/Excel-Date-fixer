@echo off
title Excel Date Fixer - Environment Setup
cd /d "%~dp0"

echo ============================================
echo   Excel Date Fixer Pro - Environment Setup
echo ============================================
echo.

:: Check Node.js
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js found:
    node -v
    echo.
) else (
    echo [!] Node.js NOT found.
    echo     Attempting to install via winget...
    echo.
    winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] winget install failed.
        echo         Please install Node.js manually:
        echo         https://nodejs.org/dist/v20.15.0/node-v20.15.0-x64.msi
        echo.
        echo         After install, close this window and run dev.cmd again.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Node.js installed. Please CLOSE and REOPEN this window, then run dev.cmd
    pause
    exit /b 0
)

:: Check Rust
where cargo >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Rust found:
    cargo --version
    echo.
) else (
    echo [!] Rust NOT found.
    echo     Attempting to install rustup via winget...
    echo.
    winget install Rustlang.Rustup --accept-source-agreements --accept-package-agreements
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] winget install failed.
        echo         Please install Rust manually:
        echo         https://rustup.rs/
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Rust installed. Please CLOSE and REOPEN this window, then run dev.cmd
    pause
    exit /b 0
)

:: All good - install npm dependencies
echo [OK] All prerequisites found. Installing npm dependencies...
echo.
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   Setup complete! Run dev.cmd to start.
echo ============================================
pause