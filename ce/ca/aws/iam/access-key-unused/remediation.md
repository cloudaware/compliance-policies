# Remediation

## Decommission Unused IAM Access Keys

Deactivate any unnecessary or unused IAM access keys to reduce the risk of unauthorized access.

### **From Command Line**

Run the `update-access-key` command to deactivate an unused or non-operational IAM access key:

```sh
aws iam update-access-key \
    --access-key-id {{access-key-id}} \
    --status Inactive
```

After deactivation, verify that the key is no longer required by any applications or services. Once confirmed, consider deleting the access key to permanently remove it:

```sh
aws iam delete-access-key \
    --access-key-id {{access-key-id}}
```
