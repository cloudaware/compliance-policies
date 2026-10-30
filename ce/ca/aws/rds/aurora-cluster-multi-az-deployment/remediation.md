# Remediation

## Enable Multi-AZ for an Aurora Cluster

To enable Multi-AZ deployment for an Amazon Aurora cluster, provision at least one Aurora Replica in a different Availability Zone than the primary instance. This ensures high availability at the compute layer and allows automatic failover in the event of an instance or AZ failure.

Multi-AZ for Aurora is achieved by adding a reader instance to the existing cluster and placing it in a separate AZ.

### **From Command Line**

Use the `create-db-instance` command to add an Aurora Replica to the cluster. Ensure that the replica is created in a different Availability Zone than the primary instance.

```sh
aws rds create-db-instance \
    --db-instance-identifier {{replica-instance-id}} \
    --db-cluster-identifier {{cluster-name}} \
    --engine {{aurora-postgresql}} \
    --db-instance-class {{db.r5.large}} \
    --availability-zone {{us-east-1b}}
```

### Considerations

- The Availability Zone specified for the replica must differ from the primary instance's AZ.
- Instance class and engine type must be compatible with the existing Aurora cluster.
- Once the replica is available, the cluster will support automatic failover without data loss.
- Additional AWS charges apply for the provisioned Aurora Replica.
