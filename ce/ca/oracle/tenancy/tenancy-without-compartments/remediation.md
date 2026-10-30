# Remediation

## Create and Use a Customer-Managed Compartment

Create at least one active customer-managed compartment and use it as the administrative boundary for OCI workloads instead of relying only on the root compartment or the OCI-managed `ManagedCompartmentForPaaS` compartment.

Before remediation, confirm the following:

- The compartment naming standard aligns with your tenancy governance model.
- Required IAM policies are in place for administrators, automation, and services.
- Tags, quotas, budgets, and monitoring are configured for the new compartment as needed.
- Existing workloads that should not remain in the root compartment are planned for migration.

### **From Oracle Cloud Console**

1. Open `Identity & Security`, then select `Compartments`.
2. Click `Create Compartment`.
3. For the parent compartment, select the tenancy root compartment unless your governance model requires a different parent.
4. Enter a compartment name and description that match your organizational standard.
5. Click `Create Compartment`.
6. Review IAM policies and grant the required access to administrators, groups, and automation.
7. Move or deploy OCI resources into the new compartment according to your tenancy design.

### **From OCI CLI**

Create the compartment in the tenancy:

```sh
oci iam compartment create \
    --compartment-id {{tenancy-ocid}} \
    --name {{compartment-name}} \
    --description "{{compartment-description}}"
```

After remediation, verify that the compartment exists and is available for use:

```sh
oci iam compartment get \
    --compartment-id {{compartment-ocid}} \
    --query "data.\"lifecycle-state\""
```

Then update IAM policies and place workloads into the new compartment according to the intended administrative model.
