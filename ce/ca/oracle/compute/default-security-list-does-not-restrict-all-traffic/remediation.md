# Remediation

## Restrict the Default Security List

### **From OCI CLI**

Retrieve the current default security list configuration:

```sh
oci network security-list get \
    --security-list-id {{default-security-list-ocid}}
```

Create updated rule files that remove:

- non-`ICMP` ingress rules with source `0.0.0.0/0`
- non-`ICMP` egress rules with destination `0.0.0.0/0`

Then apply the revised ingress and egress rule sets:

```sh
oci network security-list update \
    --security-list-id {{default-security-list-ocid}} \
    --ingress-security-rules file://ingress-rules.json \
    --egress-security-rules file://egress-rules.json
```

The `ingress-rules.json` and `egress-rules.json` files must contain the complete final rule sets for the default security list. Preserve only the rules that are still required after remediation, and verify that any removed public ingress or public egress is replaced by dedicated Security Lists or Network Security Groups where appropriate. Keep ICMP rules only when they are required for approved diagnostics or network control behavior.
