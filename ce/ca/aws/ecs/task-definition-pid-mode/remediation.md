# Remediation

## Update the ECS Task Definition to Set PID Mode

### **Using the AWS CLI**

1. **Retrieve the existing task definition JSON**

    ```sh
    aws ecs describe-task-definition \
        --task-definition {{family-or-full-arn}} \
        --query 'taskDefinition' > task-def.json
    ```

2. **Edit `task-def.json`**

   Locate the pidMode key and remove it, or set it to task.

    ```json
    {
        "family": "{{my-task}}",
        ...
        "pidMode": "task", 
        ...
    }   
     ```

3. **Register the updated task definition**

    ```sh
    aws ecs register-task-definition --cli-input-json file://task-def.json
    ```

4. **Update your ECS service to use the new task definition revision**
