# Remediation

## Before Deleting the Storage Account

Confirm that the account is no longer required before deleting it:

1. Verify that the `Transactions` and `Used Capacity` metrics have both remained at zero for the last 30 days.
2. Identify the account owner and confirm that no application, infrastructure template, private endpoint, diagnostic setting, backup, disaster-recovery process, or data-retention requirement depends on the account.
3. Check for legal holds, immutability policies, and organizational retention requirements.
4. Export or back up any information that must be retained.

## From Azure Portal

1. In the Azure portal, open the storage account.
2. Select `Overview`.
3. Select `Delete`.
4. Enter the storage account name to confirm the deletion, then select `Delete`.

## From Azure CLI

Replace the information within `{{}}` with the appropriate values:

```sh
az storage account delete \
    --name {{storage-account-name}} \
    --resource-group {{resource-group-name}} \
    --yes
```
