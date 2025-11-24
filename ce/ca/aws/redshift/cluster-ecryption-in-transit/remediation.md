# Remediation

## Enforce SSL/TLS Connections for Redshift Clusters

To ensure all client connections use SSL/TLS, update the Redshift cluster parameter group to enable the `require_ssl` parameter.

### Prerequisites

- Verify cluster status is available before making changes
- Plan for a maintenance window as a reboot is required

### **From Command Line**

1. **Identify the Parameter Group Associated with the Cluster**

    Retrieve the name of the parameter group attached to your Redshift cluster:

    ```sh
    aws redshift describe-clusters \
        --cluster-identifier {{cluster-id}} \
        --query "Clusters[0].ClusterParameterGroups[0].ParameterGroupName" \
        --output text
    ```

2. **Update the `require_ssl` Parameter**

    Modify the identified parameter group to enforce SSL/TLS connections:

    ```sh
    aws redshift modify-cluster-parameter-group \
        --parameter-group-name {{parameter-group-name}} \
        --parameters "ParameterName=require_ssl,ParameterValue=true"
    ```

3. **Reboot the Cluster**

    Apply the updated parameter group settings by rebooting the cluster:

    ```sh
    aws redshift reboot-cluster \
        --cluster-identifier {{cluster-id}}
    ```
