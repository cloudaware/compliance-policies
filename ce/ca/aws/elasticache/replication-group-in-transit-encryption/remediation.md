# Remediation

## Enable In-Transit Encryption on an Existing Replication Group

Enabling **in-transit encryption** for an existing ElastiCache replication group is a two-step process. You must first set the **transit encryption mode** to `preferred`, which allows both encrypted and unencrypted connections. After all clients are migrated to use encrypted connections, you can then set the mode to `required`, which enforces encrypted connections only.

### **From Command Line**

1. **Set transit encryption mode to `preferred`**

   This step enables in-transit encryption and allows clients to connect using both encrypted and unencrypted connections:

   ```sh
   aws elasticache modify-replication-group \
     --replication-group-id {{replication-group-id}} \
     --transit-encryption-enabled \
     --transit-encryption-mode preferred \
     --apply-immediately
   ```

   Wait for the replication group to finish updating before proceeding to the next step.

2. **Migrate all clients** to use encrypted connections.

3. **Set transit encryption mode to `required`**

   Once all clients use encrypted connections, enforce encryption by setting the mode to `required`:

   ```sh
   aws elasticache modify-replication-group \
     --replication-group-id {{replication-group-id}} \
     --transit-encryption-enabled \
     --transit-encryption-mode required \
     --apply-immediately
   ```
