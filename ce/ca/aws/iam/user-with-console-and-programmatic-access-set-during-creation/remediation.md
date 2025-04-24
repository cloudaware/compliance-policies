# Remediation

Perform the following to delete access keys that do not pass the audit:

## From Console

1. Login to the AWS Management Console.
2. Click `Services`.
3. Click `IAM`.
4. Click on `Users`.
5. Click on `Security Credentials`.
6. As an Administrator.
    - Click on the **X** (`Delete`) for keys that were created at the same time as the user profile but have not been used.
7. As an IAM User.
    - Click on the **X** (`Delete`) for keys that were created at the same time as the user profile but have not been used.

## From Command Line

```sh
aws iam delete-access-key --access-key-id <access-key-id-listed> --user-name <users-name>
```
