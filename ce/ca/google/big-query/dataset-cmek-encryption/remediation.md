# Remediation

## From Google Cloud CLI

The default CMEK for existing data sets can be updated by specifying the default key in the `EncryptionConfiguration.kmsKeyName` field when calling the `datasets.insert` or `datasets.patch` methods
