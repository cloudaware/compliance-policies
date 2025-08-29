# Remediation

## From Command Line

### Delete Unused NACLs

```sh
aws ec2 delete-network-acl \
    --network-acl-id {{network-acl-id}}
```
