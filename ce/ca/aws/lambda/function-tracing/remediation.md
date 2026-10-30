# Remediation

## Enable Active X-Ray Tracing

Active tracing allows Lambda to send trace data to X-Ray for all incoming requests, providing full visibility into request execution and interactions with downstream services.

### **From Command Line**

1. Ensure the Lambda function has permission to upload trace data to X-Ray. Attach the `AWSXRayDaemonWriteAccess` managed IAM policy to the function execution role:

    ```sh
    aws iam attach-role-policy \
        --role-name {{function-execution-role}} \
        --policy-arn "arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess"
    ```

2. Enable active tracing on the Lambda function:

    ```sh
    aws lambda update-function-configuration \
        --function-name {{function-name}} \
        --tracing-config Mode=Active
    ```
