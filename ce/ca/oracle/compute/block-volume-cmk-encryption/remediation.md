# Remediation

## Encrypt the Block Volume with a Customer Managed Key

Configure the affected block volume to use a customer managed key from OCI Vault. Before applying the change, confirm that the target key is enabled and that the Block Volume service has permission to use it.

### **From Oracle Cloud Console**

1. Follow the audit procedure in the policy description to identify affected block volumes.
2. For each affected block volume, click the link under `Display name`.
3. If `Encryption Key` is set to `Oracle-managed key`, click `Assign` next to `Oracle-managed key`.
4. Select the target Vault compartment and Vault.
5. Select the target master encryption key compartment and master encryption key.
6. Click `Assign`.
7. Confirm that `Encryption Key` shows the intended customer managed key.

### **From OCI CLI**

Assign a customer managed key to the existing block volume:

```sh
oci bv volume-kms-key update \
    --volume-id {{volume-ocid}} \
    --kms-key-id {{kms-key-ocid}}
```

When creating a new block volume, specify the customer managed key at creation:

```sh
oci bv volume create \
    --compartment-id {{compartment-ocid}} \
    --availability-domain {{availability-domain}} \
    --display-name {{volume-name}} \
    --size-in-gbs {{size-in-gbs}} \
    --kms-key-id {{kms-key-ocid}}
```

After remediation, verify that the volume references the intended key:

```sh
oci bv volume get \
    --volume-id {{volume-ocid}} \
    --query "data.\"kms-key-id\""
```
