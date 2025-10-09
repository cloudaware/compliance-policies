# Description

This policy identifies whether AWS GuardDuty is enabled in all active AWS regions for an account.

AWS GuardDuty is a threat detection service that continuously monitors AWS accounts and workloads for malicious or unauthorized activity, providing detailed security findings to support timely remediation.

## Rationale

Enabling GuardDuty in all regions is a security best practice. Adversaries may exploit unused or unmonitored regions to launch resources or conduct malicious activities undetected. Enabling GuardDuty across all regions ensures comprehensive visibility and consistent threat detection, reducing the risk of security blind spots.

## Impact

If GuardDuty is not enabled in all regions, critical security findings—such as indicators of unauthorized access, compromised instances, or reconnaissance attempts, may be missed in unmonitored regions. This can delay incident response and increase the impact of potential breaches.

Enabling GuardDuty in all regions incurs costs based on the volume of AWS CloudTrail events, VPC Flow Logs, and DNS query logs analyzed.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if the number of enabled *GuardDuty Detectors* does not match the number of active regions in the account.
