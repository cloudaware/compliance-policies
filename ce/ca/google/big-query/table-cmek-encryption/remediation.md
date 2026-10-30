# Remediation

## From Google Cloud CLI

Use the following command to copy the data. The source and destination need to be the same when copying to the original table.

```sh
bq cp \
    --destination_kms_key {{customer-managed-key}} source_dataset.source_table destination_dataset.destination_table
```
