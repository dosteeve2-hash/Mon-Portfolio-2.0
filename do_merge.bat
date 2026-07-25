@echo off
chcp 65001 > nul
cd /d "C:\Users\pc\Documents\GitHub\steeve-portfolio"

echo ============================================
echo  MERGE feat/projects-contact-0629 -> master
echo ============================================
echo.

echo [1/5] Branche actuelle :
git branch
echo.

echo [2/5] Checkout master...
git checkout master
if %errorlevel% neq 0 (
  echo ERREUR : checkout master a echoue
  pause
  exit /b 1
)
echo.

echo [3/5] Merge de la branche feat...
git merge feat/projects-contact-0629 --no-ff ^
  -m "feat: photo portrait + CV turc + liens sociaux" ^
  -m "- Photo portrait professionnelle SDC (steve-portrait.jpg)" ^
  -m "- CV PDF turc avec bouton telechargement dore" ^
  -m "- Liens LinkedIn et Instagram mis a jour dans Contact.tsx" ^
  -m "Co-authored-by: Claude <claude@anthropic.com>"
if %errorlevel% neq 0 (
  echo ERREUR : merge a echoue - verifie les conflits
  pause
  exit /b 1
)
echo.

echo [4/5] Hash du commit de merge :
git log --oneline -1
echo.

echo [5/5] Push vers origin/master...
git push origin master
if %errorlevel% neq 0 (
  echo ERREUR : push a echoue
  pause
  exit /b 1
)
echo.
echo ============================================
echo  SUCCES ! Vercel va deployer automatiquement.
echo ============================================
echo.
echo Hash du commit de merge :
git log --oneline -1
echo.
pause
