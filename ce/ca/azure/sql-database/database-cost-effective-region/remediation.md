# Remediation

## Migrate Azure SQL Database Resources to Another Region with Azure Resource Mover

### **Workflow Summary**

1. Verify that you have Owner access on the subscription containing the resources to be moved.
2. Ensure the subscription has sufficient quota to create the resources in the target region.
3. Confirm that the target region supports the features of your Azure SQL databases and elastic pools.
4. In the target region, create a target server for each source server and ensure proper user access.
5. Check if the databases are encrypted with transparent data encryption (TDE) and plan for moving any associated Azure Key Vaults.
6. Remove advanced data security settings, autotuning settings, database alerts, and server-level firewall rules before initiating the move.
7. In the Azure portal, use Azure Resource Mover to select the source subscription and region, and the destination region.
8. Select the resources to move, ensuring they are supported for migration.
9. Review and initiate the move process, monitoring for any issues.
10. After the move, reconfigure advanced data security settings, autotuning settings, database alerts, and server-level firewall rules in the target region.

### **1. Verify Prerequisites**

Before initiating the migration:

- Ensure you have Owner access on the subscription containing the resources to be moved. This is necessary for Azure Resource Mover to create a system-assigned managed identity and assign the required roles.
- Verify that the subscription has sufficient quota to create the resources in the target region. If not, request additional limits.
- Check that the target region supports the features of your Azure SQL databases and elastic pools.
- In the target region, create a target server for each source server and ensure proper user access.
- If your databases are encrypted with transparent data encryption (TDE) and use your own encryption key in Azure Key Vault, plan for moving any associated Azure Key Vaults.

### **2. Prepare Resources for Migration**

- Remove advanced data security settings before initiating the move. After the move, reconfigure these settings in the target region.
- Remove autotuning settings before initiating the move. After the move, set up autotuning again in the target region.
- Remove database alert settings before initiating the move. After the move, reset these alerts in the target region.
- Remove server-level firewall rules before initiating the move. Database-level firewall rules are copied from the source server to the target server during the move. After the move, set up firewall rules for SQL Server in the target region.

### **3. Use Azure Resource Mover to Initiate the Migration**

1. In the Azure portal, search for "Resource Mover" and select it under Services.
2. Select Source and Destination:

   Choose the source subscription and region.
   Select the destination region to which you want to move the resources.
3. Select Resources to Move:

   - Select the Azure SQL databases and elastic pools you wish to move. Ensure they are supported for migration.
4. Review and Initiate Move:

   - Check the details of the resources to be moved.
   - Start the move process and monitor for any issues.

### **4. Post-Migration Configuration**

After the move is complete:

- Set up advanced data security settings in the target region.
- Set up autotuning again in the target region.
- Reset database alert settings in the target region.
- Set up server-level firewall rules for SQL Server in the target region.

### **Considerations**

- Not all features are supported for migration. For example, Azure SQL Database Hyperscale is not supported.
- Some services, like auto-tuning and database alerts, are not supported during the move and need to be reconfigured post-migration.
- If using customer-managed keys for TDE, ensure that the keys are accessible in the target region.
- Database-level firewall rules are copied during the move, but server-level firewall rules need to be set up in the target region.
