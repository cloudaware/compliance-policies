# Remediation

Migrate Azure Virtual Machines and associated resources from higher-cost regions to more cost-efficient target regions using **Azure Resource Mover**, reducing ongoing Azure spend while maintaining continuity and compliance.

## Move Azure Virtual Machines to a Lower-Cost Region with Azure Resource Mover

### **Remediation Workflow (Summary)**

1. Perform pre-checks and validations to confirm region support, quotas, VM compatibility, and connectivity.
2. Select and add the VM and associated resources to a move collection.
3. Resolve dependencies such as virtual networks, network security groups, and storage accounts.
4. Prepare the resources by enabling replication and generating ARM templates.
5. Initiate the move to replicate data, create resources in the target region, and cut over workloads.
6. Commit the move to finalize migration and stop replication, or discard the move if it was only a test.
7. Complete post-move tasks by uninstalling agents, updating RBAC, deleting unused source resources, and cleaning up artifacts.

### **Prerequisites & Preparations**

Before beginning the migration, ensure:

1. **Supported Regions and Resources**

   Confirm that both the source and target regions are supported by Azure Resource Mover, and that the VM configurations (OS, disks, networking, etc.) are eligible for relocation.

2. **Permissions & Identity**

   The initiating account must have **Owner** access on the source subscription. Azure Resource Mover creates a system-assigned managed identity (MSI) and assigns it Contributor/User Access Administrator roles.

3. **Quota & Capacity**

   Ensure the target subscription and region have sufficient quota to host the moved resources. Request quota increases if required.

4. **Verify VM State & Configuration**

   * VM must be **powered on** with all disks attached.
   * Certificates and CRLs must be up-to-date.
   * Outbound connectivity must be available so Resource Mover agents can communicate.

### **Migration Steps**

#### 1. Select the Resources to Move

* In the Azure portal, open **Azure Resource Mover** → **Move across regions**.
* Choose the **source subscription/region** and **destination region**.
* Select the VM(s) and associated resources, review, and proceed.
* Resources enter **Prepare pending** state.

#### 2. Resolve Dependencies

* Validate dependencies and include required items (NSGs, VNets, storage).
* Optionally, adjust configuration for target resources (cannot downsize VM).

#### 3. Prepare the Resources

* Verify resources are ready and select **Prepare**.
* The Site Recovery mobility agent installs, data replication begins, and ARM templates are generated.
* Resources transition to **Initiate move pending**.

#### 4. Initiate the Move

* Select resources and choose **Initiate move**.
* Azure creates replica VMs in the destination region and cuts over workloads.
* Downtime occurs briefly during cutover.
* Resources move to **Commit move pending**.

#### 5. Commit or Discard

* **Commit**: finalize the migration, stop replication, and transition resources to **Delete source pending**.
* **Discard**: roll back test moves; resources revert to **Initiate move pending**.

#### 6. Post-Move Configuration

* Uninstall the mobility agent if not needed for future moves.
* Update RBAC and access controls.
* Delete unused source resources and migration artifacts (cache storage, recovery vaults, move collection resource groups).

### **Considerations & Best Practices**

* **Downtime**: A short downtime occurs during cutover.
* **VM Size**: Target VM size must be equal to or larger than the source.
* **Rollback**: Use the discard option for testing or rollback.
* **Cleanup**: Remove leftover resources to prevent unnecessary costs.
