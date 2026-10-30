# Remediation

## Decommission Unused Secrets

### **From the Command Line**

Before deleting a secret, confirm with the owning team or application that the secret is no longer required. If the secret is still needed but accessed infrequently, enable **automatic rotation** to ensure the credentials remain secure and up to date (see: [`AWS Secrets Manager Secret Automatic Rotation is not enabled` Remediation](../secret-automatic-rotation/remediation.md)).

Once the secret has been verified as unused, schedule it for deletion using the AWS CLI:

```sh
aws secretsmanager delete-secret \
    --secret-id {{secret-id}} \
    --recovery-window-in-days 30
```

> AWS Secrets Manager enforces a mandatory recovery window of **7 to 30 days**. During this period, the deletion can be canceled if the secret is needed again.
