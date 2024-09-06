# Remediation

Remediation has 2 steps

1. Setup the Key Vault.
2. Setup the App Service to use the Key Vault.

## Step 1: Set up the Key Vault

### From Azure CLI

```sh
az keyvault create --name "<name>" --resource-group "<myResourceGroup>" --location myLocation
```

### From Powershell

```ps
New-AzKeyvault -name <name> -ResourceGroupName <myResourceGroup> -Location <myLocation>
```

## Step 2: Set up the App Service to use the Key Vault

Sample JSON Template for App Service Configuration:

```json
{ 
    //... 
    "resources": [ 
        { 
            "type": "Microsoft.Storage/storageAccounts", 
            "name": "[variables('storageAccountName')]", 
            //... 
        }, 
        { 
            "type": "Microsoft.Insights/components", 
            "name": "[variables('appInsightsName')]", 
            //... 
        }, 
        { 
            "type": "Microsoft.Web/sites", 
            "name": "[variables('functionAppName')]", 
            "identity": { 
                "type": "SystemAssigned" }, 
                //... 
            "resources": [
                { 
                    "type": "config", 
                    "name": "appsettings", 
                    //... 
                    "dependsOn": [ 
                        "[resourceId('Microsoft.Web/sites', variables('functionAppName'))]", 
                        "[resourceId('Microsoft.KeyVault/vaults/', variables('keyVaultName'))]", 
                        "[resourceId('Microsoft.KeyVault/vaults/secrets', variables('keyVaultName'), variables('storageConnectionStringName'))]", 
                        "[resourceId('Microsoft.KeyVault/vaults/secrets', variables('keyVaultName'), variables('appInsightsKeyName'))]" 
                    ], 
                    "properties": {
                        "AzureWebJobsStorage": "[concat('@Microsoft.KeyVault(SecretUri=', reference(variables('storageConnectionStringResourceId')).secretUriWithVersion, ')')]", 
                        "WEBSITE_CONTENTAZUREFILECONNECTIONSTRING": "[concat('@Microsoft.KeyVault(SecretUri=', reference(variables('storageConnectionStringResourceId')).secretUriWithVersion, ')')]", 
                        "APPINSIGHTS_INSTRUMENTATIONKEY": "[concat('@Microsoft.KeyVault(SecretUri=', reference(variables('appInsightsKeyResourceId')).secretUriWithVersion, ')')]", 
                        "WEBSITE_ENABLE_SYNC_UPDATE_SITE": "true" 
                        //... 
                    }
                }, 
                { 
                    "type": "sourcecontrols", 
                    "name": "web", 
                    //... 
                    "dependsOn": [
                        "[resourceId('Microsoft.Web/sites', variables('functionAppName'))]", 
                        "[resourceId('Microsoft.Web/sites/config', variables('functionAppName'), 'appsettings')]" 
                    ], 
                } 
            ] 
        }, 
        { 
            "type": "Microsoft.KeyVault/vaults", 
            "name": "[variables('keyVaultName')]", 
            //... 
            "dependsOn": [ 
                "[resourceId('Microsoft.Web/sites', variables('functionAppName'))]" 
            ], 
            "properties": { 
                //... 
                "accessPolicies": [ 
                    { 
                        "tenantId": "[reference(concat('Microsoft.Web/sites/', variables('functionAppName'), '/providers/Microsoft.ManagedIdentity/Identities/default'), '2015-08-31-PREVIEW').tenantId]", 
                        "objectId": "[reference(concat('Microsoft.Web/sites/', variables('functionAppName'), '/providers/Microsoft.ManagedIdentity/Identities/default'), '2015-08-31-PREVIEW').principalId]", 
                        "permissions": { 
                            "secrets": [ 
                                "get" 
                            ] 
                        } 
                    } 
                ] 
            }, 
            "resources": [ 
                { 
                    "type": "secrets", 
                    "name": "[variables('storageConnectionStringName')]", 
                    //... 
                    "dependsOn": [ 
                        "[resourceId('Microsoft.KeyVault/vaults/', variables('keyVaultName'))]", 
                        "[resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName'))]" 
                    ], 
                    "properties": { 
                        "value": "[concat('DefaultEndpointsProtocol=https;AccountName=', variables('storageAccountName'), ';AccountKey=', listKeys(variables('storageAccountResourceId'),'2015-05-01-preview').key1)]" 
                    } 
                }, 
                { 
                    "type": "secrets", 
                    "name": "[variables('appInsightsKeyName')]", 
                    //... 
                    "dependsOn": [
                        "[resourceId('Microsoft.KeyVault/vaults/', variables('keyVaultName'))]", 
                        "[resourceId('Microsoft.Insights/components', variables('appInsightsName'))]" 
                    ], 
                    "properties": { 
                        "value": "[reference(resourceId('microsoft.insights/components/', variables('appInsightsName')), '2015-05-01').InstrumentationKey]" 
                    } 
                } 
            ] 
        } 
    ] 
}
```
