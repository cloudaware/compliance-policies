# Function to find the first non-option argument (the command)
function Get-Command {
    foreach ($arg in $args) {
        if ($arg -notmatch '^[-/]') {
            return $arg
        }
    }
    return $null
}

# Get the primary command from the arguments
$command = Get-Command $args

# Decide which Java executable to use
if ($command -eq "ui") {
    $javaExe = "javaw"
} else {
    $javaExe = "java"
}

# Run the Java application with all original arguments
& $javaExe -jar "repo-manager.jar" $args