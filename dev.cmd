@echo off
title Excel Date Fixer - Dev Server
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { $ErrorActionPreference='Stop'; npx tauri dev }"
pause
