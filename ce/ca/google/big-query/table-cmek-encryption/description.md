# Description

BigQuery by default encrypts data at rest by employing `Envelope Encryption` using Google managed cryptographic keys. The data is encrypted using the `data encryption keys` and data encryption keys themselves are further encrypted using `key encryption keys`. This is seamless and does not require any additional input from the user. However, if you want greater control, customer-managed encryption keys (CMEK) can be used as an encryption key management solution for BigQuery datasets. If CMEK is used, the CMEK encrypts the data encryption keys instead of using Google-managed encryption keys.

## Rationale

BigQuery by default encrypts data at rest by employing `Envelope Encryption` using Google managed cryptographic keys. This is seamless and does not require any additional input from the user.

For greater control over encryption, customer-managed encryption keys (CMEK) can be used as an encryption key management solution for BigQuery tables. The CMEK is used to encrypt the data encryption keys instead of using Google-managed encryption keys. BigQuery stores the table and CMEK association and the encryption/decryption is done automatically.

Applying the default customer-managed keys to BigQuery datasets ensures that new tables created in the future are encrypted using CMEK, but existing tables must be updated individually.

Note: Google does not store your keys on its servers and cannot access your protected data unless you provide the key. This also means that if you forget or lose your key, there is no way for Google to recover the key or to recover any data encrypted with the lost key.

## Impact

Using Customer-managed encryption keys (CMEK) will incur additional labor-hour investment to create, protect, and manage the keys.

## Audit

### From Google Cloud Console

1. Go to `Analytics`
2. Go to `BigQuery`
3. Under `SQL Workspace`, select the project
4. Select Data Set, select the table
5. Go to `Details` tab
6. Under `Table info`, verify `Customer-managed key` is present.
7. Repeat for each table in all data sets for all projects.

### From Google Cloud CLI

List all dataset names

```sh
bq ls
```

Use the following command to view the table details. Verify the `kmsKeyName` is present.

```sh
bq show {{table-object}}
```

## Default Value

Google Managed keys are used as `key encryption keys`.

## References

1. <https://cloud.google.com/bigquery/docs/customer-managed-encryption>
