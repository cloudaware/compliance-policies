# Description

AWS Identity and Access Management (IAM) roles are essential to providing permissions to teams and applications using your provisioned AWS infrastructure. As time passes and needs change, some created roles might be left unused in your AWS account. It is highly recommended to remove these unused roles from your AWS account to prevent unauthorized access.

# Rationale

It's more secure to start with a minimum set of roles and add additional roles as necessary, rather than hold maximum set of roles.

# Audit

To determine if you have unused IAM roles, perform the following:

## From Command Line

1. Run list-roles command (OSX/Linux/UNIX) to list all IAM roles within your account

        aws iam list-roles \\
        --query 'Roles[*].RoleName'
2. The command output should return an array that contains all your IAM role names.

3. Run get-iam-role command (OSX/Linux/UNIX) using the IAM role name that you want to examine as a command parameter to retrieve its information:

        aws iam get-role \\
        --role-name myec2role

4. The command output should provide the metadata for the role, including the `RoleLastUsed` object.

5. The `RoleLastUsed` object contains the `LastUsedDate` and the `Region` in which the role was last used.

6. If `RoleLastUsed` is present but does not contain a value, then the role has not been used within the tracking period (i.e., last 400 days) and meets the unused criteria.

7. Every IAM role in the AWS account should be examined using steps 3 -6 to determine the usage.
