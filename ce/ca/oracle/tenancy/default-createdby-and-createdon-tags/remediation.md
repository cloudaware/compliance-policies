# Remediation

## Configure Root-Level Default Tags for CreatedBy and CreatedOn

Create root-level default tags named `CreatedBy` and `CreatedOn` in the tenancy root compartment so supported OCI resources inherit baseline creation metadata during provisioning.

### **From Oracle Cloud Console**

1. Log in to the OCI Console.
2. From the navigation menu, select `Governance & Administration`.
3. Under `Tenancy Management`, select `Tag Namespaces`.
4. Under `Compartment`, select the root compartment.
5. If no tag namespace exists, click `Create Tag Namespace`, enter a name and description, and click `Create Tag Namespace`.
6. Click the name of the tag namespace that will hold the required tag keys.
7. Click `Create Tag Key Definition`.
8. Enter the tag key name `CreatedBy`, add a description, and click `Create Tag Key Definition`.
9. Repeat the previous two steps to create the `CreatedOn` tag key definition.
10. From the navigation menu, select `Identity & Security`.
11. Under `Identity`, select `Compartments`.
12. Click the name of the root compartment.
13. Under `Resources`, select `Tag Defaults`.
14. Click `Create Tag Default`.
15. Select the tag namespace and the `CreatedBy` tag key, then enter `${iam.principal.name}` as the tag value.
16. Click `Create`.
17. Repeat the previous three steps to create the `CreatedOn` tag default using the value required by your tenancy tagging standard.
18. Verify that both tag defaults exist in the root compartment and are inherited by child compartments.

### **From OCI CLI**

Create a tag namespace in the root compartment:

```sh
oci iam tag-namespace create \
    --compartment-id {{tenancy-ocid}} \
    --name {{tag-namespace-name}} \
    --description "{{tag-namespace-description}}" \
    --query 'data.{"Tag Namespace OCID":id}' \
    --output table
```

Note the returned Tag Namespace OCID, then create the `CreatedBy` tag key definition:

```sh
oci iam tag create \
    --tag-namespace-id {{tag-namespace-ocid}} \
    --name CreatedBy \
    --description "{{CreatedBy-description}}" \
    --query 'data.{"Tag Key Definition OCID":id}' \
    --output table
```

Repeat the previous command to create the `CreatedOn` tag key definition.

Note the returned Tag Key Definition OCID for `CreatedBy`, then create the root-level tag default:

```sh
oci iam tag-default create \
    --compartment-id {{tenancy-ocid}} \
    --tag-definition-id {{CreatedBy-tag-definition-ocid}} \
    --value '${iam.principal.name}'
```

Create the `CreatedOn` tag default in the root compartment using the value required by your tenancy tagging standard.

After remediation, verify that both root-level tag defaults exist:

```sh
oci iam tag-default list \
    --compartment-id {{tenancy-ocid}} \
    --all
```
