# Remediation

## Restrict Access to Public AMIs

To remove public launch permissions from an Amazon Machine Image (AMI) and restrict access to private or trusted accounts, perform the following steps.

### **From Command Line**

Run the `modify-image-attribute` command to remove public launch permissions from the selected AMI:

```sh
aws ec2 modify-image-attribute \
    --region us-east-1 \
    --image-id ami-0abcd1234abcd1234 \
    --launch-permission "{\"Remove\":[{\"Group\":\"all\"}]}"
```

Repeat this step for each AMI that should no longer be publicly accessible.
