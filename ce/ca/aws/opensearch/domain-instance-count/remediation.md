# Remediation

## Enable High Availability for OpenSearch Domain

To meet high-availability best practices, configure the OpenSearch Service domain with a minimum of three data nodes and enable Zone Awareness.

### **From Command Line**

Use the `update-domain-config` command to enable Zone Awareness and set the instance count to three data nodes. This configuration distributes nodes across three Availability Zones.

```sh
aws opensearch update-domain-config \
    --domain-name {{domain-name}} \
    --cluster-config '{
        "InstanceCount": 3,
        "ZoneAwarenessEnabled": true,
        "ZoneAwarenessConfig": {
            "AvailabilityZoneCount": 3
        }
    }'
```

### Additional Considerations

- The `AvailabilityZoneCount` value must match the number of Availability Zones supported in the selected AWS Region.
- For smaller regions that support only two Availability Zones, set `AvailabilityZoneCount` to `2` while maintaining a minimum of three data nodes.
- Changes to cluster configuration may trigger a rolling update and can temporarily impact cluster performance.
