@echo off
cd /d "%~dp0"
start "" http://localhost:7777/plex-randomizer.html
python -m http.server 7777
