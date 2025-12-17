# Remediation

## Enable Logging for ECS Task Definitions

### **Using the AWS CLI**

1. **Retrieve the existing task definition**

    ```sh
    aws ecs describe-task-definition \
        --task-definition {{family-or-full-arn}} \
        --query 'taskDefinition' > task-def.json
    ```

2. **Edit `task-def.json`**

    Add a `logConfiguration` object to each container definition.

    ```json
    "containerDefinitions": [
        {
            "name": "{{my-app}}",
            "image": "{{my-image}}",
            "logConfiguration": {
                "logDriver": "{{awslogs}}",
                "options": {
                    "awslogs-group": "{{/ecs/my-app-logs}}",
                    "awslogs-region": "{{us-east-1}}",
                    "awslogs-stream-prefix": "{{ecs}}"
                }
            },
            ...
        }
    ]
    ```

    **Note:** Ensure that the Task Execution Role (`executionRoleArn`) has the following permissions:

    - `logs:CreateLogStream`
    - `logs:PutLogEvents`

3. **Register the updated task definition**

    ```sh
    aws ecs register-task-definition --cli-input-json file://task-def.json
    ```

4. **Update your ECS service to use the new task definition revision**
