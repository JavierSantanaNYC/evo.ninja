# PowerShell Script to Import CSV Data into SQLite Database

# Define the paths
$csvFilePath = "C:\github\evo.ninja\db\perf01087.csv" # Change to your CSV file path
$dbFilePath = "/mnt/c/github/evo.ninja/db/PerformanceData.db" # Change to your SQLite database path

# Read the CSV file using Import-Csv
$data = Import-Csv -Path $csvFilePath
# Start building the SQL script with the beginning of the transaction
$sqlScript = "BEGIN TRANSACTION;`n"

foreach ($row in $data) {
    $timestamp = $row.PSObject.Properties.Value[0]
    Write-Host "Processing data for timestamp: $timestamp"
    foreach ($column in $row.PSObject.Properties | Where-Object {$_.Name -ne $row.PSObject.Properties.Name[0]}) {
        $metricName = $column.Name -replace "'", "''" # Escaping single quotes
        $value = $column.Value
        
        # For simplicity in this example, assume metric IDs are managed elsewhere
        # and focus on constructing the bulk insert SQL
        $sqlScript += "INSERT INTO PerformanceData (timestamp, metricTypeId, value) VALUES ('$timestamp', (SELECT id FROM MetricTypes WHERE name = '$metricName'), '$value');`n"
    }
    Write-Host "Data processed for timestamp: $timestamp"
}

# End the transaction
$sqlScript += "COMMIT;"

# Save the SQL script to a temporary file
$tempFile = "C:\github\evo.ninja\db\perf.tmp"
$tempfilewsl = "/mnt/c/github/evo.ninja/db/perf.tmp"
[System.IO.File]::WriteAllText($tempFile, $sqlScript)

# Execute the SQL script using sqlite3
bash -c "sqlite3 $dbFilePath < `"$tempfilewsl`""

# Cleanup the temporary file
#Remove-Item $tempFile

Write-Host "Data import is complete."