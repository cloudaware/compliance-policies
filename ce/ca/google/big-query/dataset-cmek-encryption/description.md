# Description

BigQuery by default encrypts the data as rest by employing `Envelope Encryption` using Google managed cryptographic keys. The data is encrypted using the `data encryption keys` and data encryption keys themselves are further encrypted using `key encryption keys`. This is seamless and do not require any additional input from the user. However, if you want to have greater control, Customer-managed encryption keys (CMEK) can be used as encryption key management solution for BigQuery Data Sets.

## Rationale

BigQuery by default encrypts the data as rest by employing `Envelope Encryption` using Google managed cryptographic keys. This is seamless and does not require any additional input from the user.

For greater control over the encryption, customer-managed encryption keys (CMEK) can be used as encryption key management solution for BigQuery Data Sets. Setting a Default Customer-managed encryption key (CMEK) for a data set ensure any tables created in future will use the specified CMEK if none other is provided.

Note: Google does not store your keys on its servers and cannot access your protected data unless you provide the key. This also means that if you forget or lose your key, there is no way for Google to recover the key or to recover any data encrypted with the lost key.

## Impact

Using Customer-managed encryption keys (CMEK) will incur additional labor-hour investment to create, protect, and manage the keys.

## Audit

### From Google Cloud Console

1. Go to `Analytics`
2. Go to `BigQuery`
3. Under `Analysis` click on `SQL Workspaces`, select the project
4. Select Data Set
5. Ensure `Customer-managed key` is present under `Dataset info` section.
6. Repeat for each data set in all projects.

### From Google Cloud CLI

List all dataset names

            bq ls

Use the following command to view each dataset details.

            bq show <data_set_object>

Verify the `kmsKeyName` is present.

## Default Value

Google Managed keys are used as `key encryption keys`.

## References

1. <https://cloud.google.com/bigquery/docs/customer-managed-encryption>
