# Remediation

## Configure an IAM Password Policy

Set a strong password policy to enforce minimum length, complexity, expiration, and password reuse restrictions for IAM users.

### **From Console**

1. Sign in to the AWS Management Console with permissions to manage IAM account settings.

2. Navigate to the **IAM** service.

3. In the left navigation pane, select **Account Settings**.

4. In the **Password policy** section, choose **Change password policy** and configure the following (as an example):

   - **Enforce minimum password length**: Set to **14** characters.
   - **Require at least one uppercase letter (A-Z)**.
   - **Require at least one lowercase letter (a-z)**.
   - **Require at least one number**.
   - **Require at least one non-alphanumeric character** (e.g., ! @ # $ % ^ & *).
   - **Enable password expiration**: Set **Expire passwords in ≤ 90 days**.
   - **Prevent password reuse**: Remember **24 previous passwords**.

5. Click **Save changes** to apply the policy.

### **From Command Line**

Run the following AWS CLI command to configure the password policy:

    ```sh
    aws iam update-account-password-policy \
        --minimum-password-length 14 \
        --require-uppercase-characters \
        --require-lowercase-characters \
        --require-numbers \
        --require-symbols \
        --max-password-age 90 \
        --password-reuse-prevention 24
    ```
