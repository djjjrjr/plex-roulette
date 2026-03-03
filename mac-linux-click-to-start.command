#!/bin/bash
DIR=$(cd $(dirname $0) && pwd)
cd $DIR
if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server 7777 &
elif command -v python >/dev/null 2>&1; then
  python -m SimpleHTTPServer 7777 &
else
  echo Python not found. Please install from python.org
  exit 1
fi
sleep 0.8
open http://localhost:7777/index.html 2>/dev/null || xdg-open http://localhost:7777/index.html 2>/dev/null
echo Plex Roulette is running. Close this window to stop.
wait
