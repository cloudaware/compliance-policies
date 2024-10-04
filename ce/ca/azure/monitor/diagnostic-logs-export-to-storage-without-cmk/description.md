# Description

Storage accounts with the activity log exports can be configured to use Customer Managed Keys (CMK).

## Rationale

Configuring the storage account with the activity log export container to use CMKs provides additional confidentiality controls on log data, as a given user must have read permission on the corresponding storage account and must be granted decrypt permission by the CMK.

## Impact

**NOTE**: You must have your key vault setup to utilize this. All Audit Logs will be encrypted with a key you provide. You will need to set up customer managed keys separately, and you will select which key to use via the instructions here. You will be responsible for the lifecycle of the keys, and will need to manually replace them at your own determined intervals to keep the data secure.

## Audit

### From Azure Portal

1. Go to `Monitor`.
2. Select `Activity log`.
3. Select `Export Activity Logs`.
4. Select a `Subscription`.
5. Note the name of the `Storage Account` for the diagnostic setting.
6. Navigate to `Storage accounts`.
7. Click on the storage account name noted in Step 5.
8. Under `Security + networking`, click `Encryption`.
9. Ensure `Customer-managed keys` is selected and a key is set.

### From Azure CLI

1. Get storage account id configured with log profile:

```sh
az monitor diagnostic-settings subscription list --subscription <subscription id> --query 'value[*].storageAccountId'
```

2. Ensure the storage account is encrypted with CMK:

```sh
az storage account list --query "[?name=='<Storage Account Name>']"
```

In command output ensure `keySource` is set to `Microsoft.Keyvault` and `keyVaultProperties` is not set to `null`.

### From PowerShell

```ps
Get-AzStorageAccount -ResourceGroupName <resource group name> -Name <storage account name>|select-object -ExpandProperty encryption|format-list
```

Ensure the value of `KeyVaultProperties` is not `null` or empty, and ensure `KeySource` is not set to `Microsoft.Storage`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [fbb99e8e-e444-4da0-9ff1-75c92f5a85b2](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ffbb99e8e-e444-4da0-9ff1-75c92f5a85b2) - **Name**: `Storage account containing the container with activity logs must be encrypted with BYOK`

## Default Value

By default, for a storage account `keySource` is set to `Microsoft.Storage` allowing encryption with vendor Managed key and not a Customer Managed Key.

## References

1. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-5-use-customer-managed-key-option-in-data-at-rest-encryption-when-required>
2. <https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log?tabs=cli#managing-legacy-log-profiles>
