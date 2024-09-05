# Remediation

## From Console

Perform the following to manage Unused Password (IAM user console access):

1. Login to the AWS Management Console.
2. Click `Services`.
3. Click `IAM`.
4. Click on `Users`.
5. Click on `Security Credentials`.
6. Select user whose `Console last sign-in` is greater than `45` days.
7. Click `Security credentials`.
8. In section `Sign-in credentials`, `Console password` click `Manage`.
9. Under Console Access select `Disable`.
10. Click `Apply`.

Perform the following to deactivate Access Keys:

1. Login to the AWS Management Console.
2. Click `Services`.
3. Click `IAM`.
4. Click on `Users`.
5. Click on `Security Credentials`.
6. Select any access keys that are over 45 days old and that have been used and click on `Make Inactive`.
7. Select any access keys that are over 45 days old and that have not been used and click the **X** to `Delete`.
