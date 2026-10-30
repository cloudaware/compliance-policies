# Remediation

## Restrict the Queue Policy

Review the queue policy and remove any statements that grant access to `*` or to overly broad external principals. Keep access limited to explicitly required AWS accounts, IAM roles, or AWS service principals. When the queue must accept messages from AWS services or trusted external producers or consumers, add restrictive conditions such as `aws:SourceArn` and `aws:SourceAccount`.

### **From Command Line**

1. Retrieve the current queue policy:

    ```sh
    aws sqs get-queue-attributes \
        --queue-url {{queue-url}} \
        --attribute-names Policy \
        --query 'Attributes.Policy' \
        --output text > policy.json
    ```

2. Update `policy.json` and remove or narrow any statements that allow public access.

    Ensure that:

    - the `Principal` is a specific AWS account, IAM role, or service principal;
    - the `Action` list contains only the minimum required `sqs:` permissions;
    - service integrations are constrained with conditions such as `aws:SourceArn` and `aws:SourceAccount`.

3. Apply the updated policy to the queue.

    Replace `{{policy-json}}` with the updated policy serialized as a compact JSON string:

    ```sh
    aws sqs set-queue-attributes \
        --queue-url {{queue-url}} \
        --attributes Policy='{{policy-json}}'
    ```

4. Re-run the policy evaluation to confirm the queue is no longer publicly accessible.
