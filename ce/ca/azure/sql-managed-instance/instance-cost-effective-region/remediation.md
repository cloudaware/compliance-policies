# Remediation

## Move Azure SQL Managed Instance Resources to a New Region with Replication Process

### **Workflow Summary**

1. Create a target SQL Managed Instance of the same size in the destination region.
2. Configure the network settings for the target instance.
3. Set up the `master` database on the target instance with the necessary logins.
4. Ensure that any customer-managed keys (BYOK) used for Transparent Data Encryption (TDE) are available in the target region.
5. Move any audit logs and configure auditing on the target instance.
6. Set up a failover group between the source and target instances to initiate database replication.
7. Monitor the replication process to ensure all databases are synchronized.
8. Perform a manual failover to the target instance to complete the migration.
9. Remove the resources from the source region.

### **1. Create Target SQL Managed Instance**

- Provision a new SQL Managed Instance in the destination region with the same specifications as the source instance.
- Ensure that the target instance is in the same virtual network or peered network as the source instance.

### **2. Configure Network Settings**

- Set up the necessary virtual network (VNet) and subnet configurations for the target instance.
- Ensure that the target instance has the required network security group (NSG) rules and route tables.

### **3. Set Up `master` Database**

- On the target instance, configure the `master` database with the same logins and permissions as the source instance.
- If using customer-managed keys for TDE, ensure that the keys are accessible in the target region.

### **4. Ensure Availability of Customer-Managed Keys**

- If your databases use customer-managed keys for TDE, add the encryption keys from the source region's Azure Key Vault to the target region's Key Vault.
- Set the appropriate key as the TDE protector on the target instance.

### **5. Move Audit Logs and Configure Auditing**

- If auditing is enabled on the source instance, move the storage container or event hub containing the audit logs to the target region.
- Configure auditing on the target instance to ensure compliance.

### **6. Set Up Failover Group**

- Create a failover group between the source and target instances.
- This will initiate the replication of all databases from the source to the target instance.

### **7. Monitor Replication Process**

- Use the `Get-AzSqlDatabaseInstanceFailoverGroup` cmdlet to monitor the replication status.
- Ensure that the `ReplicationState` property indicates that all databases are synchronized.

### **8. Perform Manual Failover**

- Once replication is complete, perform a manual failover to the target instance to complete the migration.
- Ensure that applications and services are redirected to the new instance.

### **9. Remove Resources from Source Region**

- After confirming that the target instance is fully operational, decommission the source instance and associated resources in the source region.
- Ensure that all data has been successfully migrated and that no dependencies remain on the source instance.

### **Considerations**

- Ensure that the target region supports all the features and configurations used by your SQL Managed Instance.
- Be aware of any potential downtime during the failover process and plan accordingly.
- Verify that all security and compliance requirements are met in the target region.
