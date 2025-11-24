# Remediation

## Enable Encryption for SageMaker Notebook Instances Using Customer-Managed KMS Keys

To remediate this violation, create a new SageMaker notebook instance configured with a Customer-Managed Key (CMK) from AWS KMS and migrate any required data from the existing unencrypted instance. The encryption key cannot be modified for an existing notebook instance.

### **From Command Line**

1. **Create a new SageMaker notebook instance**
   Ensure that the desired CMK already exists before running the following command:

   ```bash
   aws sagemaker create-notebook-instance \
       --notebook-instance-name {{new-instance-name}} \
       --instance-type {{instance-type}} \
       --role-arn {{iam-role-arn}} \
       --kms-key-id {{kms-key-arn}}
   ```

2. **Migrate data and remove the non-compliant instance**

   - Once the new notebook instance is in the `InService` state, transfer any data, notebooks, or configurations from the old instance.
   - Thoroughly test the new notebook instance to ensure all data has been migrated correctly and that it functions as expected.
   - After confirming successful migration, stop and delete the old instance to prevent unnecessary costs:

   ```bash
   aws sagemaker delete-notebook-instance \
       --notebook-instance-name {{old-instance-name}}
   ```
