# Remediation

## Recreate the EFS Mount Target in a Private Subnet

AWS EFS mount targets cannot be moved between subnets. Create a new mount target in a subnet where **Map Public IP On Launch** is disabled, and then delete the existing mount target.

### 1. Create a new mount target in a private subnet

#### **From AWS CLI**

```sh
aws efs create-mount-target \
    --file-system-id {{file-system-id}} \
    --subnet-id {{private-subnet-id}} \
    --security-groups {{security-group-id}} \
    --region {{aws-region}}
```

> **Note:**
> Ensure the selected subnet does not auto-assign public IP addresses.

### 2. Verify the new mount target

Confirm that the new mount target is in the **available** state before proceeding:

```sh
aws efs describe-mount-targets \
    --file-system-id {{file-system-id}} \
    --region {{aws-region}}
```

Verify application connectivity to the EFS file system

### 3. Delete the existing mount target in the public subnet

After verification, remove the old mount target:

```sh
aws efs delete-mount-target \
    --mount-target-id {{old-mount-target-id}} \
    --region {{aws-region}}
```
