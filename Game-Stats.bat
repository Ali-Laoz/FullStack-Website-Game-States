@echo off
chcp 65001 > nul
D:
cd "Youre diractory the main diractory that has server.js"
set url="http://localhost:3000/"
start firefox.exe %url%
node server.js
pause