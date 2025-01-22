Set-Location $PSScriptRoot
$installDir = "C:\Program Files\ai-agent"
if (!(Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force
}

if (!(Test-Path "$installDir\nvm")) {
    Copy-Item $PSScriptRoot\nvm $installDir\nvm -Recurse -Container
}

if (!(Test-Path "$installDir\build")) {
    Copy-Item $PSScriptRoot\buildDir $installDir\build -Recurse -Container
}

Set-Location $installDir\nvm
$nvmInstall = "$installDir\nvm\install.cmd"

if (Test-Path $nvmInstall) {
    cmd /c  $nvmInstall
}

if (Test-Path "$installDir\nvm\settings.txt") {
    [System.Environment]::SetEnvironmentVariable("NVM_SYMLINK", "C:\Program Files\nodejs", [System.EnvironmentVariableTarget]::Machine)
    [System.Environment]::SetEnvironmentVariable("NVM_PATH", "$installDir\nvm", [System.EnvironmentVariableTarget]::Machine)
    [System.Environment]::SetEnvironmentVariable("NVM_HOME", "$installDir\nvm", [System.EnvironmentVariableTarget]::Machine)
    cmd /c "$installDir\nvm\nvm.exe" install 20.12.2
    cmd /c "$installDir\nvm\nvm.exe" use 20.12.2
}

