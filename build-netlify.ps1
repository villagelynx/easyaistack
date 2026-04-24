$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$publishDir = Join-Path $projectRoot "netlify-public"

$includeFiles = @(
  "*.html",
  "*.js",
  "*.css",
  "*.svg",
  "*.txt",
  "*.xml"
)

$excludeNames = @(
  "plan-fulfillment.html",
  "plan-fulfillment.js"
)

if (Test-Path $publishDir) {
  Remove-Item -LiteralPath $publishDir -Recurse -Force
}

New-Item -ItemType Directory -Path $publishDir | Out-Null

foreach ($pattern in $includeFiles) {
  Get-ChildItem -Path $projectRoot -Filter $pattern -File |
    Where-Object { $excludeNames -notcontains $_.Name } |
    ForEach-Object {
      Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $publishDir $_.Name)
    }
}

Write-Host "Netlify publish folder rebuilt at $publishDir"

