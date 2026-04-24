param(
  [string]$OldGrowth = '$29',
  [string]$NewGrowth = '$39',
  [string]$OldScale = '$59',
  [string]$NewScale = '$99'
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$enc = New-Object System.Text.UTF8Encoding($false)

$includeExtensions = @(".html", ".js", ".md", ".liquid", ".txt", ".xml")
$excludeDirMatches = @("\\netlify-public\\", "\\header-backups\\")

$files = Get-ChildItem -Path $root -Recurse -File |
  Where-Object {
    $includeExtensions -contains $_.Extension -and
    ($excludeDirMatches | Where-Object { $_.FullName -match $_ }).Count -eq 0
  }

$updatedFiles = 0

foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName)
  $next = $content.Replace($OldGrowth, $NewGrowth).Replace($OldScale, $NewScale)
  if ($next -ne $content) {
    [System.IO.File]::WriteAllText($file.FullName, $next, $enc)
    $updatedFiles += 1
  }
}

Write-Host "Updated blueprint price references in $updatedFiles file(s)."
