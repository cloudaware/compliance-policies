# Remediation

## Encrypt the Boot Volume with a Customer Managed Key

Configure the affected boot volume to use a customer managed key from OCI Vault. Before applying the change, confirm that the target key is enabled and that the Compute and Block Volume services have permission to use it.

### **From Oracle Cloud Console**

1. Follow the audit procedure above.
2. For each boot volume in the returned results, click the boot volume name.
3. Click `Assign` next to `Encryption Key`.
4. Select the `Vault Compartment` and `Vault`.
5. Select the `Master Encryption Key Compartment` and `Master Encryption Key`.
6. Click `Assign`.

### **From OCI CLI**

For each affected boot volume, assign the target Vault key:

```sh
oci bv boot-volume update \
    --boot-volume-id {{boot-volume-ocid}} \
    --kms-key-id {{kms-key-ocid}}
```

After remediation, verify that the boot volume references the intended customer managed key:

```sh
oci bv boot-volume get \
    --boot-volume-id {{boot-volume-ocid}} \
    --query "data.\"kms-key-id\""
```
