# Description

EKS control plane logging enables the delivery of audit and diagnostic logs directly from the EKS control plane to Amazon CloudWatch Logs within your account. The following log types are available:

- **API Server** - Includes logs that capture API server flags used during the server’s startup.
- **Audit** - Kubernetes audit logs capturing actions performed by users, administrators, or system components that affect your cluster.
- **Authenticator** - Specific to Amazon EKS, these logs capture the control plane’s authentication activity using IAM credentials for Kubernetes RBAC.
- **Controller Manager** - Logs from the component responsible for running core control loops that regulate cluster state.
- **Scheduler** - Captures events from the scheduler, which determines placement and scheduling of Pods within the cluster.

## Rational

Enabling EKS control plane logging is essential for security auditing, regulatory compliance, and operational diagnostics. These logs offer visibility into key events and system behavior, allowing you to detect unauthorized access, trace configuration changes, identify performance issues, and respond to incidents. Without them, understanding who made changes, when they occurred, and their impact becomes significantly more challenging, resulting in critical blind spots.

## Impact

Enabling control plane logging may incur additional costs due to CloudWatch usage.

## Audit

This policy marks an *AWS EKS Cluster* as `INCOMPLIANT` if `Logging` field contains any of the following log types set to **Disabled**: `api`, `audit`, `authenticator`, `controllerManager`, `scheduler`.
