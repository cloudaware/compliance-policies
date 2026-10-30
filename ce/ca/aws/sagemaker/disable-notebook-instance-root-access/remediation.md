# Remediation

## Disable Root Access for SageMaker Notebook Instances

To remediate this finding, disable **Root Access** on the affected AWS SageMaker Notebook Instance. AWS requires the notebook instance to be stopped before modifying the root access configuration.

### **From Command Line**

1. **Stop the Notebook Instance**

    ```sh
    aws sagemaker stop-notebook-instance \
        --notebook-instance-name {{notebook-instance-name}}
    ```

2. **Disable Root Access**

    ```sh
    aws sagemaker update-notebook-instance \
        --notebook-instance-name {{notebook-instance-name}} \
        --root-access Disabled
    ```

3. **Restart the Notebook Instance**

    ```sh
    aws sagemaker start-notebook-instance \
        --notebook-instance-name {{notebook-instance-name}}
    ```

### **Notes**

- Disabling root access enforces the principle of least privilege and reduces the risk of unauthorized system-level changes.
- If system-level packages or configurations are required, use **Lifecycle Configurations** to perform approved setup tasks in a controlled and auditable manner.
- Ensure users are informed of this change, as commands requiring `sudo` will no longer be permitted.
