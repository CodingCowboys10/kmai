@echo off
setlocal

REM Imposta l'indirizzo IP e il nome host MinIO
set "minioIPAddress=127.0.0.1"  REM Sostituisci con l'indirizzo IP reale di MinIO
set "minioHostName=minio" REM Sostituisci con il nome host reale di MinIO

REM Percorso del file hosts di Windows
set "hostsFile=%SystemRoot%\System32\drivers\etc\hosts"

REM Aggiungi l'entry per MinIO al file hosts
echo %minioIPAddress%  %minioHostName% >> "%hostsFile%"

echo Host MinIO aggiunto al file hosts.

endlocal
