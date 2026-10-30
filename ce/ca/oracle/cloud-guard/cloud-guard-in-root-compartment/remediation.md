# Remediation

## Enable Cloud Guard in the Root Compartment

### **From Oracle Cloud Console**

1. Type `Cloud Guard` into the search box at the top of the Console.
2. Click `Cloud Guard` from the `Services` submenu.
3. Click `Enable Cloud Guard`.
4. Click `Create Policy`.
5. Click `Next`.
6. Under `Reporting Region`, select a region.
7. Under `Compartments To Monitor`, choose `Select Compartment`.
8. Under `Select Compartments`, select the root compartment.
9. Under `Configuration Detector Recipe`, select `OCI Configuration Detector Recipe (Oracle Managed)`.
10. Under `Activity Detector Recipe`, select `OCI Activity Detector Recipe (Oracle Managed)`.
11. Click `Enable`.

### **From OCI CLI**

1. Create an OCI IAM policy that grants Cloud Guard the required read permissions in the tenancy:

    ```sh
    oci iam policy create \
        --compartment-id {{tenancy-id}} \
        --name "CloudGuardPolicies" \
        --description "Cloud Guard Access Policy" \
        --statements '[
          "allow service cloudguard to read vaults in tenancy",
          "allow service cloudguard to read keys in tenancy",
          "allow service cloudguard to read compartments in tenancy",
          "allow service cloudguard to read tenancies in tenancy",
          "allow service cloudguard to read audit-events in tenancy",
          "allow service cloudguard to read compute-management-family in tenancy",
          "allow service cloudguard to read instance-family in tenancy",
          "allow service cloudguard to read virtual-network-family in tenancy",
          "allow service cloudguard to read volume-family in tenancy",
          "allow service cloudguard to read database-family in tenancy",
          "allow service cloudguard to read object-family in tenancy",
          "allow service cloudguard to read load-balancers in tenancy",
          "allow service cloudguard to read users in tenancy",
          "allow service cloudguard to read groups in tenancy",
          "allow service cloudguard to read policies in tenancy",
          "allow service cloudguard to read dynamic-groups in tenancy",
          "allow service cloudguard to read authentication-policies in tenancy"
        ]'
    ```

2. Enable Cloud Guard for the root compartment:

    ```sh
    oci cloud-guard configuration update \
        --reporting-region {{region-name}} \
        --compartment-id {{tenancy-id}} \
        --status "ENABLED"
    ```
