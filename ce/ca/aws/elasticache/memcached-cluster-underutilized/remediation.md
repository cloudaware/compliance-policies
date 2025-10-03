# Remediation

## From Command Line

### Check Allowed Modifications for the Cluster

```sh
aws elasticache list-allowed-node-type-modifications --cache-cluster-id {{cache-cluster-id}}
```

Note the `ScaleDownModifications` options.

### To Downsize the Cluster

You can modify an existing cluster's node type using the `modify-cache-cluster` command:

```bash
aws elasticache modify-cache-cluster \
    --cache-cluster-id {{cache-cluster-id}} \
    --cache-node-type {{new-node-type}} \
```

The `--apply-immediately` flag applies the change immediately; omit it to apply during the next maintenance window.
