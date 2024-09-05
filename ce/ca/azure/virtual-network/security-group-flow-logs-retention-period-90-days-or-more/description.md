# Description

Network Security Group Flow Logs should be enabled and the retention period set to greater than or equal to 90 days.

## Rationale

Flow logs enable capturing information about IP traffic flowing in and out of network security groups. Logs can be used to check for anomalies and give insight into suspected breaches.

## Impact

This will keep IP traffic logs for longer than 90 days. As a level 2, first determine your need to retain data, then apply your selection here. As this is data stored for longer, your monthly storage costs will increase depending on your data use.

## Audit

### From Azure Portal

1. Go to `Network Watcher`.
2. Select `NSG flow logs` blade in the Logs section.
3. Select each Network Security Group from the list.
4. Ensure `Status` is set to `On`.
5. Ensure `Retention (days)` setting `greater than 90 days`.

### From Azure CLI

```sh
az network watcher flow-log show --resource-group <resourceGroup> --nsg <NameorID of the NetworkSecurityGroup> --query 'retentionPolicy'
```

Ensure that `enabled` is set to `true` and `days` is set to `greater then or equal to 90`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [5e1cd26a-5090-4fdb-9d6a-84a90335e22d](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F5e1cd26a-5090-4fdb-9d6a-84a90335e22d) - **Name**: `Configure network security groups to use specific workspace, storage account and flowlog retention policy for traffic analytics`

## Default Value

By default, Network Security Group Flow Logs are `disabled`.

## References

1. <https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-overview>
2. <https://docs.microsoft.com/en-us/cli/azure/network/watcher/flow-log?view=azure-cli-latest>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-6-configure-log-storage-retention>
