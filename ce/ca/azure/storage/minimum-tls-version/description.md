# Description

In some cases, Azure Storage sets the minimum TLS version to be version 1.0 by default. TLS 1.0 is a legacy version and has known vulnerabilities. This minimum TLS version can be configured to be later protocols such as TLS 1.2.

## Rationale

TLS 1.0 has known vulnerabilities and has been replaced by later versions of the TLS protocol. Continued use of this legacy protocol affects the security of data in transit.

## Impact

When set to TLS 1.2 all requests must leverage this version of the protocol. Applications leveraging legacy versions of the protocol will fail.

## Audit

### From Azure Console

1. Login to the Azure Portal.
2. Go to `Storage Accounts`.
3. Click on each Storage Account.
4. Under `Setting` section, Click on `Configuration`.
5. Ensure that the `minimum TLS version` is set to be Version 1.2.

### From Azure CLI

Get a list of all storage accounts and their resource groups:

```sh
az storage account list | jq '.[] | {name, resourceGroup}'
```

Then query the `minimumTLSVersion` field:

```sh
az storage account show \ 
    --name <storage-account> \ 
    --resource-group <resource-group> \ 
    --query minimumTlsVersion \ 
    --output tsv
```

### From Azure PowerShell

To get the minimum TLS version, run the following command:

```ps
(Get-AzStorageAccount -Name <STORAGEACCOUNTNAME> -ResourceGroupName <RESOURCEGROUPNAME>).MinimumTlsVersion
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [fe83a0eb-a853-422d-aac2-1bffd182c5d0](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ffe83a0eb-a853-422d-aac2-1bffd182c5d0) - **Name**: `Storage accounts should have the specified minimum TLS version`

## Default Value

If a storage account is created through the portal, the MinimumTlsVersion property for that storage account will be set to TLS 1.2.

If a storage account is created through PowerShell or CLI, the MinimumTlsVersion property for that storage account will not be set, and defaults to TLS 1.0.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/common/transport-layer-security-configure-minimum-version?tabs=portal>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-3-encrypt-sensitive-data-in-transit>
