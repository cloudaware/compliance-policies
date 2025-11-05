# Description

This policy identifies Google GCE Firewall Rules that do not have logging enabled. Enabling firewall rule logging allows you to audit, verify, and analyze the effects of your firewall rules within Google Cloud VPC networks.

## Rationale

Firewall rule logging provides visibility into the network traffic that is allowed or denied by your firewall rules. Capturing these logs is critical for security auditing, monitoring unauthorized access attempts, and troubleshooting connectivity issues. Without logging, it becomes difficult to perform forensic analysis during security incidents or to validate that firewall rules are functioning as intended.

## Impact

Enabling logging may result in additional costs for log storage and processing within Cloud Logging.

## Audit

This policy flags a *Google GCE Firewall Rule* as `INCOMPLIANT` if its `Log State` is set to **Disabled**.
