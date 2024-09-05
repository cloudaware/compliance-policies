# Description

Enable data encryption in transit.

## Rationale

The secure transfer option enhances the security of a storage account by only allowing requests to the storage account by a secure connection. For example, when calling REST APIs to access storage accounts, the connection must use HTTPS. Any requests using HTTP will be rejected when 'secure transfer required' is enabled. When using the Azure files service, connection without encryption will fail, including scenarios using SMB 2.1, SMB 3.0 without encryption, and some flavors of the Linux SMB client. Because Azure storage doesn’t support HTTPS for custom domain names, this option is not applied when using a custom domain name.

## Audit

### From Azure Portal

1. Go to `Storage Accounts`.
2. For each storage account, go to `Configuration`.
3. Ensure that `Secure transfer required` is set to `Enabled`.

### From Azure CLI

Use the below command to ensure the `Secure transfer required` is enabled for all the `Storage Accounts` by ensuring the output contains `true` for each of the `Storage Accounts`:

```sh
az storage account list --query "[*].[name,enableHttpsTrafficOnly]"
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [404c3081-a854-4457-ae30-26a93ef643f9](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F404c3081-a854-4457-ae30-26a93ef643f9) - **Name**: `Secure transfer to storage accounts should be enabled`

## Default Value

By default, Secure transfer required is set to Disabled.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/blobs/security-recommendations#encryption-in-transit>
2. <https://docs.microsoft.com/en-us/cli/azure/storage/account?view=azure-cli-latest#az_storage_account_list>
3. <https://docs.microsoft.com/en-us/cli/azure/storage/account?view=azure-cli-latest#az_storage_account_update>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-3-encrypt-sensitive-data-in-transit>
