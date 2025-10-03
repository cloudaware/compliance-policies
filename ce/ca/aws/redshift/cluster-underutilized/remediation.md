# Remediation

## From Command Line

### Resize the Cluster

```sh
aws redshift resize-cluster \
    --cluster-identifier {{cluster-id}} \
    --node-type {{new-node-type}}
    --number-of-nodes {{new-number-of-nodes}}
```

You may specify either `--node-type` or `--number-of-nodes`, or provide `both`, depending on the resizing requirement.
