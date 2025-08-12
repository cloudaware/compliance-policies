---
title: repo-manager
---
# repo-manager

`repo-manager` is a tool that helps users manage their Compliance Engine repository, communicate with Cloudaware API, build documentation, etc.

Read full [cli reference](cli.md) or execute `repo-manager --help`.

## Requirements

The only requirement to run `repo-manager` is to have Java 8+ installed. We recommend installing the latest LTE version of Java.

If `java`/`java.exe` executable is not in your `PATH`, use the full path to the executable in all commands listed in this document.

## Installation

The latest version of `repo-manager` is always available via this link <https://ce.prod.cloudaware.com/repo-manager/repo-manager.jar>

`repo-manager` is distributed via a single `jar` file. With a little bit of configuration you can make `repo-manager` callable with a simpler alias from CLI. Depending on the operating system you run:

### Windows

1. Create and navigate to directory `C:\Users\{username}\.ca`
2. Download and store [`repo-manager.jar`](https://ce.prod.cloudaware.com/repo-manager/repo-manager.jar) in the crated directory
3. Create `repo-manager.bat` with the following content:

   ```shell
   @echo off
   java -jar "%HOMEDRIVE%%HOMEPATH%\.ca\repo-manager.jar" %*
   ```

4. Add `C:\Users\{username}\.ca` to PATH with a following PowerShell command:

   ```shell
   [Environment]::SetEnvironmentVariable("PATH", $env:Path + ";" + $env:HOMEDRIVE + $env:HOMEPATH + "\.ca", "User")
   ```

5. Restart your shell

Now you can run `repo-manager` command in any directory on your machine.

### Linux

TODO

### macOS

TODO

## Configuration files

There are several important files that `repo-manager` uses to operate:

- `repo-manager.jar` - main executable, usually located in `~/.ca/repo-manager.jar`
- `repo-manager.json` - configuration file, that will be automatically created in the same folder where `repo-manager.jar` is located
- `.ca` directory is a directory where `repo-manager` will look for configuration files, specifically `profiles.json` for API authentication. `repo-manager` will look for this file in the following locations, in order of decreasing priority:
  - If `--config=/exmple/path/my-ca` option used, `repo-manager` will look for `profiles.json` in `/exmple/path/my-ca/profiles.json`
  - If `--repository=/example/path/to/repo` option used, then `/example/path/to/repo/.ca/profiles.json`
  - If `.ca` directory present in you current working directory, then `.ca/profiles.json`
  - Otherwise `~/.ca/profiles.json` will be used

## Auto-update

While using `repo-manager` it will periodically try to update itself. It is important to keep functionality of `repo-manager` consistent with the latest Cloudaware APIs and the latest logic implemented in `repo-manager` itself.

You can alter auto-update behavior by using the following options when running commands:

- `--auto-update` will trigger auto-update check immediately; you can use it in conjunction with other subcommands, e.g. `repo-manager --auto-update gocs generate`
- `--no-auto-update` will suppress the auto-update check for this execution. If you're using multiple `repo-manager` commands in succession and would like auto-update to be suppressed for all of them, you need to add `--no-auto-update` to all of them
- *no options* will trigger auto-update check if more than 24 hours have passed since the last check
