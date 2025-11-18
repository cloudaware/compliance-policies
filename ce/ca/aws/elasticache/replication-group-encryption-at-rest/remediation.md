# Remediation

## Enable At-Rest Encryption

Encryption at rest cannot be enabled on an existing ElastiCache replication group directly. You must create a new replication group from a backup with encryption enabled.

### **From Command Line**

1. **Create a manual backup of your existing replication group:**

   ```sh
   aws elasticache create-snapshot \
     --replication-group-id {{replication-group-id}} \
     --snapshot-name {{snapshot-name}}
   ```

2. **Create a new replication group from the snapshot with encryption at rest enabled:**

   ```sh
   aws elasticache create-replication-group \
     --replication-group-id {{new-replication-group-id}} \
     --replication-group-description "Replication group with at-rest encryption enabled" \
     --engine redis \
     --snapshot-name {{snapshot-name}} \
     --at-rest-encryption-enabled \
     --transit-encryption-enabled \
     --auth-token {{auth-token}} \
     --cache-node-type {{cache-node-type}} \
     --engine-version {{engine-version}} \
     --cache-subnet-group-name {{subnet-group}} \
     --security-group-ids {{security-group-id}}
   ```

3. **Update your application endpoints to point to the new replication group endpoint.**

4. **Delete the old replication group once the new encrypted group is verified and operational:**

   ```sh
   aws elasticache delete-replication-group \
     --replication-group-id {{old-replication-group-id}}
   ```
