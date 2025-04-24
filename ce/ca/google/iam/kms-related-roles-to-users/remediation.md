# Remediation

## From Google Cloud Console

1. Go to `IAM & Admin/IAM` using <https://console.cloud.google.com/iam-admin/iam>
2. For any member having `Cloud KMS Admin` and any of the `Cloud KMS CryptoKey Encrypter/Decrypter`, `Cloud KMS CryptoKey Encrypter`, `Cloud KMS CryptoKey Decrypter` roles granted/assigned, click the `Delete Bin` icon to remove the role from the member.

Note: Removing a role should be done based on the business requirement.
