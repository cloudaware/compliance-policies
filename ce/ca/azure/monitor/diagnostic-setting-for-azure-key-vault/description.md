# Description

Enable AuditEvent logging for Key Vault instances to ensure interactions with Key Vault are logged and available.

## Rationale

Monitoring how and when Key Vaults are accessed, and by whom, enables an audit trail of interactions with confidential information, keys, and certificates managed by Azure Key Vault. Enabling logging for Key Vault saves information in a user-provided destination of either an Azure Storage account or a Log Analytics workspace. The same destination can be used for collecting logs for multiple Key Vaults.

## Audit

### From Azure Portal

1. Go to `Key vaults`.
2. For each Key vault, under `Monitoring`, go to `Diagnostic settings`.
3. Click `Edit setting` next to a diagnostic setting.
4. Ensure that a destination is configured.
5. Under `Category groups`, ensure that `audit` and `allLogs` are checked.

### From Azure CLI

List all key vaults:

```sh
az keyvault list
```

For each Key Vault `id`:

```sh
az monitor diagnostic-settings list --resource {{key-vault-id}}
```

Ensure that `storageAccountId` reflects your desired destination and that `categoryGroup` and `enabled` are set as follows in the sample outputs below:

```json
"logs": [ 
    { 
        "categoryGroup": "audit", 
        "enabled": true, 
    }, 
    { 
        "categoryGroup": "allLogs", 
        "enabled": true, 
    }
]
```

### From PowerShell

List the key vault(s) in the subscription:

```ps
Get-AzKeyVault
```

For each key vault, run the following:

```ps
Get-AzDiagnosticSetting -ResourceId {{key-vault-id}}
```

Ensure that `StorageAccountId`, `ServiceBusRuleId`, `MarketplacePartnerId`, or `WorkspaceId` is set as appropriate. Also, ensure that `enabled` is set to `true`, and that `categoryGroup` reflects both `audit` and `allLogs` category groups.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [cf820ca0-f99e-4f3e-84fb-66e913812d21](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fcf820ca0-f99e-4f3e-84fb-66e913812d21) - **Name**: `Resource logs in Key Vault should be enabled`

## Default Value

By default, Diagnostic AuditEvent logging is not enabled for Key Vault instances.
