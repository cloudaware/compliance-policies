# Remediation

## Recreate the RDS Cluster with a Custom Master Username

Amazon RDS does **not** allow modifying the master username of an existing cluster. To remediate this finding, you must **recreate the cluster with a custom master username** and migrate the existing data to the new cluster. Restoring the cluster from a snapshot to modify the master username is also not support.

### **From Command Line**

1. **Retrieve the Current Cluster Configuration**

    Describe the existing RDS cluster to capture the configuration details needed to recreate it (engine, cluster class, networking, storage, availability, and parameter settings).

    ```sh
    aws rds describe-db-clusters \
        --region {{region}} \
        --db-cluster-identifier {{db-cluster-id}}
    ```

2. **Review the Output and Record Required Settings**

    From the command output, note the configuration values required for the new cluster, including the current master username, engine, instance classes, VPC security groups, subnet group, and storage settings.

    ```json
    {
    "DBClusters": [
        {
        "DBClusterIdentifier": "{{db-cluster-id}}",
        "MasterUsername": "admin",
        "Engine": "aurora-postgresql",
        "DBSubnetGroup": "default",
        "VpcSecurityGroups": [
            {"VpcSecurityGroupId": "sg-id"}
        ],
        "AvailabilityZones": ["us-east-1a","us-east-1b"],
        ...
        }
    ]
    }
    ```

3. **Create a New RDS Cluster with a Custom Master Username**

    Create a new cluster using the recorded configuration details, ensuring the **master username complies with your security policy**.

    ```sh
    aws rds create-db-cluster \
        --region {{region}} \
        --db-cluster-identifier {{new-db-cluster-id}} \
        --engine {{aurora-postgresql}} \
        --master-username {{custom-username}} \
        --master-user-password {{password}} \
        --vpc-security-group-ids {{sg-id1}} {{sg-id2}} \
        --db-subnet-group-name {{subnet-group}} \
        --availability-zones {{us-east-1a}} {{us-east-1b}} \
        --backup-retention-period 7 \
        --engine-version {{engine-version}}
    ```

    Include additional configuration flags to match your original cluster settings (parameter groups, tags, storage encryption, etc.).

4. **Migrate Data and Update Application Configuration**

    Once the new cluster status becomes `available`:

    - Migrate the data from the source cluster to the new cluster using a suitable migration method.
    - Update your applications to reference the **new cluster endpoint(s)**.

5. **Delete the Original RDS Cluster**

    After confirming the application is fully operational and all data is migrated, delete the original cluster to avoid further charges.

    ```sh
    aws rds delete-db-cluster \
        --region {{region}} \
        --db-cluster-identifier {{db-cluster-id}} \
        --final-db-snapshot-identifier {{db-instance-snapshot}}
    ```
