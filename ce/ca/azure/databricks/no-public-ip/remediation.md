# Remediation

## From Azure Portal

1. Go to `Azure Databricks`.
2. Click the name of a workspace.
3. Under `Settings`, click `Networking`.
4. Under `Network access`, next to `Deploy Azure Databricks workspace with Secure Cluster Connectivity (No Public IP)`, click the radio button next to `Enabled`.
5. Click `Save`.
6. Repeat steps 1-5 for each workspace requiring remediation.

## From Azure CLI

For each workspace requiring remediation, run the following command to set `enableNoPublicIp` to `true`:

```sh
az databricks workspace update /
    --resource-group {{resource-group}} /
    --name {{workspace}} /
    --enable-no-public-ip true
```

## From PowerShell

For each workspace requiring remediation, run the following command to set `EnableNoPublicIP` to `True`:

```ps
Update-AzDatabricksWorkspace `
    -ResourceGroupName {{resource-group}} `
    -Name {{workspace}} `
    -EnableNoPublicIP
```
