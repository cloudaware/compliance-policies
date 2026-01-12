# Remediation

## Remove Unused IAM Users

Remove IAM users that do not have an enabled console password or active programmatic access keys to reduce administrative overhead and minimize the identity attack surface.

### **From Console**

1. Sign in to the AWS Management Console.
2. Navigate to the **IAM** service.
3. In the left navigation pane, choose **Users**.
4. Select the IAM user you want to remove (refer to the **Audit** section to identify applicable users).
5. From the **User actions** dropdown menu, select **Delete user**.
6. In the **Delete user** dialog, review the associated resources and confirm by selecting **Yes, delete**.
7. Repeat steps 4–6 for each unused IAM user in the account.

### **From Command Line**

Run the `delete-user` command to remove a specified IAM user:

```sh
aws iam delete-user \
    --user-name {{user-name}}
```
