# Description

Enable Network Watcher for physical regions in Azure subscriptions.

## Rationale

Network diagnostic and visualization tools available with Network Watcher help users understand, diagnose, and gain insights to the network in Azure.

## Impact

There are additional costs per transaction to run and store network data. For high-volume networks these charges will add up quickly.

## Audit

### From Azure Portal

1. Use the Search bar to search for and click on the `Network Watcher` service.
2. From the Overview menu item, review each Network Watcher listed, and ensure that a network watcher is listed for each region in use by the subscription.

### From Azure CLI

```sh
az network watcher list --query "[].{Location:location,State:provisioningState}" -o table
```

This will list all network watchers and their provisioning state.

Ensure `provisioningState` is `Succeeded` for each network watcher.

```sh
az account list-locations --query "[?metadata.regionType=='Physical'].{Name:name,DisplayName:regionalDisplayName}" -o table
```

This will list all physical regions that exist in the subscription.

Compare this list to the previous one to ensure that for each region, a network watcher exists with `provisioningState` set to `Succeeded`.

### From PowerShell

Get a list of Network Watchers:

```ps
Get-AzNetworkWatcher
```

Make sure each watcher is set with the `ProvisioningState` setting set to `Succeeded` and all `Locations` are set with a watcher.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [b6e2945c-0b7b-40f5-9233-7a5323b5cdc6](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fb6e2945c-0b7b-40f5-9233-7a5323b5cdc6) - **Name**: `Network Watcher should be enabled`

## Default Value

Network Watcher is automatically enabled. When you create or update a virtual network in your subscription, Network Watcher will be enabled automatically in your Virtual Network's region. There is no impact to your resources or associated charge for automatically enabling Network Watcher.

## References

1. <https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-monitoring-overview>
2. <https://learn.microsoft.com/en-us/cli/azure/network/watcher?view=azure-cli-latest>
3. <https://learn.microsoft.com/en-us/cli/azure/network/watcher?view=azure-cli-latest#az-network-watcher-configure>
4. <https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-create>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-4-enable-network-logging-for-security-investigation>
6. <https://azure.microsoft.com/en-ca/pricing/details/network-watcher/>
