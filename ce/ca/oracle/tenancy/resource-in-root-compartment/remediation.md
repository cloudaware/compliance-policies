# Remediation

## Move Resources Out of the Root Compartment

Create or identify dedicated target compartments for the affected workloads, then move each supported resource out of the root compartment. If OCI does not support moving a specific resource type after creation, recreate it in the correct compartment and migrate the workload.

Before remediation, confirm the following:

- The destination compartment exists and is governed by the correct IAM policies.
- Required administrators, automation, and service principals retain the necessary access after the move.
- Tags, monitoring, backups, and security controls remain aligned with the new compartment placement.
- The resource type supports an in-place compartment move. If it does not, plan for recreation and migration.

### **From Oracle Cloud Console**

1. Identify CIS-scoped resources that were created in the root compartment.
2. Open each affected resource and use the OCI `Move resource` action when it is available.
3. If the resource cannot be moved, recreate it in the destination compartment and migrate the workload.
4. Update IAM policies, automation, alerts, and documentation to reflect the new compartment.
5. Validate that the resource now belongs to the intended compartment and that dependent services continue to function normally.

### **From OCI CLI**

Create the destination compartment if needed:

```sh
oci iam compartment create \
    --compartment-id {{tenancy-ocid}} \
    --name {{destination-compartment-name}} \
    --description "{{destination-compartment-description}}"
```

For each affected bucket, update the bucket to use a compartment other than the root compartment:

```sh
oci os bucket update \
    --bucket-name {{bucket-name}} \
    --compartment-id {{destination-compartment-ocid}}
```

For other resource types that support compartment moves, use the relevant OCI CLI `change-compartment` command. Example:

```sh
oci <service> <resource> change-compartment \
    --resource-id {{resource-ocid}} \
    --compartment-id {{destination-compartment-ocid}}
```

If the resource type does not support `change-compartment`, recreate the resource in the destination compartment and migrate the workload or data before decommissioning the original resource in the root compartment.
