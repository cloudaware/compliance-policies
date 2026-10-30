# Remediation

## Change the Default Master Username

To replace the default master username for an existing AWS Redshift Cluster, you must create a new cluster with a custom master username and migrate your data from the old cluster.

### **From Command Line**

1. **Retrieve cluster configuration**

   Use the `describe-clusters` command to obtain the current configuration of the cluster you plan to replace:

    ```sh
    aws redshift describe-clusters \
        --region {{region}} \
        --cluster-identifier {{cluster-id}}
    ```

   The output will include metadata such as node type, database name, and current master username, which you will need when creating the new cluster.

   Example:

    ```json
    {
        "Clusters": [
            {
                "PubliclyAccessible": true,
                "MasterUsername": "awsuser",
                "DBName": "awsclusterdb",
                "ClusterStatus": "available"
            }
        ]
    }
    ```

2. **Create a new cluster**

   Use the configuration information from the previous step to launch a new cluster with a custom master username:

    ```sh
    aws redshift create-cluster \
        --region {{region}} \
        --cluster-identifier {{new-cluster-id}} \
        --node-type {{node-type}} \
        --master-username {{custom-username}} \
        --master-user-password {{password}} \
        --no-publicly-accessible
    ```

3. **Migrate data**

   Unload the data from the old cluster and reload it into the new cluster.

4. **Update applications**

   Update your application configurations to use the endpoint of the new cluster.

5. **Delete the old cluster**

   Once the data migration is complete and applications point to the new cluster, delete the old cluster using the following command:

    ```sh
    aws redshift delete-cluster \
        --region {{region}} \
        --cluster-identifier {{old-cluster-id}} \
        --final-cluster-snapshot-identifier {{final-snapshot-id}}
    ```
