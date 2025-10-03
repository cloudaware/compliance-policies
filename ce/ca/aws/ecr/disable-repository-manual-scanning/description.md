# Description

This policy identifies AWS ECR Repositories configured with manual vulnerability scanning. To ensure automated timely detection of security vulnerabilities, it is recommended to enable either **Scan on Push** or **Continuous Scanning**.

## Rationale

Automated vulnerability scanning is a critical security control in containerized environments. By scanning images immediately when they are pushed to the registry, security flaws can be detected and remediated early in the development lifecycle. This reduces the likelihood of vulnerable images being deployed to production.

## Impact

Relying on manual scanning increases the risk of deploying container images with known vulnerabilities. If exploited, these flaws could result in security breaches, data exposure, or compromise of systems running the affected containers.

## Audit

This policy flags an *AWS ECR Repository* as `INCOMPLIANT` if the `Scanning Configuration Rules JSON` of the associated *ECR Registry* does not include any **rules** enabling either **Scan on Push** or **Enhanced Scanning**, indicating that only manual scanning is configured.
