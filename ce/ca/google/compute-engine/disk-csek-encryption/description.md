# Description

Customer-Supplied Encryption Keys (CSEK) are a feature in Google Cloud Storage and Google Compute Engine. If you supply your own encryption keys, Google uses your key to protect the Google-generated keys used to encrypt and decrypt your data. By default, Google Compute Engine encrypts all data at rest. Compute Engine handles and manages this encryption for you without any additional actions on your part. However, if you wanted to control and manage this encryption yourself, you can provide your own encryption keys.

## Rationale

By default, Google Compute Engine encrypts all data at rest. Compute Engine handles and manages this encryption for you without any additional actions on your part. However, if you wanted to control and manage this encryption yourself, you can provide your own encryption keys.

If you provide your own encryption keys, Compute Engine uses your key to protect the Google-generated keys used to encrypt and decrypt your data. Only users who can provide the correct key can use resources protected by a customer-supplied encryption key.

Google does not store your keys on its servers and cannot access your protected data unless you provide the key. This also means that if you forget or lose your key, there is no way for Google to recover the key or to recover any data encrypted with the lost key.

At least business critical VMs should have VM disks encrypted with CSEK.

## Impact

If you lose your encryption key, you will not be able to recover the data.

## Audit

### From Google Cloud Console

1. Go to Compute Engine `Disks` by visiting: <https://console.cloud.google.com/compute/disks>.
2. Click on the disk for your critical VMs to see its configuration details.
3. Ensure that `Encryption type` is set to `Customer supplied`.

### From Google Cloud CLI

Ensure `diskEncryptionKey` property in the below command's response is not null, and contains key `sha256` with corresponding value

            gcloud compute disks describe <DISK_NAME> --zone <ZONE> --format="json(diskEncryptionKey,name)"

## Default Value

By default, VM disks are encrypted with Google-managed keys. They are not encrypted with Customer-Supplied Encryption Keys.

## References

1. <https://cloud.google.com/compute/docs/disks/customer-supplied-encryption#encrypt_a_new_persistent_disk_with_your_own_keys>
2. <https://cloud.google.com/compute/docs/reference/rest/v1/disks/get>
3. <https://cloud.google.com/compute/docs/disks/customer-supplied-encryption#key_file>

## Additional Information

Note 1: When you delete a persistent disk, Google discards the cipher keys, rendering the data irretrievable. This process is irreversible.

Note 2: It is up to you to generate and manage your key. You must provide a key that is a 256-bit string encoded in RFC 4648 standard base64 to Compute Engine.

Note 3: An example key file looks like this.

            [ 
                { 
                    "uri": "https://www.googleapis.com/compute/v1/projects/myproject/zones/us-central1-a/disks/example-disk", 
                    "key": "acXTX3rxrKAFTF0tYVLvydU1riRZTvUNC4g5I11NY-c=", 
                    "key-type": "raw" }, 
                { 
                    "uri": "https://www.googleapis.com/compute/v1/projects/myproject/global/snapshots/my-private-snapshot", 
                    "key": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFHz0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoDD6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oeQ5lAbtt7bYAAHf5l+gJWw3sUfs0/Glw5fpdjT8Uggrr+RMZezGrltJEF293rvTIjWOEB3z5OHyHwQkvdrPDFcTqsLfh+8Hr8g+mf+7zVPEC8nEbqpdl3GPv3A7AwpFp7MA==" 
                    "key-type": "rsa-encrypted" 
                } 
            ]
