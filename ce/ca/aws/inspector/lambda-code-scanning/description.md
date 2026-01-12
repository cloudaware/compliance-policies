# Description

This policy identifies AWS accounts where Amazon Inspector Lambda **Code Scanning** is not enabled.

Amazon Inspector provides two scanning modes for AWS Lambda functions: **Standard Scanning**, which analyzes function dependencies, and **Code Scanning**, which performs static analysis on custom application code. This policy ensures that the Lambda Code Scanning capability is enabled to detect vulnerabilities within function source code.

## Rationale

Enabling Amazon Inspector Lambda Code Scanning provides the following benefits:

1. **Static Application Security Testing (SAST)**: Automatically analyzes Python, Java, and Node.js function code to identify security vulnerabilities.
2. **Detection of Insecure Coding Patterns**: Identifies common weaknesses such as improper input validation, cross-site scripting (XSS), and path injection.
3. **Hardcoded Secret Detection**: Detects embedded sensitive information, including API keys, tokens, and database credentials.
4. **Shift-Left Security**: Continuously evaluates deployed code, enabling early identification of newly introduced risks or vulnerabilities as scanning rules evolve.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if `Inspector: Lambda Code Status` or `Inspector: Status` is not set to **Enabled** for the account.
