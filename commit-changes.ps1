# Script pentru a adăuga și comite toate modificările
Write-Host "Verificare modificări..." -ForegroundColor Yellow
git add -A --force
git status

$status = git status --porcelain
if ($status) {
    Write-Host "`nModificări găsite! Doriți să le comiteți? (y/n)" -ForegroundColor Green
    $response = Read-Host
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Host "Introduceți mesajul commit-ului:" -ForegroundColor Yellow
        $message = Read-Host
        if ($message) {
            git commit -m $message
            Write-Host "`nCommit creat cu succes!" -ForegroundColor Green
            Write-Host "Pentru a pusha, rulați: git push" -ForegroundColor Cyan
        } else {
            Write-Host "Commit anulat - nu ați introdus mesaj." -ForegroundColor Red
        }
    }
} else {
    Write-Host "Nu există modificări de comitat." -ForegroundColor Yellow
}

