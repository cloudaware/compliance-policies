# Remediation

## Enable EBS Volume Encryption

Amazon WorkSpaces does not support enabling encryption on existing WorkSpaces. To remediate this finding, recreate the affected WorkSpace with EBS volume encryption enabled.

### **From Console**

1. Open the **Amazon WorkSpaces** console.
2. Choose **Create WorkSpaces** and complete the first three setup steps.
3. On the **Customization** step:
   - Select **Encrypt root volume** and **Encrypt user volume**.
   - For **Encryption Key**, select a customer-managed KMS key.
     > *Note:* The selected KMS key must be **symmetric**, because Amazon WorkSpaces does not support asymmetric KMS keys.
4. Choose **Create WorkSpace** to finish the WorkSpaces creation process.
