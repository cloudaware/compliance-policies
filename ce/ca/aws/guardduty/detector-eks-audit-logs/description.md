# Description

This policy identifies AWS GuardDuty Detectors that have EKS Audit Log Monitoring disabled. This feature is a part of GuardDuty EKS Protection, which provides specialized threat detection for EKS clusters.

GuardDuty analyzes Kubernetes audit logs from your EKS clusters to detect suspicious activity and potential security threats, such as privilege escalation, use of exposed credentials, or connections from known malicious IP addresses.

## Rationale

Kubernetes audit logs provide a chronological, security-relevant record of actions and events within a cluster. Monitoring these logs is crucial for detecting unauthorized access, suspicious API calls, and other malicious activities that could compromise your containerized applications.

## Impact

Enabling this feature will incur costs based on the volume of EKS audit logs analyzed by GuardDuty.

## Audit

This policy flags an *AWS GuardDuty Detector* as `INCOMPLIANT` if its `Data Sources` contain `Kubernetes Audit Logs Status` set to **DISABLED**.
