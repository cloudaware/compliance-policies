# Remediation

Connect Microsoft Defender for Cloud to a SIEM such as Microsoft Sentinel or another log analytics solution.

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, click `Environment Settings`.
3. Expand the Tenant Root Group(s) to reveal subscriptions.

For each subscription listed:

1. Click the subscription name to open the `Defender Plans` settings
2. In the settings on the left, click `Continuous Export`
3. Select either `Event Hub, Log Analytics Workspace`, or both depending on your environment.
4. Set `Export enabled` to `On`
5. Under Exported data types, ensure that **at least** `Security Alerts (Medium and High)` is checked.
6. Under Export target, set the target Event Hub or Log Analytics Workspace which is tied to a SIEM that is configured to monitor and alert for security alerts.

Ensure security alerts are included in the security operations workflow and incident response plan.
