# Description

This policy identifies AWS accounts where Amazon ECR scanning is not enabled.

Amazon Inspector integrates with Amazon ECR to automate container image security. It provides continuous vulnerability scanning by analyzing images when they are pushed to ECR and re-scanning them whenever new Common Vulnerabilities and Exposures (CVE) data becomes available.

## Rationale

Enabling Amazon Inspector for ECR provides the following benefits:

1. **Continuous Assessment**: Unlike traditional scan on push, which is a one-time event, Amazon Inspector continuously monitors container images stored in ECR for newly disclosed vulnerabilities throughout their retention period.
2. **Automated Risk Prioritization**: Amazon Inspector assigns contextualized risk scores, enabling security teams to prioritize remediation efforts based on the severity and exploitability of vulnerabilities.
3. **CI/CD Integration**: Automated vulnerability discovery helps prevent insecure container images from being promoted through CI/CD pipelines and deployed into production environments.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if `Inspector: ECR Status` or `Inspector: Status` is not set to **Enabled** for the account.
