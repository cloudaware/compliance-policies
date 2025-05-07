# Remediation

## From Command Line

### To Delete an Azure App Service Plan

#### Azure CLI

```sh
az appservice plan delete \
--name {{app-service-plan-name}} \
--resource-group {{resource-group-name}} \
--subscription {{subscription-id}}
--yes
```

- The `--yes` flag automatically confirms the deletion of the App Service Plan.

#### PowerShell

```ps
Remove-AzAppServicePlan -ResourceGroupName {{resource-group-name}} -Name {{app-service-plan-name}}
```
