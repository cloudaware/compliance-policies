# Remediation

## From Google Cloud CLI

Use the following command to copy the data. The source and the destination needs to be same in case copying to the original table.

            bq cp --destination_kms_key <customer_managed_key> source_dataset.source_table destination_dataset.destination_table
