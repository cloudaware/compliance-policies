# Description

The Key Vault contains object keys, secrets, and certificates. Accidental unavailability of a Key Vault can cause immediate data loss or loss of security functions (authentication, validation, verification, non-repudiation, etc.) supported by the Key Vault objects.

It is recommended the Key Vault be made recoverable by enabling the "Do Not Purge" and "Soft Delete" functions. This is in order to prevent loss of encrypted data, including storage accounts, SQL databases, and/or dependent services provided by Key Vault objects (Keys, Secrets, Certificates) etc. This may happen in the case of accidental deletion by a user or from disruptive activity by a malicious user.

**WARNING**: A current limitation is that role assignments disappearing when Key Vault is deleted. All role assignments will need to be recreated after recovery.

## Rationale

There could be scenarios where users accidentally run delete/purge commands on Key Vault or an attacker/malicious user deliberately does so in order to cause disruption. Deleting or purging a Key Vault leads to immediate data loss, as keys encrypting data and secrets/certificates allowing access/services will become non-accessible.

There is a Key Vault property that plays a role in permanent unavailability of a Key Vault:

`enablePurgeProtection`: Setting this parameter to `true` for a Key Vault ensures that even if Key Vault is deleted, Key Vault itself or its objects remain recoverable for the next 90 days. Key Vault/objects can either be recovered or purged (permanent deletion) during those 90 days. If no action is taken, the key vault and its objects will subsequently be purged.

Enabling the enablePurgeProtection parameter on Key Vaults ensures that Key Vaults and their objects cannot be deleted/purged permanently.

## Impact

Once purge-protection and soft-delete are enabled for a Key Vault, the action is irreversible.

## Audit

### From Azure Portal

1. Go to `Key Vaults`.
2. For each Key Vault.
3. Click `Properties`.
4. Ensure the `Enable purge protection (enforce a mandatory retention period for deleted vaults and vault objects)` is selected for Purge protection option on this key vault.

### From Azure CLI

1. List all Resources of type Key Vaults:

```sh
az resource list --query "[?type=='Microsoft.KeyVault/vaults']"
```

2. For Every Key Vault ID ensure check parameters `enablePurgeProtection` is set to `true`:

```sh

az resource show --id /subscriptions/xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/resourceGroups/<resourceGroupName>/providers/Microsoft.KeyVault /vaults/<keyVaultName>
```

### From PowerShell

Get all Key Vaults:

```ps
Get-AzKeyVault
```

For each Key Vault run the following command:

```ps
Get-AzKeyVault -VaultName <Vault Name>
```

Examine the results of the above command for the `EnablePurgeProtection` setting. Make sure `enablePurgeProtection` is set to `True`.

## Default Value

When a new Key Vault is created, both the parameters `enableSoftDelete` and `enablePurgeProtection` are set to `null`, disabling both the features.

## References

1. <https://docs.microsoft.com/en-us/azure/key-vault/key-vault-soft-delete-cli>
2. <https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-8-define-and-implement-backup-and-recovery-strategy>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-8-ensure-security-of-key-and-certificate-repository>

## Additional Information

When a key is used for SQL server TDE or Encrypting Storage Account, both the features `Do Not Purge` and `Soft Delete` are enabled for the corresponding Key Vault by default by Azure Backend.

**WARNING**: A current limitation of the soft-delete feature across all Azure services is role assignments disappearing when Key Vault is deleted. All role assignments will need to be recreated after recovery.
