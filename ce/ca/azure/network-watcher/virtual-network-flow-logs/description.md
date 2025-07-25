# Description

Ensure that virtual network flow logs are captured and fed into a central log analytics workspace.

## Rationale

Virtual network flow logs provide critical visibility into traffic patterns. Sending logs to a Log Analytics workspace enables centralized analysis, correlation, and alerting for faster threat detection and response.

## Impact

- Virtual network flow logs are charged per gigabyte of network flow logs collected and come with a free tier of 5 GB/month per subscription.
- If traffic analytics is enabled with virtual network flow logs, traffic analytics pricing applies at per gigabyte processing rates.
- The storage of logs is charged separately.

## Audit

### From Azure Portal

1. Go to `Network Watcher`.
2. Under `Logs`, select `Flow logs`.
3. Click `Add filter`.
4. From the `Filter` drop-down menu, select `Flow log type`.
5. From the `Value` drop-down menu, check `Virtual network` only.
6. Click `Apply`.
7. Ensure that at least one virtual network flow log is listed and is configured to send logs to a `Log Analytics Workspace`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [2f080164-9f4d-497e-9db6-416dc9f7b48a](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailAdaptor.ReactView/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F2f080164-9f4d-497e-9db6-416dc9f7b48a) - **Name:** 'Network Watcher flow logs should have traffic analytics enabled'
- **Policy ID**: [4c3c6c5f-0d47-4402-99b8-aa543dd8bcee](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailAdaptor.ReactView/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F4c3c6c5f-0d47-4402-99b8-aa543dd8bcee) - **Name:** 'Audit flow logs configuration for every virtual network'

## References

1. <https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-overview>
2. <https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-cli>

## Additional Information

On September 30, 2027, NSG flow logs will be retired, and creating new NSG flow logs will no longer be possible after June 30, 2025. Azure recommends migrating to virtual network flow logs, which address NSG flow log limitations. After retirement, traffic analytics using NSG flow logs will no longer be supported, and existing NSG flow log resources will be deleted. Previously collected NSG flow log records will remain available per their retention policies. For details, see the official announcement: <https://azure.microsoft.com/en-gb/updates?id=Azure-NSG-flow-logs-Retirement>.
