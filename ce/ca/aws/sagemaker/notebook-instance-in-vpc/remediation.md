# Remediation

## Deploy SageMaker Notebook Instances Within a VPC

To remediate this finding, provision a new AWS SageMaker Notebook Instance within the appropriate VPC and subnet, and migrate all required data and configurations from the existing incompliant instance. AWS does not allow the VPC configuration of a notebook instance to be modified after creation.

### **From Command Line**

### 1. Create a New Notebook Instance in the Desired VPC

Before proceeding, ensure that the target VPC, subnet, and security groups are properly configured.

```sh
aws sagemaker create-notebook-instance \
    --notebook-instance-name {{new-instance-name}} \
    --instance-type {{instance-type}} \
    --role-arn {{iam-role-arn}} \
    --subnet-id {{subnet-id}} \
    --security-group-ids {{security-group-ids}} \
    --direct-internet-access Disabled
```

### 2. Migrate Data and Decommission the Incompliant Instance

- Wait until the new notebook instance reaches the `InService` state.
- Migrate notebooks, datasets, and any required configurations from the existing instance to the newly created instance.
- Validate that the new notebook instance operates correctly and meets all networking and access requirements.
- After confirming a successful migration, stop and delete the original notebook instance to eliminate the incompliant configuration and avoid unnecessary costs.

```sh
aws sagemaker delete-notebook-instance \
    --notebook-instance-name {{old-instance-name}}
```
