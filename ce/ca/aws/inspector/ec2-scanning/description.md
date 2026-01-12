# Description

This policy identifies AWS accounts where Amazon EC2 scanning is not enabled.

Amazon Inspector is a vulnerability discovery service that automates continuous security assessments for Amazon EC2 instances. It helps identify software vulnerabilities (CVEs) and unintended network exposure, enabling organizations to proactively manage security risks.

## Rationale

Enabling Amazon Inspector for EC2 provides the following benefits:

1. **Automated Discovery**: Automatically detects newly launched EC2 instances and initiates vulnerability scans without manual intervention.
2. **Near Real-Time Intelligence**: Triggers scans based on environmental changes, such as new software installations or newly disclosed CVEs.
3. **Risk-Based Prioritization**: Delivers contextual risk scores by correlating vulnerability data with factors such as network exposure and instance configuration.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if `Inspector: EC2 Status` or `Inspector: Status` is not set to Enabled for the Account.
