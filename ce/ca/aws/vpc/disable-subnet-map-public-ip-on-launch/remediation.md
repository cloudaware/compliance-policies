# Remediation

## Disable automatic public IP assignment at the subnet level

Disable both IPv4 and IPv6 auto-assignment settings on the subnet to ensure that IP address exposure is explicitly controlled.

## **From Command Line**

### Disable auto-assign public IPv4 addresses

```sh
aws ec2 modify-subnet-attribute \
    --subnet-id {{subnet-id}} \
    --no-map-public-ip-on-launch
```

### Disable auto-assign IPv6 addresses on instance creation

```sh
aws ec2 modify-subnet-attribute \
    --subnet-id {{subnet-id}} \
    --no-assign-ipv6-address-on-creation
```

## Considerations

- These changes apply only to instances launched **after** the modification.
- Existing instances retain their currently assigned IPv4 and IPv6 addresses.
