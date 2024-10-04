# Description

Ensure that network flow logs are captured and fed into a central log analytics workspace.

## Rationale

Network Flow Logs provide valuable insight into the flow of traffic around your network and feed into both Azure Monitor and Azure Sentinel (if in use), permitting the generation of visual flow diagrams to aid with analyzing for lateral movement, etc.

## Impact

The impact of configuring NSG Flow logs is primarily one of cost and configuration. If deployed, it will create storage accounts that hold minimal amounts of data on a 5-day lifecycle before feeding to Log Analytics Workspace. This will increase the amount of data stored and used by Azure Monitor.

## Audit

### From Azure Portal

1. Navigate to `Network Watcher`.
2. Under `Logs`, select `Flow logs`.
3. Click `Add filter`.
4. From the `Filter` drop-down, select `Flow log type`.
5. From the `Value` drop-down, check `Network security group` only.
6. Click `Apply`.
7. Ensure that at least one network security group flow log is listed and is configured to send logs to a `Log Analytics Workspace`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [27960feb-a23c-4577-8d36-ef8b5f35e0be](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F27960feb-a23c-4577-8d36-ef8b5f35e0be) - **Name**: `All flow log resources should be in enabled state`
- **Policy ID**: [c251913d-7d24-4958-af87-478ed3b9ba41](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fc251913d-7d24-4958-af87-478ed3b9ba41) - **Name**: `Flow logs should be configured for every network security group`
- **Policy ID**: [4c3c6c5f-0d47-4402-99b8-aa543dd8bcee](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F4c3c6c5f-0d47-4402-99b8-aa543dd8bcee) - **Name**: `Flow logs should be configured for every virtual network`

## Default Value

By default Network Security Group logs are not sent to Log Analytics.

## References

1. <https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-portal>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-4-enable-network-logging-for-security-investigation>
