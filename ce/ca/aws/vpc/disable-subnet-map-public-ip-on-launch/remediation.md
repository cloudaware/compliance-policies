# Remediation

## From Command Line

### Disable the Auto-assign Public IPv4 Address Subnet Attribute

```sh
aws ec2 modify-subnet-attribute \
    --subnet-id {{subnet-id}} \
    --no-map-public-ip-on-launch
```
