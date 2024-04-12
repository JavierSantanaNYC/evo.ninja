# PowerShell Script to Initialize SQLite Database

# Define the database file path
$dbFilePath = "/mnt/c/github/evo.ninja/db/PerformanceData.db" # Change to your desired path

# Define the SQL to create the tables
$sql = @"
CREATE TABLE IF NOT EXISTS Processes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS MetricTypes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS PerformanceData (
    timestamp TEXT NOT NULL,
    processId INTEGER,
    metricTypeId INTEGER NOT NULL,
    value REAL,
    FOREIGN KEY(processId) REFERENCES Processes(id),
    FOREIGN KEY(metricTypeId) REFERENCES MetricTypes(id)
);
"@

# Check if the database file exists, if not, create it and initialize tables
if (-Not (Test-Path -Path $dbFilePath))
{
    Write-Host "Database file does not exist. Creating and initializing new database."

    # Run sqlite3 command to create the database and initialize tables
    # Redirecting the SQL to sqlite3 command to create tables
    $sql | bash -c "sqlite3 $dbFilePath"
    
    Write-Host "Database initialized."
}
else
{
    Write-Host "Database file already exists."
}