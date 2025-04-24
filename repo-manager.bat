@echo off
setlocal enabledelayedexpansion
set "command="
:loop
if "%~1" == "" goto :done
set "arg=%~1"
if "!arg:~0,1!" == "-" (
    rem Check if it's -option=value
    for /f "tokens=1,2 delims==" %%a in ("!arg!") do (
        if "%%b" == "" (
            rem It's -option, skip next argument if it exists
            shift
            if not "%~1" == "" shift
        ) else (
            rem It's -option=value, shift once
            shift
        )
    )
) else (
    if not defined command (
        set "command=%~1"
    )
    shift
)
goto :loop
:done
if "!command!" == "ui" (
    javaw -jar "repo-manager.jar" %*
) else (
    java -jar "repo-manager.jar" %*
)
endlocal