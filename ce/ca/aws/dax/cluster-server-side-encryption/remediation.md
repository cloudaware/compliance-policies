# Remediation

## From Command Line

### Important

DAX server-side encryption cannot be enabled on existing clusters.
You must provision a new encrypted cluster, migrate the application, and optionally delete the old cluster.

### Retrieve Existing Cluster Configuration

```sh
aws dax describe-clusters \
    --cluster-names {{existing-cluster-name}}
```

### Create a New Encrypted DAX Cluster

Use the information from the previous step to create a new cluster with encryption enabled:

```sh
aws dax create-cluster \
    --cluster-name {{new-cluster-name}} \
    --node-type {{node-type}} \
    --replication-factor {{replication-factor}} \
    --iam-role-arn {{iam-role-arn}} \
    --subnet-group-name {{subnet-group}} \
    --sse-specification Enabled=true
```

### Update Application to Use the New Cluster

Once the new cluster is in available status, update your application configuration to point to the new cluster’s endpoint:

```sh
aws dax describe-clusters \
    --cluster-names {{new-cluster-name}} \
    --query "Clusters[0].ClusterDiscoveryEndpoint.Address"
```

### Decommission the Old Cluster (Optional)

After successful migration and testing delete the old unencrypted cluster:

```sh
aws dax delete-cluster \
    --cluster-name {{existing-cluster-name}}
```
