# Description

Ensure that AWS VPC Transit Gateways are not configured to automatically accept cross-account VPC attachments. This requires that all cross-account attachment requests be manually reviewed and approved.

## Rationale

Disabling the auto-accept feature enforces administrative control over which external AWS accounts can connect their VPCs to the central transit gateway. Each request must be explicitly reviewed and approved by a network administrator, reducing the risk of unauthorized or accidental attachments from untrusted environments.

## Impact

If auto-accept is enabled, an untrusted or compromised AWS account could attach a malicious VPC to your core network. This may result in:

- Unauthorized access to internal resources.
- Lateral movement across your environment.
- Data exfiltration.
- Denial-of-service attacks against shared services.

## Audit

This policy flags an *AWS VPC Transit Gateway* as `INCOMPLIANT` if `Auto Accept Shared Attachments` field is set to **enable**.
