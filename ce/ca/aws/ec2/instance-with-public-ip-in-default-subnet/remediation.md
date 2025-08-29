# Remediation

## From Command Line

Consider two remediation paths:

- **Option 1**: Remove the public IP address if it is not required.
- **Option 2**: Relocate the instance to a purpose-built subnet (public or private, depending on requirements).

### Option 1: Remove the Public IP Address

If direct inbound access from the internet is not required, remove the public IP.

Modify network interface settings to disable public IP auto-assignment:

```sh
aws ec2 modify-network-interface-attribute \
    --network-interface-id {{network-interface-id}} \
    --no-associate-public-ip-address
```

### (Recommended) Disable the Auto-assign Public IPv4 Address Subnet Attribute

```sh
aws ec2 modify-subnet-attribute \
    --subnet-id {{subnet-id}} \
    --no-map-public-ip-on-launch
```

### Option 2: Move the Instance to a Custom Subnet

If the instance must remain publicly accessible, it should be deployed in a custom public subnet with explicit security controls (e.g., restrictive security groups, NACLs).

If it only requires outbound internet access, deploy it into a private subnet that routes traffic through a NAT Gateway.

1. Create a new subnet in the same VPC and Availability Zone if a suitable subnet does not already exist:

```sh
aws ec2 create-subnet \
    --vpc-id {{vpc-id}} \
    --cidr-block {{cidr-block}} \
    --availability-zone {{availability-zone}} \
```

2. Create an AMI of the existing instance:

```sh
aws ec2 create-image \
    --instance-id {{instance-id}} \
    --name {{ami-name}} \
    --description {{ami-description}}
    --no-reboot
```

3. Launch a new instance from the AMI into the custom subnet:

```sh
aws ec2 run-instances \
    --image-id {{image-id}} \
    --instance-type {{instance-type}} \
    --key-name {{keypair-name}} \
    --subnet-id {{custom-subnet-id}} \
    --security-group-ids {{sg-id}} \
    --associate-public-ip-address   # Only if public access is required
```

4. Validate application functionality. Once confirmed, terminate the original instance:

```sh
aws ec2 terminate-instances --instance-ids {{old-instance-id}}
```
