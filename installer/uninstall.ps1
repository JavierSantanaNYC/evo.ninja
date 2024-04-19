Set-Location $PSScriptRoot
$installDir = "C:\Program Files\ai-agent"
if (Test-Path $installDir) {
    Remove-Item -Path $installDir -Recurse -Force
}