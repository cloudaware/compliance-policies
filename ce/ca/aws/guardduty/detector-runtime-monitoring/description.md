# Description

This policy identifies AWS GuardDuty Detectors that do not have Runtime Monitoring enabled.

Runtime Monitoring observes and analyzes operating system–level, networking, and file events to help detect potential security threats within your AWS workloads.

## Rationale

GuardDuty Runtime Monitoring provides visibility into the runtime behavior of your Amazon EC2, Amazon ECS, and Amazon EKS workloads. By analyzing host-level activity, GuardDuty can detect threats such as malware, credential compromise, and other malicious actions that may not be visible through network-based analysis alone.

## Impact

GuardDuty Runtime Monitoring pricing is based on the number and size of protected workloads, measured in virtual CPUs (vCPUs).

## Audit

This policy flags an *AWS GuardDuty Detector* as `INCOMPLIANT` if the **RUNTIME_MONITORING** `Feature` is set to **DISABLED** or **EKS_RUNTIME_MONITORING** is set to **ENABLED**.

GuardDuty recommends migrating from **EKS Runtime Monitoring** to **Runtime Monitoring** and using it to monitor your Amazon EKS clusters for improved threat detection and unified coverage.
