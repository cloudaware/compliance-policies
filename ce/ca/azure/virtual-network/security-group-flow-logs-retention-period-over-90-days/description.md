# Description

Network Security Group Flow Logs should be enabled and the retention period set to greater than or equal to 90 days.

**Retirement Notice**
On September 30, 2027, network security group (NSG) flow logs will be retired. Starting June 30, 2025, it will no longer be possible to create new NSG flow logs. Azure recommends migrating to virtual network flow logs.
Review <https://azure.microsoft.com/en-gb/updates?id=Azure-NSG-flow-logs-Retirement> for more information.
For virtual network flow logs, consider applying the recommendation `Ensure that virtual network flow log retention days is set to greater than or equal to 90` in this section.

## Rationale

Flow logs enable capturing information about IP traffic flowing in and out of network security groups. Logs can be used to check for anomalies and give insight into suspected breaches.

## Impact

This will keep IP traffic logs for longer than 90 days. As a level 2, first determine your need to retain data, then apply your selection here. As this is data stored for longer, your monthly storage costs will increase depending on your data use.

## Audit

This policy marks an *Azure Network Security Group* as `INCOMPLIANT` if any of the following conditions are met:

- `Flow Logs Enabled` is set to **false**.
- `Flow Logs Retention Policy Enabled` is set to **false**.
- `Flow Logs Retention Policy Days` is configured to fewer than **90** days.

## Default Value

By default, Network Security Group Flow Logs are `disabled`.

## References

1. <https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-overview>
2. <https://docs.microsoft.com/en-us/cli/azure/network/watcher/flow-log?view=azure-cli-latest>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-6-configure-log-storage-retention>
