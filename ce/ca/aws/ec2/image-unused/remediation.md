# Remediation

## Remove Unused AMIs

To clean up unused Amazon Machine Images (AMIs), deregister the image and delete any associated snapshots.

### **From Command Line**

Run the following command to deregister an unused AMI and delete its associated snapshots:

```sh
aws ec2 deregister-image \
  --region {{us-east-1}} \
  --image-id {{image-id}} \
  --delete-associated-snapshots # If a snapshot is associated with multiple AMIs, it is not deleted, regardless of this setting.
```

Repeat this process for all unused AMIs identified in your AWS account.
