# Remediation

It is not possible to enable infrastructure double encryption on an existing Azure Database for PostgreSQL server. The remediation steps describe creating a new Azure Database for PostgreSQL server with infrastructure double encryption enabled.

## From Azure Portal

1. Go through the normal process of database creation.
2. On step 2 titled `Additional settings`, ensure that `Infrastructure double encryption enabled` is checked.
3. Acknowledge that you understand this will impact database performance.
4. Finish database creation as normal.

## From Azure CLI

```sh
az postgres server create \
    --resource-group {{resource-group-name}} \
    --name {{server-name}} \
    --location {{location}} \
    --admin-user {{admin-username}} \
    --admin-password {{server-admin-password}} \
    --sku-name GP_Gen4_2 \
    --version 11 \
    --infrastructure-encryption Enabled
```
