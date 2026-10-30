# Remediation

## Enable Contact Flow Logs

To ensure that contact flow execution data is captured and delivered to CloudWatch Logs, enable the **Contact Flow Logs** attribute for the Amazon Connect instance.

### **From Command Line**

Use the following command to enable contact flow logging for the specified instance:

```sh
aws connect update-instance-attribute \
    --instance-id {{connect-instance-id}} \
    --attribute-type CONTACTFLOW_LOGS \
    --value true
```

### Considerations

- Enabling contact flow logs applies only to new contact flow executions; historical data is not retroactively captured.
- Ensure that the Amazon Connect service-linked role has sufficient permissions to publish logs to the configured CloudWatch Logs log group.
- Additional costs may be incurred for CloudWatch Logs ingestion, storage, and retrieval.
