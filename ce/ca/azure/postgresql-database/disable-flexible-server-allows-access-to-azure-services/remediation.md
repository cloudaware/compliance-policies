# Remediation

## From Azure Portal

1. Log in to Azure Portal using <https://portal.azure.com>.
2. Go to `Azure Database for PostgreSQL flexible servers`.
3. For each database, under `Settings`, click `Networking`.
4. Under `Firewall rules`, uncheck `Allow public access from any Azure service within Azure to this server`.
5. Click `Save`.

## From Azure CLI

Using the firewall rule name from the `Audit from Azure CLI` steps, use the following command to delete the `AllowAllAzureServicesAndResourcesWithinAzureIps` rule for PostgreSQL flexible server:

```sh
az postgres flexible-server firewall-rule delete \
    --resource-group {{resource-group-name}} \
    --name {{server-name}} \
    --rule-name {{rule-name}}
```

Type `y` and press Enter to confirm.

## From PowerShell

Using the firewall rule name from the `Audit from PowerShell` steps, use the following command to delete the `AllowAllAzureServicesAndResourcesWithinAzureIps` rule for PostgreSQL flexible server:

```ps
Remove-AzPostgreSqlFlexibleServerFirewallRule `
    -ResourceGroupName {{resource-group-name}} `
    -ServerName {{server-name}} `
    -Name {{rule-name}}
```
