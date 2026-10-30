# Remediation

## From Google Cloud Console

1. Go to `Cryptographic Keys` by visiting: <https://console.cloud.google.com/security/kms>.
2. Click the specific key ring.
3. From the list of keys, select the key and click the More actions menu (three dots).
4. Click on `Edit rotation period`.
5. In the dialog, select a new rotation period in days that is less than 90, then choose the `Starting on` date.

## From Google Cloud CLI

1. Update and schedule rotation by `ROTATION_PERIOD` and `NEXT_ROTATION_TIME` for each key:

    ```sh
    gcloud kms keys update new \
        --keyring={{key-ring}} \
        --location=LOCATION \
        --next-rotation-time={{next-rotation-time}} \
        --rotation-period={{rotation-period}}
    ```
