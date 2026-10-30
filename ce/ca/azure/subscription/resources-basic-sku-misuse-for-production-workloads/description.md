# Description

The use of Basic, Free, or Consumption SKUs in Azure, while cost effective, has significant limitations in terms of what can be monitored, supported, and covered by service level agreements. These SKUs should not be used for production artifacts that require monitoring and SLA coverage.

## Rationale

Typically, production workloads need to be monitored and should have an SLA with Microsoft. Using Basic, Free, or Consumption SKUs for production artifacts can mean these capabilities do not exist.

The following resource types should use standard SKUs as a minimum.

- Public IP Addresses
- Network Load Balancers
- REDIS Cache
- SQL PaaS Databases
- VPN Gateways

## Impact

The impact of enforcing Standard SKUs is twofold:

1. There will be a cost increase
2. The monitoring and service level agreements will be available and will support the production service.

All resources should be either tagged or in separate Management Groups/Subscriptions.

## Audit

This needs to be audited by Azure Policy (one for each resource type) and denied for each artifact that is production.

### From Azure Portal

1. Open `Azure Resource Graph Explorer`.
2. Click `New query`.
3. Paste the following into the query window:

```
Resources | where sku contains 'Basic' or sku contains 'consumption' | order by type
```

4. Click `Run query` then evaluate the results in the results window.
5. Ensure that no production artifacts are returned.

### From Azure CLI

```sh
az graph query -q "Resources | where sku contains 'Basic' or sku contains 'consumption' | order by type"
```

Alternatively, to filter on a specific resource group:

```sh
az graph query -q "Resources | where resourceGroup == '{{resource-group-name}}' | where sku contains 'Basic' or sku contains 'consumption' | order by type"
```

Ensure that no production artifacts are returned.

### From PowerShell

```ps
Get-AzResource | Where-Object {$_.Sku -EQ "Basic"}
```

Ensure that no production artifacts are returned.

## Default Value

Policy should enforce standard SKUs for the following artifacts:

- Public IP Addresses
- Network Load Balancers
- REDIS Cache
- SQL PaaS Databases
- VPN Gateways

## References

1. <https://azure.microsoft.com/en-us/support/plans>
2. <https://azure.microsoft.com/en-us/support/plans/response>
3. <https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-upgrade>
4. <https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-basic-upgrade-guidance>
5. <https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-how-to-scale>
6. <https://learn.microsoft.com/en-us/azure/azure-sql/database/scale-resources>
7. <https://learn.microsoft.com/en-us/azure/vpn-gateway/gateway-sku-resize>
