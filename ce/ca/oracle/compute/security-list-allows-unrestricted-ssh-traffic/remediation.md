# Remediation

## Restrict Public SSH Access

### **From OCI CLI**

Review the current ingress rules before updating the security list:

```sh
oci network security-list get \
    --security-list-id {{security-list-ocid}}
```

Update the security list with a revised ingress rule set that removes public SSH access or restricts SSH to trusted source CIDRs:

```sh
oci network security-list update \
    --security-list-id {{security-list-ocid}} \
    --ingress-security-rules file://ingress-rules.json
```

The `ingress-rules.json` file must contain the complete intended ingress rule set for the security list. Preserve required business traffic and replace any SSH rule sourced from `0.0.0.0/0` or `::/0` with narrowly scoped CIDR ranges.
