# Remediation

## Update the ECS Task Definition to Update Privileged Parameter

### **Using the AWS CLI**

1. **Retrieve the existing task definition JSON**

    ```sh
    aws ecs describe-task-definition \
        --task-definition {{family-or-full-arn}} \
        --query 'taskDefinition' > task-def.json
    ```

2. **Edit `task-def.json`**

   For every container in the `containerDefinitions` list, change `privileged` to **false** or remove the key (default is false).

    ```json
    "containerDefinitions": [
        {
            "name": "{{app}}",
            "image": "{{image}}",
            "privileged": false,
            ...
        }
    ]
    ```

3. **Register the updated task definition**

    ```sh
    aws ecs register-task-definition --cli-input-json file://task-def.json
    ```

4. **Update your ECS service to use the new task definition revision**
