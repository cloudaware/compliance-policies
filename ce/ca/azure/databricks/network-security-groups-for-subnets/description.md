# Description

Network Security Groups (NSGs) should be implemented to control inbound and outbound traffic to Azure Databricks subnets, ensuring only authorized communication. NSGs should be configured with deny rules to block unwanted traffic and restrict communication to essential sources only.

## Rationale

## Impact

- NSGs require periodic maintenance to ensure rule accuracy.
- Misconfigured NSGs could inadvertently block required traffic.

## Audit

### From Azure Portal

1. Navigate to Virtual Networks > Subnets, and review NSG assignments.

### From Azure CLI

```sh
az network nsg list --query "[].{Name:name, Rules:securityRules}"
```

### From PowerShell

```ps
Get-AzNetworkSecurityGroup -ResourceGroupName <resource-group-name>
```

## Default Value

By default, Databricks subnets do not have NSGs assigned.

## References

1. <https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-databricks-security-baseline>
2. <https://learn.microsoft.com/en-us/azure/databricks/security/network/classic/vnet-inject#network-security-group-rules>
