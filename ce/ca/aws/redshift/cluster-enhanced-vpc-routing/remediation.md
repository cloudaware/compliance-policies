# Remediation

## Enable Enhanced VPC Routing

To ensure that data transfers between Amazon Redshift and external data repositories remain within your VPC, enable **Enhanced VPC Routing** on the cluster. This allows you to apply network-level security controls and improve visibility into data movement.

### **From Command Line**

Use the following AWS CLI command to enable Enhanced VPC Routing for the specified Redshift cluster:

```sh
aws redshift modify-cluster \
    --cluster-identifier {{cluster-id}} \
    --enhanced-vpc-routing
```

> **Note:** Enabling Enhanced VPC Routing may require a cluster restart and proper VPC configuration (such as routes, NAT gateways, or VPC endpoints) to ensure that `COPY` and `UNLOAD` operations continue to function as expected.

### **Post-Remediation Validation**

- Verify that the cluster status returns to **available** after the change.
- Confirm that `COPY` and `UNLOAD` operations complete successfully using the configured private network paths.
- Review VPC Flow Logs to validate that traffic is routed through the VPC as intended.
