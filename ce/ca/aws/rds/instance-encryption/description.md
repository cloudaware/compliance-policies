# Description

Amazon RDS encrypted DB instances use the industry standard AES-256 encryption algorithm to encrypt data on the server that hosts your Amazon RDS DB instances. After your data is encrypted, Amazon RDS handles access authentication and data decryption transparently with minimal impact on performance.

## Rationale

Databases often hold sensitive and critical data, so it is highly recommended to implement encryption to protect your data from unauthorized access or disclosure. With RDS encryption enabled, data stored on the instance's underlying storage, automated backups, read replicas, and snapshots are all encrypted.

## Audit

### From Console

1. Log in to the AWS Management Console and open the RDS dashboard at <https://console.aws.amazon.com/rds/>.
2. In the navigation pane, click `Databases`.
3. Select the RDS instance that you want to examine.
4. Click the instance name to see details, then click the `Configuration` tab.
5. Under the Configuration Details section, in the Storage pane, find the `Encryption Enabled` status.
6. If the current status is set to `Disabled`, encryption is not enabled for the selected RDS instance.
7. Repeat steps 3-7 to verify the encryption status of other RDS instances in the same region.
8. Change the region from the top of the navigation bar and repeat the audit for other regions.

### From Command Line

1. Run the `describe-db-instances` command to list all RDS instance database names available in the selected AWS region. The output returns each instance database identifier name:

    ```sh
    aws rds describe-db-instances --region <region-name> --query 'DBInstances[*].DBInstanceIdentifier'
    ```

2. Run the `describe-db-instances` command again using the RDS instance identifier returned earlier to determine whether the selected database instance is encrypted. The command output should return the encryption status `True` or `False`:

    ```sh
    aws rds describe-db-instances --region <region-name> --db-instance-identifier <DB-Name> --query 'DBInstances[*].StorageEncrypted'
    ```

3. If the StorageEncrypted parameter value is `False`, encryption is not enabled for the selected RDS database instance.
4. Repeat steps 1-3 for each RDS instance, and change the Region to verify other regions.

## References

1. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html>
2. <https://aws.amazon.com/blogs/database/selecting-the-right-encryption-options-for-amazon-rds-and-amazon-aurora-database-engines/#:~:text=With%20RDS%2Dencrypted%20resources%2C%20data,transparent%20to%20your%20database%20engine>.
3. <https://aws.amazon.com/rds/features/security/>
