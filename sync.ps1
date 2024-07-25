$from = "moodle-atto_recitmathlive/src/*"
$to = "shared/recitfad3/lib/editor/atto/plugins/recitmathlive"

try {
    . ("..\sync\watcher.ps1")
}
catch {
    Write-Host "Error while loading sync.ps1 script." 
}