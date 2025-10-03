# Remediation

## Migrate Azure SQL Server VM to a Different Region with Azure Site Recovery

### **Workflow Summary**

1. Verify that the source SQL Server VM and target region meet all prerequisites for migration.
2. Prepare the source VM by updating certificates, installing updates, and confirming network connectivity.
3. Configure Azure Site Recovery by creating a Recovery Services vault and enabling replication for the VM.
4. Perform a test failover to the target region to validate functionality and replication.
5. Execute the actual migration by initiating a failover and committing the move to the target region.
6. Clean up post-migration by stopping replication, removing the source VM from the vault, and deleting residual resources.

### **1. Verify Prerequisites**

Before initiating the migration, confirm the following:

- **Source and Target Region Support**: Ensure that moving from your source region to your target region is supported.
- **Permissions**: Verify that you have the necessary permissions: Virtual Machine Contributor and Site Recovery Contributor.
- **SQL IaaS Agent**: The SQL IaaS Agent extension must be installed on the VM.
- **Network Configuration**: Ensure the source VM has internet access and no authentication proxies block connectivity.

### **2. Prepare Source SQL Server VM**

- Install the latest root certificates on the SQL Server VM.
- **For Windows VMs**: Apply all Windows updates.
- **For Linux VMs**: Update trusted root certificates and certificate revocation lists.
- Confirm outbound internet connectivity.

### **3. Configure Azure Site Recovery**

1. Create a Recovery Services Vault in the source region.
2. Enable replication with Azure-to-Azure replication settings, selecting source and target regions.
3. Add the source VM to the vault and start initial replication.

### **4. Test Migration**

1. Initiate the test failover to the target region.
2. Validate functionality to ensure SQL Server and applications operate correctly.
3. Clean up test resources to avoid unnecessary costs.

### **5. Execute Migration**

1. Initiate migration by performing the failover and committing the move.
2. Monitor migration progress to confirm successful completion without errors.

### **6. Post-Migration Cleanup**

1. Stop replication and remove the source VM from the Recovery Services vault.
2. Delete residual resources in the source region that are no longer needed.
3. Verify billing to ensure charges apply to the correct resources and region.

### **Considerations**

- Expect a brief downtime during failover.
- Ensure data consistency before committing the migration.
- Confirm that the target region complies with data residency and compliance requirements.
