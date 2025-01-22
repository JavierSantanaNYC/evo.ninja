$directories = @(
    "apps\cli",
    "packages",
    "scripts",
    "sessions"
)

$files = @(
    ".\.env",
    ".\.eslintrc.js",
    ".\.prettierrc",
    ".\evo-ninja.code-workspace",
    ".\jest.config.js",
    ".\package.json",
    ".\tsconfig.json",
    ".\run",
    ".\turbo.json"
)


If(Test-Path ".\buildDir") {
    Remove-Item -Path ".\buildDir" -Recurse -Force
    New-Item -ItemType Directory -Path ".\buildDir"
}
$directories | ForEach-Object {
    Copy-Item -Path ".\$_" -Destination ".\buildDir\$_" -Recurse -Container
}

$files | ForEach-Object {
    Copy-Item -Path $_ -Destination ".\buildDir"
}

Copy-Item .\buildDir -Destination .\installer\ -Recurse -Container