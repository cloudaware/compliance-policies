# Remediation

## Review the retention requirement

1. Identify every Blob, Queue, and Table service with classic logging enabled.
2. Confirm the retention period required for audit, security, legal-hold, backup,
   and recovery obligations.
3. Export records that must outlive the selected period before enabling retention.

## Configure retention from Azure CLI

First inspect the current configuration for each affected service. Use `b`, `q`, or
`t` for the Blob, Queue, or Table service respectively:

```sh
az storage logging show \
    --account-name {{storage-account-name}} \
    --services {{b|q|t}} \
    --account-key {{storage-account-key}}
```

Set a positive retention period. Replace `{{enabled-operations}}` with the currently
enabled combination of `r`, `w`, and `d` so the command preserves the required
logging scope:

```sh
az storage logging update \
    --account-name {{storage-account-name}} \
    --services {{b|q|t}} \
    --log {{enabled-operations}} \
    --retention {{retention-days}} \
    --account-key {{storage-account-key}}
```

## Verify the result

Run `az storage logging show` again for each affected service. Confirm that
`retentionPolicy.enabled` is `true` and `retentionPolicy.days` is a positive value,
and verify that the enabled read, write, and delete operations remain intentional.
