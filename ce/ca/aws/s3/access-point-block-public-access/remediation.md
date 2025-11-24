# Remediation

## Enable Block Public Access for S3 Access Points

The **Block Public Access** settings for an S3 Access Point are immutable and **cannot be modified** after the access point is created. To remediate this issue, you must create a new access point with the correct configuration and migrate all dependencies from the incompliant one.

### **Remediation Steps**

1. **Create a new S3 Access Point**

    Use the following command to create a new access point with all public access blocked. Ensure that the `--public-access-block-configuration` parameter includes all four blocking options set to `true`:

    ```sh
    aws s3control create-access-point \
        --account-id {{account-id}} \
        --name {{new-access-point-name}} \
        --bucket {{bucket-name}} \
        --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
    ```

2. **Update All References to the New Access Point**

    Update all dependent resources to use the ARN of the new access point instead of the old one.

    Common locations to check include:

    - **IAM Policies**: Identity-based and resource-based policies granting permissions via the access point ARN.
    - **Application Configurations**: Code and configuration files that reference the access point ARN for S3 operations.
    - **AWS Services**: Other services (e.g., AWS Lambda, ECS) that have been granted access through the access point.

3. **Validate and decommission the old access point**

    Before deleting the old access point, validate that all applications and processes function correctly using the new access point. Conduct integration tests to verify data accessibility and operational workflows.

    Once validation is complete and you are confident that the new access point is fully operational, delete the old access point"

    ```sh
    aws s3control delete-access-point \
        --account-id {{account-id}} \
        --name {{old-access-point-name}}
    ```
