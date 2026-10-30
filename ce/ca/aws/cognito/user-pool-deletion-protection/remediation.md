# Remediation

## Enable Deletion Protection

To reduce the risk of accidental deletion, enable deletion protection on the Cognito user pool.

### **From Command Line**

```sh
aws cognito-idp update-user-pool \
    --region {{region}} \
    --user-pool-id {{user-pool-id}} \
    --deletion-protection ACTIVE
```

After the change, review any administrative procedures or automation that intentionally delete user pools to ensure they explicitly disable deletion protection as part of an approved decommissioning workflow.
