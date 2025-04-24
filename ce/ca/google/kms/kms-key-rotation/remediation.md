# Remediation

## From Google Cloud Console

1. Go to `Cryptographic Keys` by visiting: <https://console.cloud.google.com/security/kms>.
2. Click on the specific key ring
3. From the list of keys, choose the specific key and Click on `Right side pop up the blade (3 dots)`.
4. Click on `Edit rotation period`.
5. On the pop-up window, `Select a new rotation period` in days which should be less than 90 and then choose `Starting on` date (date from which the rotation period begins).

## From Google Cloud CLI

1. Update and schedule rotation by `ROTATION_PERIOD` and `NEXT_ROTATION_TIME` for each key:

    gcloud kms keys update new --keyring=KEY_RING --location=LOCATION --next-rotation-time=NEXT_ROTATION_TIME --rotation-period=ROTATION_PERIOD
