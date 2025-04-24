# Description

It is recommended that the principle of 'Separation of Duties' is enforced while assigning KMS related roles to users.

## Rationale

The built-in/predefined IAM role `Cloud KMS Admin` allows the user/identity to create, delete, and manage service account(s). The built-in/predefined IAM role `Cloud KMS CryptoKey Encrypter/Decrypter` allows the user/identity (with adequate privileges on concerned resources) to encrypt and decrypt data at rest using an encryption key(s).

The built-in/predefined IAM role `Cloud KMS CryptoKey Encrypter` allows the user/identity (with adequate privileges on concerned resources) to encrypt data at rest using an encryption key(s). The built-in/predefined IAM role `Cloud KMS CryptoKey Decrypter` allows the user/identity (with adequate privileges on concerned resources) to decrypt data at rest using an encryption key(s).

Separation of duties is the concept of ensuring that one individual does not have all necessary permissions to be able to complete a malicious action. In Cloud KMS, this could be an action such as using a key to access and decrypt data a user should not normally have access to. Separation of duties is a business control typically used in larger organizations, meant to help avoid security or privacy incidents and errors. It is considered best practice.

No user(s) should have `Cloud KMS Admin` and any of the `Cloud KMS CryptoKey Encrypter/Decrypter`, `Cloud KMS CryptoKey Encrypter`, `Cloud KMS CryptoKey Decrypter` roles assigned at the same time.

## Impact

Removed roles should be assigned to another user based on business needs.

## Audit

### From Google Cloud Console

1. Go to `IAM & Admin/IAM` by visiting: <https://console.cloud.google.com/iam-admin/iam>
2. Ensure no member has the roles `Cloud KMS Admin` and any of the `Cloud KMS CryptoKey Encrypter/Decrypter`, `Cloud KMS CryptoKey Encrypter`, `Cloud KMS CryptoKey Decrypter` assigned.

### From Google Cloud CLI

1. List all users and role assignments:

     gcloud projects get-iam-policy PROJECT_ID

2. Ensure that there are no common users found in the member section for roles `cloudkms.admin` and any one of `Cloud KMS CryptoKey Encrypter/Decrypter`, `Cloud KMS CryptoKey Encrypter`, `Cloud KMS CryptoKey Decrypter`

## References

1. <https://cloud.google.com/kms/docs/separation-of-duties>

## Additional Information

Users granted with Owner (roles/owner) and Editor (roles/editor) have privileges equivalent to `Cloud KMS Admin` and `Cloud KMS CryptoKey Encrypter/Decrypter`. To avoid misuse, Owner and Editor roles should be granted to a very limited group of users. Use of these primitive privileges should be minimal.
