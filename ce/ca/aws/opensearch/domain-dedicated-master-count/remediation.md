# Remediation

## Enable Dedicated Master Nodes for OpenSearch Domain

To improve cluster stability and ensure quorum-based master elections, configure the OpenSearch Service domain with dedicated master nodes and set the master node count to a minimum of three.

### **From Command Line**

Use the `update-domain-config` command to enable dedicated master nodes and configure the recommended master node count:

```sh
aws opensearch update-domain-config \
    --domain-name {{domain-name}} \
    --cluster-config '{
        "DedicatedMasterEnabled": true,
        "DedicatedMasterCount": 3
        "DedicatedMasterType": "{{m5.large.search}}" 
    }'
```

### Additional Considerations

- Use an **odd number** of dedicated master nodes (for example, 3 or 5) to maintain quorum during failures.
- Dedicated master nodes should not be used for data or ingest workloads.
- Enabling dedicated master nodes triggers a blue/green update of the domain, which may cause a brief period of reduced availability or increased latency. Plan the change accordingly.
