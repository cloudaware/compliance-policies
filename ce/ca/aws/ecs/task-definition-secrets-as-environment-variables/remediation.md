# Remediation

## Move Sensitive Data to AWS Secrets Manager

### **Using the AWS CLI**

Sensitive data should be stored securely and referenced in ECS Task Definitions via the `secrets` parameter rather than embedding it in `environment` variables.

1. **Store the secret in AWS Secrets Manager**

    ```sh
    aws secretsmanager create-secret \
        --name "{{app/db_password}}" \
        --secret-string "{{secret-password}}"
    ```

2. **Retrieve the existing task definition**

    ```sh
    aws ecs describe-task-definition \
        --task-definition {{family-or-full-arn}} \
        --query 'taskDefinition' > task-def.json
    ```

3. **Update `task-def.json`**

    Move the sensitive entry from `environment` to `secrets`.

    **Before:**

    ```json
    "environment": [
        { "name": "{{DB_PASSWORD}}", "value": "{{secret-password}}" }
    ]
    ```

    **After:**

    ```json
    "environment": [],
    "secrets": [
        { "name": "{{DB_PASSWORD}}", "valueFrom": "{{arn:aws:ssm:region:account:parameter/app/db_password}}" }
    ]
    ```

4. **Register the updated task definition**

    ```sh
    aws ecs register-task-definition --cli-input-json file://task-def.json
    ```

5. **Update the ECS service to use the new task definition revision**

    Ensure the Task Execution Role has the required permission to read the secret:

    ```text
    secretsmanager:GetSecretValue
    ```
