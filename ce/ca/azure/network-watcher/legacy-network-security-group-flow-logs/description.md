# Description

Existing NSG flow logs must remain enabled and send traffic analytics to a central Log Analytics workspace until migration to virtual network flow logs.

## Audit

Manual assessment is required. In **Network Watcher > Flow logs**, select NSG targets and review **every** current log still in use for enabled logging, enabled traffic analytics and the intended workspace. Disabled logs left by verified migration are out of scope and should be deleted. If no NSG logs remain, apply the virtual network flow-log capture assessment.

Cloudaware collects target IDs, log status and workspace relationships but no migration marker or proof of replacement coverage. A disabled log alone cannot establish migration. Confirm migration records, workload coverage and receipt of logs in the intended workspace. The v6 assessment is separate because it does not contain these v7 scope alternatives.

## References

1. <https://learn.microsoft.com/en-us/azure/network-watcher/nsg-flow-logs-migrate>
