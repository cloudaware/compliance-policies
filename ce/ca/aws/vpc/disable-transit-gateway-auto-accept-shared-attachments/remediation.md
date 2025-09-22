# Remediation

## From Command Line

To disable automatic acceptance of cross-account VPC attachments, update the Transit Gateway options:

```sh
aws ec2 modify-transit-gateway \
    --transit-gateway-id {{transit-gateway-id}} \
    --options AutoAcceptSharedAttachments=disable
```
