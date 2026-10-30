# Remediation

To delete any unused role in your AWS account, perform the following:

## From Command Line

When you use the AWS CLI to delete a role, you must first delete the policies associated with the role. Also, if you want to delete the associated instance profile that contains the role, you must delete it separately.

1. Run the `get-role` command using the IAM role name that you want to examine as a command parameter to retrieve its information:

    ```sh
    aws iam get-role \
        --role-name {{role-name}}
    ```

2. The command output should provide the metadata for the role, including the ARN of the role object.

3. Remove the role from all instance profiles that the role is in.

    a. To list all instance profiles that the role is associated with, enter the following command:

    ```sh
    aws iam list-instance-profiles-for-role \
        --role-name {{role-name}}
    ```

    b. The command output should provide all instance profiles that the role is associated with.

    c. To remove the role from an instance profile, enter the following command for each instance profile:

    ```sh
    aws iam remove-role-from-instance-profile \
        --instance-profile-name {{instance-profile-name}} \
        --role-name {{role-name}}
    ```

4. To Delete all inline policies that are associated with the role, perform the following:

    a. To list all policies that are in the role, enter the following command:

    ```sh
    aws iam list-role-policies \
        --role-name {{role-name}}
    ```

    b. The command output should display all inline policies associated with the role.

    c. To delete each policy from the role, enter the following command for each policy:

    ```sh
    aws iam delete-role-policy \
        --role-name {{role-name}} \
        --policy-name {{policy-name}}
    ```

5. Run the `delete-role` command to delete the IAM role:

    ```sh
    aws iam delete-role \
        --role-name {{role-name}}
    ```

6. If you don't intend to reuse the associated instance profiles, run the `delete-instance-profile` command to delete the IAM instance profile:

    ```sh
    aws iam delete-instance-profile \
        --instance-profile-name {{instance-profile-name}}
    ```

7. Repeat Steps 1-6 for each role that you want to delete from your AWS account.
