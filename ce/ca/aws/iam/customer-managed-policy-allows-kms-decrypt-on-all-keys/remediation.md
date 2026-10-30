# Remediation

## Restrict KMS key scope

Perform the following to update the customer managed IAM policy by replacing wildcard KMS resources with the specific KMS key ARNs that should be allowed and, where possible, narrowing broad KMS actions.

## From Command Line

1. Identify the policy and its default version:

    ```sh
    aws iam get-policy \
        --policy-arn {{policy-arn}}
    ```

2. Retrieve the current policy document:

    ```sh
    aws iam get-policy-version \
        --policy-arn {{policy-arn}} \
        --version-id {{default-version-id}}
    ```

3. Update the policy document so that KMS decryption permissions are limited to the specific KMS key ARNs that are required.

4. Create a new policy version and set it as the default:

    ```sh
    aws iam create-policy-version \
        --policy-arn {{policy-arn}} \
        --policy-document file://policy.json \
        --set-as-default
    ```

5. If the policy already has five versions, delete an older non-default version and then create the new version:

    ```sh
    aws iam delete-policy-version \
    --policy-arn {{policy-arn}} \
    --version-id {{version-id}}
    ```

## Notes

Grant `kms:Decrypt` and `kms:ReEncryptFrom` only for the KMS keys that the policy should allow.

Where possible, also narrow the allowed actions so the policy does not rely on broad permissions such as `kms:*` or `kms:ReEncrypt*`.
