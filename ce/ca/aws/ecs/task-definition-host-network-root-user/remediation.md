# Remediation

## Update the ECS Task Definition to Run Containers as a Non-Root User

### **Using the AWS CLI**

1. **Retrieve the existing task definition JSON**

    ```sh
    aws ecs describe-task-definition \
        --task-definition {{family-or-full-arn}} \
        --query 'taskDefinition' > task-def.json
    ```

2. **Edit `task-def.json`**

   In the `containerDefinitions` array, update each container to run as a **non-root** user by setting the `user` parameter to a non-zero UID.

    ```json
    "containerDefinitions": [
        {
            "name": "{{my-app}}",
            "image": "{{my-image}}",
            "user": "{{1000}}",
            ...
        }
    ]
    ```

3. **Register the updated task definition**

    ```sh
    aws ecs register-task-definition --cli-input-json file://task-def.json
    ```

4. **Update your ECS service to use the new task definition revision**
