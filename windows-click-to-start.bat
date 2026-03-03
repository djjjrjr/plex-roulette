@echo off
cd /d "%~dp0"
start "" http://localhost:7777/index.html
python -m http.server 7777
