# Remediation

## Migrate Azure Cosmos DB for PostgreSQL Server to Another Region with Read Replicas

### **Workflow Summary**

1. Create a read replica in the target region via the Azure portal.
2. Configure firewall rules and virtual network settings for the read replica.
3. Monitor replication status to ensure data synchronization.
4. Promote the read replica to become the new primary cluster in the target region.
5. Decommission the original primary cluster in the source region.

### **1. Create a Read Replica in the Target Region**

- In the Azure portal, navigate to the primary cluster.
- Under **Cluster management**, select **Replicate data globally**.
- Click **Add replica**, provide a name for the read replica, and select the target region.
- Click **OK** to initiate creation.

### **2. Configure Firewall Rules and Networking**

- Manually configure firewall rules and virtual network settings on the read replica to allow application access.
- Confirm that the replica inherits admin and user accounts from the primary cluster.

### **3. Monitor Replication Status**

- Use the Azure portal to monitor **Read Replica Lag** and confirm that data is synchronizing properly.
- Ensure CPU and RAM utilization on the read replica remain within acceptable limits.

### **4. Promote the Read Replica**

- Once replication is complete and verified, promote the read replica to the primary cluster.
- In the Azure portal, select the read replica, click **Promote**, and confirm the operation.
- After promotion, the read replica becomes the new primary cluster in the target region.

### **5. Decommission the Original Primary Cluster**

- After ensuring the new primary cluster is fully operational, decommission the source primary cluster.
- In the Azure portal, navigate to the original primary cluster and select **Delete**.
- Confirm deletion to stop billing for the source cluster.

### **Considerations**

- Expect brief downtime during the promotion process; plan accordingly.
- Monitor replication lag to ensure no data is lost before promotion.
- Verify that applications, firewall rules, and virtual networks are correctly configured for the new primary cluster.
