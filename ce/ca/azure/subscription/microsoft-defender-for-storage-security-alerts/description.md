# Description

After enabling Microsoft Defender for Storage, configure an alert monitoring and response process to ensure that alerts are actioned in a timely manner. Integrate with SIEM solutions like Microsoft Sentinel, or configure email/webhook notifications to security teams.

## Rationale

Enabling Microsoft Defender for Storage without a monitoring process limits its value. Continuous monitoring and alert triage ensure that detected threats are acted upon quickly, reducing risk exposure.

## Impact

Requires integration effort with SIEM or alerting tools and a defined incident response process.

The amount of data logged and, thus, the cost incurred can vary significantly depending on the tenant size and the applications in your tenant that interact with the Microsoft Graph APIs.

See the following pricing calculations for respective services:

- Log Analytics: <https://learn.microsoft.com/en-us/azure/azure-monitor/logs/cost-logs#pricing-model>.
- Azure Storage: <https://azure.microsoft.com/en-us/pricing/details/storage/blobs/>.
- Event Hubs: <https://azure.microsoft.com/en-us/pricing/details/event-hubs/>.

## Audit

### From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, click `Environment Settings`.
3. Expand the Tenant Root Group(s) to reveal subscriptions.

For each subscription listed:

1. Click the subscription name to open the `Defender Plans` settings
2. In the settings on the left, click `Continuous Export`

Ensure that `Export enabled` is set to `On` and delivering **at least** `Security Alerts (Medium and High)` to an Event Hub or Log Analytics Workspace which is tied to a SIEM that is configured to monitor and alert for security alerts.

## Default Value

By default, continuous export is `off`.

## References

1. <https://learn.microsoft.com/azure/defender-for-cloud/alerts-overview>
2. <https://learn.microsoft.com/azure/sentinel/connect-defender-for-cloud>
3. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/continuous-export>
