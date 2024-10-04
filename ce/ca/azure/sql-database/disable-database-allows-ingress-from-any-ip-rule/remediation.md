# Remediation

## From Azure Portal

1. Go to `SQL servers`.
2. For each SQL server.
3. Under `Security`, click `Networking`.
4. Uncheck `Allow Azure services and resources to access this server`.
5. Set firewall rules to limit access to only authorized connections.
6. Click `Save`.

## From Azure CLI

Disable default firewall rule `Allow access to Azure services`:

```sh
az sql server firewall-rule delete --resource-group <resource group> --server <sql server name> --name "AllowAllWindowsAzureIps"
```

Remove a custom firewall rule:

```sh
az sql server firewall-rule delete --resource-group <resource group> --server <sql server name> --name <firewall rule name>
```

Create a firewall rule:

```sh
az sql server firewall-rule create --resource-group <resource group> --server <sql server name> --name <firewall rule name> --start-ip-address "<IP Address other than 0.0.0.0>" --end-ip-address "<IP Address other than 0.0.0.0 or 255.255.255.255>"
```

Update a firewall rule:

```sh
az sql server firewall-rule update --resource-group <resource group> --server <sql server name> --name <firewall rule name> --start-ip-address "<IP Address other than 0.0.0.0>" --end-ip-address "<IP Address other than 0.0.0.0 or 255.255.255.255>"
```

## From PowerShell

Disable Default Firewall Rule `Allow access to Azure services`:

```ps
Remove-AzSqlServerFirewallRule -FirewallRuleName "AllowAllWindowsAzureIps" -ResourceGroupName <resource group name> -ServerName <server name>
```

Remove a custom Firewall rule:

```ps
Remove-AzSqlServerFirewallRule -FirewallRuleName "<firewall rule name>" -ResourceGroupName <resource group name> -ServerName <server name>
```

Set the appropriate firewall rules:

```ps
Set-AzSqlServerFirewallRule -ResourceGroupName <resource group name> -ServerName <server name> -FirewallRuleName "<firewall rule name>" -StartIpAddress "<IP Address other than 0.0.0.0>" -EndIpAddress "<IP Address other than 0.0.0.0 or 255.255.255.255>"
```
