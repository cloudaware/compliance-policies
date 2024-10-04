# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each Storage Account with outdated keys, under `Security + networking`, go to `Access keys`.
3. Click `Rotate key` next to the outdated key, then click `Yes` to the prompt confirming that you want to regenerate the access key.

After Azure regenerates the Access Key, you can confirm that `Access keys` reflects a `Last rotated` date of `(0 days ago)`.
