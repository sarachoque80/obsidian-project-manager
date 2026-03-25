@echo off
echo ================================================
echo CREANDO REPOSITORIO GITHUB
echo ================================================
echo.
echo Necesitas loguearte en GitHub en tu navegador antes...
echo.
echo Abriendo GitHub para crear repositorio...
start https://github.com/new
echo.
echo ================================================
echo INSTRUCCIONES:
echo ================================================
echo.
echo 1. En GitHub que se abrira, configura:
echo    - Repository name: obsidian-direct-response-pm
echo    - Description: Complete project management plugin for direct response marketing
echo    - Marca como PUBLIC
echo    - NO agregues README, .gitignore, ni License (ya existen)
echo.
echo 2. Click en "Create repository"
echo.
echo 3. Cuando termine, PRESIONA ENTER aqui para continuar...
pause
echo.
echo ================================================
echo SUBIENDO CODIGO A GITHUB
echo ================================================
echo.
cd "C:\Users\User\Downloads\01_PROJECTS\antigravity\antigravity proyectos\aios copy seniors\proyectos\obsidian-project-manager"
git remote add origin https://github.com/antigravity/obsidian-direct-response-pm.git
git branch -M main
git push -u origin main
echo.
echo ================================================
echo SUBIDO CORRECTAMENTE!
echo ================================================
echo.
echo Link del repositorio:
echo https://github.com/antigravity/obsidian-direct-response-pm
echo.
echo Ahora puedes usarlo con BRAT en Obsidian!
pause
