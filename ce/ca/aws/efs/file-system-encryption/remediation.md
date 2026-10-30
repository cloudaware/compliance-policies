# Remediation

EFS file system data-at-rest encryption must be enabled when you create the file system. If an EFS file system was created without encryption, you must create another file system with the correct configuration and transfer the data.

Steps to create an EFS file system with data encrypted at rest:

## From Console

1. Log in to the AWS Management Console and navigate to the `Elastic File System (EFS)` dashboard.
2. Select `File Systems` from the left navigation panel.
3. Click `Create File System` button from the dashboard top menu to start the file system setup process.
4. On the `Configure file system access` configuration page, perform the following actions.

    - Choose the right VPC from the VPC dropdown list.
    - Within `Create mount targets` section, select the checkboxes for all of the Availability Zones (AZs) within the selected VPC. These will be your mount targets.
    - Click `Next step` to continue.

5. Perform the following on the `Configure optional settings` page.

    - Create `tags` to describe your new file system.
    - Choose `performance mode` based on your requirements.
    - Select the `Enable encryption` checkbox and choose `aws/elasticfilesystem` from the Select KMS master key dropdown list to enable encryption for the new file system using the default master key provided and managed by AWS KMS.
    - Click `Next step` to continue.

6. Review the file system configuration details on the `review and create` page and then click `Create File System` to create your new AWS EFS file system.
7. Copy the data from the old unencrypted EFS file system onto the newly created encrypted file system.
8. Remove the unencrypted file system as soon as your data migration to the newly created encrypted file system is completed.
9. Change the AWS region from the navigation bar and repeat the entire process for other AWS regions.

## From Command Line

1. Run `describe-file-systems` command to describe the configuration information available for the selected (unencrypted) file system (see Audit section to identify the right resource):

    ```sh
    aws efs describe-file-systems --region {{region-name}} --file-system-id {{file-system-id}}
    ```

2. The command output should return the requested configuration information.
3. To provision a new AWS EFS file system, generate a universally unique identifier (UUID) to create the token required by the `create-file-system` command. You can use a randomly generated UUID from <https://www.uuidgenerator.net>.
4. Run `create-file-system` command using the unique token created at the previous step:

    ```sh
    aws efs create-file-system \
        --region {{region-name}} \
        --creation-token {{creation-token}} \
        --performance-mode generalPurpose \
        --encrypted
    ```

5. The command output should return the new file system configuration metadata.
6. Run the `create-mount-target` command using the newly created EFS file system ID returned at the previous step as the identifier and the ID of the Availability Zone (AZ) that will represent the mount target:

    ```sh
    aws efs create-mount-target --region {{region-name}} --file-system-id {{file-system-id}} --subnet-id {{subnet-id}}
    ```

7. The command output should return the new mount target metadata.
8. Now you can mount your file system from an EC2 instance.
9. Copy the data from the old unencrypted EFS file system onto the newly created encrypted file system.
10. Remove the unencrypted file system as soon as your data migration to the newly created encrypted file system is completed.

    ```sh
    aws efs delete-file-system --region {{region-name}} --file-system-id {{unencrypted-file-system-id}}
    ```

11. Change the AWS region by updating `--region` and repeat the entire process for other AWS regions.
