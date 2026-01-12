# Remediation

## Update KMS Key Policy

### **From Command Line**

1. Retrieve the existing key policy and save it locally:

    ```sh
    aws kms get-key-policy \
        --key-id {{key-id}} \
        --policy-name default \
        --output text > policy.json
    ```

2. Review and update `policy.json` to remove any statements that grant permissions to all principals (`"*"`).

    Ensure that access is restricted to explicitly defined and trusted AWS principals and that only the minimum required permissions are granted.

3. Apply the updated key policy:

    ```sh
    aws kms put-key-policy \
        --key-id {{key-id}} \
        --policy-name default \
        --policy file://policy.json
    ```
