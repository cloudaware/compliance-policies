# Remediation

## Disable Direct Internet Access for SageMaker Notebook Instances

To remediate this finding, provision a new AWS SageMaker Notebook Instance with **Direct Internet Access** disabled and migrate all required data and configurations from the existing incompliant instance. AWS does not allow the internet access setting of a notebook instance to be modified after creation.

### **From Command Line**

#### 1. Create a New Notebook Instance Without Direct Internet Access

Create a replacement notebook instance and explicitly disable direct internet access. Ensure the instance is associated with the appropriate VPC, subnets, and IAM role.

```sh
aws sagemaker create-notebook-instance \
    --notebook-instance-name {{new-instance-name}} \
    --instance-type {{instance-type}} \
    --role-arn {{iam-role-arn}} \
    --subnet-id {{subnet-id}} \
    --security-group-ids {{security-group-ids}} \
    --direct-internet-access Disabled
```

#### 2. Migrate Data and Validate Functionality

- Wait until the new notebook instance reaches the `InService` state.
- Migrate notebooks, datasets, and any required configurations from the existing instance to the newly created instance (for example, using Amazon S3 or shared storage).
- Verify that the new instance operates correctly and that all dependencies and network access requirements are satisfied through the VPC.

#### 3. Decommission the Incompliant Notebook Instance

After confirming successful migration and validation, stop and delete the original notebook instance to eliminate the incompliant configuration and avoid unnecessary costs.

```sh
aws sagemaker delete-notebook-instance \
    --notebook-instance-name {{old-instance-name}}
```
