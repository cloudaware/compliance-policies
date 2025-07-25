# Description

Enable Network Watcher for physical regions in Azure subscriptions.

## Rationale

Network diagnostic and visualization tools available with Network Watcher help users understand, diagnose, and gain insights to the network in Azure.

## Impact

There are additional costs per transaction to run and store network data. For high-volume networks these charges will add up quickly.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if the number of `Available Locations` is not equal to the total number of enabled *Azure Network Watchers* in that subscription.

## Default Value

Network Watcher is automatically enabled. When you create or update a virtual network in your subscription, Network Watcher will be enabled automatically in your Virtual Network's region. There is no impact to your resources or associated charge for automatically enabling Network Watcher.

## References

1. <https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-monitoring-overview>
2. <https://learn.microsoft.com/en-us/cli/azure/network/watcher?view=azure-cli-latest>
3. <https://learn.microsoft.com/en-us/cli/azure/network/watcher?view=azure-cli-latest#az-network-watcher-configure>
4. <https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-create>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-4-enable-network-logging-for-security-investigation>
6. <https://azure.microsoft.com/en-ca/pricing/details/network-watcher/>
