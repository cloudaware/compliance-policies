# Remediation

## Deactivate Redundant IAM SSH Public Key

Deactivate any unnecessary or redundant IAM SSH public keys used to authenticate access to AWS CodeCommit repositories.

### **From Command Line**

Run the `update-ssh-public-key` command to deactivate a non-operational or redundant SSH public key associated with the specified IAM user:

```sh
aws iam update-ssh-public-key \
    --region {{region}} \
    --user-name {{user-name}} \
    --ssh-public-key-id {{ssh-key-id}} \
    --status Inactive
```

After deactivation, confirm that the remaining active SSH public key is functioning correctly and that access to AWS CodeCommit repositories is not disrupted.
