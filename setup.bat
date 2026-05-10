@echo off
REM Bento Statistics Calculator - Project Setup
REM Creates directory structure and organizes files

echo Creating directory structure...

REM Create src directories
mkdir src\components\visualizations 2>nul
mkdir src\lib 2>nul
mkdir public 2>nul

echo Directories created successfully!
echo.
echo Next steps:
echo 1. npm install
echo 2. npm start
echo.
echo Files are ready to use!
pause
