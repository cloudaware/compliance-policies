# Remediation

## Restrict KMS key scope

Perform the following to update the IAM user inline policy by replacing wildcard KMS resources with the specific KMS key ARNs that should be allowed and, where possible, narrowing broad KMS actions.

## From Command Line

1. Retrieve the current inline policy document:

    ```sh
    aws iam get-user-policy \
        --user-name {{user-name}} \
        --policy-name {{policy-name}}
    ```

2. Update the policy document so that KMS decryption permissions are limited to only the specific KMS key ARNs that the user requires.

3. Apply the updated inline policy:

    ```sh
    aws iam put-user-policy \
        --user-name {{user-name}} \
        --policy-name {{policy-name}} \
        --policy-document file://policy.json
    ```

## Notes

Grant `kms:Decrypt` and `kms:ReEncryptFrom` only for the KMS keys that the user inline policy should allow.

Where possible, also narrow the allowed actions so the policy does not rely on broad permissions such as `kms:*` or `kms:ReEncrypt*`.
