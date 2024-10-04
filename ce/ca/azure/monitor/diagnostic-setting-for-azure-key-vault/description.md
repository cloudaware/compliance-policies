# Description

Enable AuditEvent logging for key vault instances to ensure interactions with key vaults are logged and available.

## Rationale

Monitoring how and when key vaults are accessed, and by whom, enables an audit trail of interactions with confidential information, keys, and certificates managed by Azure Key Vault. Enabling logging for Key Vault saves information in a user provided destination of either an Azure storage account or Log Analytics workspace. The same destination can be used for collecting logs for multiple Key Vaults.

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

For each keyvault `id`:

```sh
az monitor diagnostic-settings list --resource <id>
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
Get-AzDiagnosticSetting -ResourceId <key_vault_id>
```

Ensure that `StorageAccountId`, `ServiceBusRuleId`, `MarketplacePartnerId`, or `WorkspaceId` is set as appropriate. Also, ensure that `enabled` is set to `true`, and that `categoryGroup` reflects both `audit` and `allLogs` category groups.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [cf820ca0-f99e-4f3e-84fb-66e913812d21](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fcf820ca0-f99e-4f3e-84fb-66e913812d21) - **Name**: `Resource logs in Key Vault should be enabled`

## Default Value

By default, Diagnostic AuditEvent logging is not enabled for Key Vault instances.

## References

1. <https://docs.microsoft.com/en-us/azure/key-vault/general/howto-logging>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-8-ensure-security-of-key-and-certificate-repository>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>

## Additional Information

**DEPRECATION WARNING**

Retention rules for Key Vault logging is being migrated to Azure Storage Lifecycle Management. Retention rules should be set based on the needs of your organization and security or compliance frameworks. Please visit <https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/migrate-to-azure-storage-lifecycle-policy?tabs=portal> for detail on migrating your retention rules.

Microsoft has provided the following deprecation timeline:

March 31, 2023 – The Diagnostic Settings Storage Retention feature will no longer be available to configure new retention rules for log data. This includes using the portal, CLI PowerShell, and ARM and Bicep templates. If you have configured retention settings, you'll still be able to see and change them in the portal.

March 31, 2024 – You will no longer be able to use the API (CLI, Powershell, or templates), or Azure portal to configure retention setting unless you're changing them to 0. Existing retention rules will still be respected.

September 30, 2025 – All retention functionality for the Diagnostic Settings Storage Retention feature will be disabled across all environments.
