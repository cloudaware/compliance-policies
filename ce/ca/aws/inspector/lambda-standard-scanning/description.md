# Description

This policy identifies AWS accounts where Amazon Inspector Lambda **Standard Scanning** is not enabled.

Amazon Inspector provides automated vulnerability management for AWS Lambda functions. The **Standard Scanning** capability focuses on detecting vulnerabilities in application dependencies, including third-party libraries and packages bundled within Lambda function code or referenced through attached Lambda layers.

## Rationale

Enabling Amazon Inspector Lambda Standard Scanning provides the following benefits:

1. **Dependency Analysis**: Scans software packages (such as npm, pip, and Maven dependencies) for known Common Vulnerabilities and Exposures (CVEs).
2. **Lambda Layer Coverage**: Evaluates AWS Lambda layers associated with functions to identify vulnerable components.
3. **Continuous Monitoring**: Automatically re-scans functions when code changes occur or when new vulnerabilities are added to the Inspector vulnerability database.
4. **Contextual Risk Prioritization**: Ranks findings based on environmental and configuration context within the serverless runtime.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if `Inspector: Lambda Status` or `Inspector: Status` is not set to **Enabled** for the account.
