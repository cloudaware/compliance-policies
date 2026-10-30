# Remediation

## Rotate the Secret

### **From Command Line**

1. Rotate the secret by updating its value:

    ```sh
    aws secretsmanager update-secret \
        --secret-id {{secret-id}} \
        --secret-string file://{{secret-value.json}}
    ```

2. Validate that dependent applications and services can retrieve and use the updated secret value.

3. Confirm that the `AWSCURRENT` version reflects the new value:

    ```sh
    aws secretsmanager list-secret-version-ids \
        --secret-id {{secret-id}}
    ```

## Enable Automatic Rotation

### **From Command Line**

1. Confirm that the secret type supports automatic rotation and that a rotation Lambda function exists or can be deployed.

2. Enable automatic rotation:

    ```sh
    aws secretsmanager rotate-secret \
        --secret-id {{secret-id}} \
        --rotation-lambda-arn {{rotation-lambda-arn}} \
        --rotation-rules AutomaticallyAfterDays=90
    ```

3. Validate the rotation configuration and confirm that dependent applications can use values produced by the rotation workflow.

For more detailed setup steps, see the remediation for [`AWS Secrets Manager Secret Automatic Rotation is not enabled`](../secret-automatic-rotation/remediation.md).

## Notes

This policy excludes secrets with automatic rotation enabled. For secrets that remain manually rotated, document the procedure and schedule recurring rotations so the `AWSCURRENT` version does not exceed the 90-day threshold again.
