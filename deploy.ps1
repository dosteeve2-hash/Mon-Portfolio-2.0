#!/usr/bin/env pwsh
# FORGE Afrika — Deploy script
# Run this in PowerShell from the repo root

Set-Location "C:\Users\pc\Documents\GitHub\steeve-portfolio"

Write-Host "`n=== Branch ===" -ForegroundColor Cyan
git branch --show-current

Write-Host "`n=== TypeScript check ===" -ForegroundColor Cyan
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) { Write-Error "TypeScript errors found — fix before committing."; exit 1 }

Write-Host "`n=== Build ===" -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed — fix errors before committing."; exit 1 }

Write-Host "`n=== Commit + Push ===" -ForegroundColor Cyan
git add -A
git commit -m "fix: SEO og:image + aria-labels navbar + GSAP ctx.revert() + contact page <250L"
git push origin feat/design-upgrade-v2

Write-Host "`n=== Done ===" -ForegroundColor Green
