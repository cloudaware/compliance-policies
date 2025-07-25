# Description

Ensure that virtual network flow logs are retained for greater than or equal to 90 days.

## Rationale

Virtual network flow logs provide critical visibility into traffic patterns. Logs can be used to check for anomalies and give insight into suspected breaches.

## Impact

- Virtual network flow logs are charged per gigabyte of network flow logs collected and come with a free tier of 5 GB/month per subscription.
- If traffic analytics is enabled with virtual network flow logs, traffic analytics pricing applies at per gigabyte processing rates.
- The storage of logs is charged separately, and the cost will depend on the amount of logs and the retention period.

## Audit

This policy flags an *Azure Network Watcher Flow Log* for Virtual Networks as `INCOMPLIANT` if any of these conditions are true:

- `Retention Policy Status` is not set **to Enabled**.
- `Retention Policy Days` is less than **90** days and not equal to **0** (unlimited).

A *Flow Log* is marked as `INAPPLICABLE` if either:

- `Log Status` is not set **to Enabled**.
- The *Flow Log* is not associated with a `Virtual Network`.

## Default Value

When a virtual network flow log is created using the Azure CLI, retention days is set to 0 by default. When creating via the Azure Portal, retention days must be specified by the creator.

## References

1. <https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-portal>
2. <https://learn.microsoft.com/en-us/cli/azure/network/watcher/flow-log>

## Additional Information

As network security group flow logs are on the retirement path, Azure recommends migrating to virtual network flow logs.
