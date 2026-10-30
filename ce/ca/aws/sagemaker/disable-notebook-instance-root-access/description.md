# Description

This policy identifies AWS SageMaker Notebook Instances that have **Root Access** enabled. When root access is enabled, notebook users are granted administrative privileges, allowing unrestricted access to the underlying operating system and file system.

## Rationale

By default, SageMaker notebook instances allow root access. While this can be convenient, it introduces increased security risk for the following reasons:

1. Users can install unauthorized software or modify system-level configurations.
2. If a notebook user's credentials or session are compromised, an attacker could gain full administrative control over the instance.
3. Root access can be used to bypass security controls or interfere with monitoring and logging mechanisms.

Disabling root access enforces the principle of **least privilege**, ensuring users have only the permissions required to perform their data science tasks.

## Impact

When root access is disabled, users cannot execute commands that require `sudo`. This may limit the ability to install system-level packages interactively. To address this, use **Lifecycle Configurations** to perform approved system setup and package installations in a controlled manner.

## Audit

This policy flags an *AWS SageMaker Notebook Instance* as `INCOMPLIANT` when the `Root Access` field is set to **Enabled**.

*Notebook Instances* that are not in the **InService** `State` are marked as `INAPPLICABLE`.
