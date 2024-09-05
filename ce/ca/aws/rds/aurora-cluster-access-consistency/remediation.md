# Remediation

## Identify the Violating AWS RDS Aurora Clusters

### From Console

1. Log in to the AWS management console and navigate to the RDS dashboard at [AWS RDS Console](https://console.aws.amazon.com/rds/).

2. In the left navigation panel, choose `Databases`.

3. Select the Aurora database cluster that you want to examine. Check the database engine type in the `Engine` column (e.g., Aurora MySQL or Aurora PostgreSQL).

4. Click on the name of the writer/reader database instance within the selected Aurora cluster.

5. Select the `Connectivity & Security` tab and check the `Public Accessibility` attribute value to determine if the writer instance is publicly accessible:
    - `Yes`: The database instance is publicly accessible.
    - `No`: The instance is not publicly accessible.

6. If the verified cluster database instances have different values for the `Public Accessibility` attribute, the instances within the selected Amazon Aurora database cluster do not have the same accessibility. In case of failover, the connectivity to the cluster will be lost.

7. Repeat the above steps for each Amazon Aurora database cluster available within the current AWS region.

8. Change the AWS cloud region from the navigation bar and repeat the process for other regions.

### From Command Line

#### 1. Describe DB Clusters

- Run the following command to list the names of all AWS Aurora database clusters in the selected AWS region:

```sh
aws rds describe-db-clusters 
--region us-east-1 
--output table 
--query 'DBClusters[*].DBClusterIdentifier'
```

- The command output should return a table with the requested cluster identifiers:

```sh
+---------------------------------+
|        DescribeDBClusters       |
+---------------------------------+
|  {{cc-aurora-mysql-cluster}}    |
|  {{cc-aurora-postgres-cluster}} |
+---------------------------------+
```

- Run the following command to list the names of the database instances within the selected Aurora database cluster:

```sh
aws rds describe-db-clusters 
--region us-east-1 
--db-cluster-identifier {{cc-aurora-mysql-cluster}} 
--query 'DBClusters[*].DBClusterMembers[*].DBInstanceIdentifier[]'
```

- The command output should return a list of instance identifiers:

```json
[
  "cc-aurora-mysql-cluster-instance-1",
  "cc-aurora-mysql-cluster-instance-2"
]
```

#### 2. Describe DB Instances

- Run the following command to describe the `PubliclyAccessible` attribute value for each database instance within the selected cluster:

```sh
aws rds describe-db-instances --region us-east-1 --db-instance-identifier {{cc-aurora-mysql-cluster-instance-1}} --query 'DBInstances[*].PubliclyAccessible'
```

- The command output should return the accessibility status of the instance:

```json
[
    true
]
```

- If the verified cluster database instances (writer and reader) have different values for the `PubliclyAccessible` attribute, the instances within the selected Amazon Aurora database cluster do not have the same accessibility. In case of failover, the connectivity to the cluster will be lost.

- Repeat the above steps for each Amazon Aurora database cluster available in the selected AWS region.

- Change the AWS cloud region by updating the `--region` command parameter value and repeat the audit process for other regions.

## Remediate AWS RDS Aurora Clusters

### From Console

1. Log in to the AWS management console and navigate to the RDS dashboard at [AWS RDS Console](https://console.aws.amazon.com/rds/).

2. In the left navigation panel, choose `Databases`.

3. Select the Amazon RDS database instance that you want to reconfigure (e.g., the reader instance which is not publicly accessible), and choose `Modify`.

4. On the `Modify DB instance: {{instance-name}}` configuration page, perform the following actions:
    - In the `Connectivity` section, choose `Additional configuration`, and select `Publicly accessible` to make the selected database instance publicly accessible.
    - Choose `Continue` and review the configuration changes in the `Summary of modifications` section.
    - In the `Scheduling of modifications` section, perform one of the following actions based on your workload requirements:
        - `Apply during the next scheduled maintenance window` to apply the changes automatically during the next scheduled maintenance window.
        - `Apply immediately` to apply the changes right away. Note that any pending modifications will be applied asynchronously. This option can cause unexpected downtime if any pending modifications require downtime.
    - Choose `Modify DB instance` to apply the configuration changes.

5. Repeat the above steps for each database instance that you want to reconfigure within the selected Aurora cluster.

6. Change the AWS cloud region from the navigation bar and repeat the remediation process for other regions.

### From Command Line

- Run the following command to change the database instance accessibility setting to publicly accessible:

```sh
aws rds modify-db-instance 
--region us-east-1 
--db-instance-identifier {{cc-aurora-mysql-cluster-instance-2}} 
--publicly-accessible 
--apply-immediately
```

The example uses the `--apply-immediately` parameter to apply configuration changes asynchronously and as soon as possible. This request also applies any changes available in the pending modifications queue. If any pending modifications require downtime, choosing this option can cause unexpected downtime for your Aurora database application. If you omit the `--apply-immediately` parameter from the command request, Amazon Aurora will apply your changes during the next maintenance window.

- The command output should return the configuration metadata for the modified database instance:

    ```json
    {
      "DBInstance": {
        "PubliclyAccessible": true,

        ...

        "DBInstanceIdentifier": "{{cc-aurora-mysql-cluster-instance-2}}"
      }
    }
    ```

Use the `--no-publicly-accessible` parameter to make the instance privately accessible.

- Repeat the above steps for each database instance that you want to reconfigure within the selected Aurora cluster.

- Change the AWS cloud region by updating the `--region` command parameter value and repeat the remediation process for other regions.

# References

## AWS Documentation

- [AWS Trusted Advisor Best Practices (Checks)](https://docs.aws.amazon.com/awssupport/latest/user/fault-tolerance-checks.html#amazon-aurora-db-instance-accessibility)
- [Aurora on Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Aurora.html)
- [Viewing an Amazon Aurora DB Cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html)
- [Connecting to an Amazon Aurora DB Cluster](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
- [Modifying an Amazon RDS DB Instance and Using the Apply Immediately Parameter](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html)

## AWS CLI Documentation

- [rds](https://docs.aws.amazon.com/cli/latest/reference/rds/)
- [describe-db-clusters](https://docs.aws.amazon.com/cli/latest/reference/rds/describe-db-clusters.html)
- [describe-db-instances](https://docs.aws.amazon.com/cli/latest/reference/rds/describe-db-instances.html)
- [modify-db-instance](https://docs.aws.amazon.com/cli/latest/reference/rds/modify-db-instance.html)
