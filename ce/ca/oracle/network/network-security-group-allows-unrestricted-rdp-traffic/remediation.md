# Remediation

## Restrict Public RDP Access

### **From OCI CLI**

List the current ingress rules:

```sh
oci network nsg rules list \
    --nsg-id {{network-security-group-ocid}} \
    --direction INGRESS \
    --all
```

If the offending rule is not required, remove it by rule ID:

```sh
oci network nsg rules remove \
    --nsg-id {{network-security-group-ocid}} \
    --security-rule-ids '["{{security-rule-id}}"]'
```

If the rule is required but too broad, generate a sample update payload, edit it to replace public source CIDRs with approved administrative ranges, and apply the update:

```sh
oci network nsg rules update --generate-full-command-json-input > update-nsg-rules.json
oci network nsg rules update \
    --nsg-id {{network-security-group-ocid}} \
    --from-json file://update-nsg-rules.json
```

Update only the specific NSG rules that require correction and verify that unrestricted RDP access has been removed after the change.
