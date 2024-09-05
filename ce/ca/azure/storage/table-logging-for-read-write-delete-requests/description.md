# Description

Azure Table storage is a service that stores structured NoSQL data in the cloud, providing a key/attribute store with a schema-less design. Storage Logging happens server-side and allows details for both successful and failed requests to be recorded in the storage account. These logs allow users to see the details of read, write, and delete operations against the tables. Storage Logging log entries contain the following information about individual requests: timing information such as start time, end-to-end latency, and server latency; authentication details; concurrency information; and the sizes of the request and response messages.

## Rationale

Storage Analytics logs contain detailed information about successful and failed requests to a storage service. This information can be used to monitor each individual request to a storage service for increased security or diagnostics. Requests are logged on a best-effort basis.

Storage Analytics logging is not enabled by default for your storage account.

## Impact

Being a level 2, enabling this setting can have a high impact on the cost of data storage used for logging more data per each request. Do not enable this without determining your need for this level of logging or forget to check in on data usage and projected cost.

## Audit

### From Azure Portal

1. From the default portal page select `Storage Accounts`.
2. Select the specific Storage Account.
3. Click the `Diagnostics settings` under the `Monitoring` section in the left column.
4. Select the `table` tab indented below the storage account. Then select the diagnostic setting listed.
5. Ensure `StorageRead`, `StorageWrite`, and `StorageDelete` options are selected under the `Logging section` and that they are sent to the correct destination.

### From Azure CLI

Ensure the below command's output contains properties delete, read and write set to `true`:

```sh
az storage logging show --services t --account-name <storageAccountName>
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [2fb86bf3-d221-43d1-96d1-2434af34eaa0](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F2fb86bf3-d221-43d1-96d1-2434af34eaa0) - **Name**: `Configure diagnostic settings for Table Services to Log Analytics workspace`

## Default Value

By default, storage account table service logging is disabled for read, write, an delete operations.

## References

1. <https://docs.microsoft.com/en-us/rest/api/storageservices/about-storage-analytics-logging>
2. <https://docs.microsoft.com/en-us/cli/azure/storage/logging?view=azure-cli-latest>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-3-enable-logging-for-security-investigation>

## Additional Information

We cannot practically generalize detailed audit log requirements for every table due to their nature and intent. This recommendation may be applicable to storage account table service where the security is paramount.
