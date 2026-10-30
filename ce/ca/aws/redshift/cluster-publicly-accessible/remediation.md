# Remediation

## Disable Public Accessibility

To reduce the attack surface and prevent Internet exposure, configure Amazon Redshift clusters to be private by disabling public accessibility. This ensures the cluster endpoint is reachable only from within trusted networks in your VPC.

### **From Command Line**

Use the following AWS CLI command to disable public access for the specified Redshift cluster:

```sh
aws redshift modify-cluster \
    --cluster-identifier {{cluster-id}} \
    --no-publicly-accessible
```

> **Note:** This change may require a cluster restart to take effect, depending on the current configuration.

After applying the change, verify that applications and users can still connect to the cluster through approved private network paths.

### **Additional Considerations**

- **Private Connectivity:** Use Interface VPC Endpoints (AWS PrivateLink) to enable secure, private connectivity to Amazon Redshift without routing traffic over the public Internet.
- **Network Restrictions:** Apply the principle of least privilege by configuring security groups to allow inbound traffic only on the Redshift port (default: 5439) and only from approved internal IP ranges or VPC resources.
