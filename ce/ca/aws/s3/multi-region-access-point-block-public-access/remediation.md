# Remediation

## Enable Block Public Access for S3 Multi-Region Access Points

The **Block Public Access** settings for an S3 Multi-Region Access Point are immutable and **cannot be modified** after creation. To remediate this issue, you must create a new multi-region access point (MRAP) with the correct configuration and migrate all dependencies from the incompliant one.

### **Remediation Steps**

1. **Create a new S3 Multi-Region Access Point**

   Use the following command to create a new MRAP point with all public access blocked. Ensure that the `--public-access-block-configuration` parameter includes all four blocking options set to `true`:

   ```sh
   aws s3control create-multi-region-access-point \
       --account-id {{account-id}} \
       --name {{new-mrap-name}} \
       --regions "Regions=[{Bucket={{bucket-name-1}}},{Bucket={{bucket-name-2}}}]" \
       --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
   ```

2. **Update All References to the New Multi-Region Access Point**

   Update all dependent resources to use the ARN of the new MRAP point instead of the old one. Check:

   - **IAM Policies**: Identity-based and resource-based policies referencing the MRAP point ARN.
   - **Application Configurations**: Code and config files that use the access point ARN for S3 operations.
   - **AWS Services**: Other services (e.g., Lambda, ECS) granted access via the old MRAP point.

3. **Validate and decommission the old access point**

   Before decommissioning the old MRAP, conduct comprehensive testing to ensure all applications and data workflows function correctly with the new MRAP. Perform integration tests that verify read and write operations across the different regions.

   Once validation is complete and the new MRAP is confirmed to be handling all traffic, delete the old, incompliant MRAP.

   ```sh
   aws s3control delete-multi-region-access-point \
       --account-id {{account-id}} \
       --name {{old-mrap-name}}
   ```
