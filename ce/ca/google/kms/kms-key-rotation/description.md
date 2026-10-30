# Description

Google Cloud Key Management Service stores cryptographic keys in a hierarchical structure designed for consistent access control management.

The format for the rotation schedule depends on the client library used. For the gcloud CLI, the next rotation time must be in `ISO` or `RFC3339` format, and the rotation period must be in the form `INTEGER[UNIT]`, where units can be seconds (s), minutes (m), hours (h), or days (d).

## Rationale

Set a key rotation period and starting time. A key can be created with a specified `rotation period`, which is the time between automatic generation of new key versions. A key can also be created with a specified next rotation time. A key is a named object representing a `cryptographic key` used for a specific purpose. The key material, the actual bits used for `encryption`, can change over time as new key versions are created.

A key is used to protect a set of data. A collection of files could be encrypted with the same key, and people with `decrypt` permissions on that key would be able to decrypt those files. Therefore, it is necessary to make sure the `rotation period` is set to a specific time.

## Impact

After a successful key rotation, the older key version is required in order to decrypt the data encrypted by that previous key version.

## Audit

### From Google Cloud Console

1. Go to `Cryptographic Keys` by visiting: <https://console.cloud.google.com/security/kms>.
2. Click on each key ring, then ensure each key in the keyring has `Next Rotation` set for less than 90 days from the current date.

### From Google Cloud CLI

1. Ensure rotation is scheduled by `ROTATION_PERIOD` and `NEXT_ROTATION_TIME` for each key:

    ```sh
    gcloud kms keys list \
        --keyring={{key-ring}} \
        --location={{location}} \
        --format=json'(rotationPeriod)'
    ```

     Verify that `rotationPeriod` and `nextRotationTime` meet these criteria:
     `rotationPeriod` is no more than 90 days (for example, `<= 90d`, `<= 2160h`, `<= 129600m`, or `<= 7776000s`)
     `nextRotationTime` is within 90 days of the current date

## Default Value

By default, KMS encryption keys are rotated every 90 days.

## References

1. <https://cloud.google.com/kms/docs/key-rotation#frequency_of_key_rotation>
2. <https://cloud.google.com/kms/docs/re-encrypt-data>

## Additional Information

- Key rotation does NOT re-encrypt already encrypted data with the newly generated key version. If you suspect unauthorized use of a key, re-encrypt the data protected by that key and then disable or schedule destruction of the prior key version.
- It is not recommended to rely solely on irregular rotation, but rather to use irregular rotation only when needed in conjunction with a regular rotation schedule.
