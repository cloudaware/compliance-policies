# Description

Amazon RDS encrypted DB instances use the industry standard AES-256 encryption algorithm to encrypt your data on the server that hosts your Amazon RDS DB instances. After your data is encrypted, Amazon RDS handles authentication of access and decryption of your data transparently with a minimal impact on performance.

## Rationale

Databases are likely to hold sensitive and critical data, it is highly recommended to implement encryption in order to protect your data from unauthorized access or disclosure. With RDS encryption enabled, the data stored on the instance's underlying storage, the automated backups, read replicas, and snapshots, are all encrypted.

## Audit

### From Console

1. Login to the AWS Management Console and open the RDS dashboard at <https://console.aws.amazon.com/rds/>.
2. In the navigation pane, under RDS dashboard, click `Databases`.
3. Select the RDS Instance that you want to examine.
4. Click `Instance Name` to see details, then click on `Configuration` tab.
5. Under Configuration Details section, In Storage pane search for the `Encryption Enabled` Status.
6. If the current status is set to `Disabled`, Encryption is not enabled for the selected RDS Instance database instance.
7. Repeat steps 3 to 7 to verify encryption status of other RDS Instance in same region.
8. Change region from the top of the navigation bar and repeat audit for other regions.

### From Command Line

1. Run `describe-db-instances` command to list all RDS Instance database names, available in the selected AWS region, Output will return each Instance database identifier-name:

```sh
aws rds describe-db-instances --region <region-name> --query 'DBInstances[*].DBInstanceIdentifier'
```

2. Run again `describe-db-instances` command using the RDS Instance identifier returned earlier, to determine if the selected database instance is encrypted, The command output should return the encryption status `True` Or `False`:

```sh
aws rds describe-db-instances --region <region-name> --db-instance-identifier <DB-Name> --query 'DBInstances[*].StorageEncrypted'
```

3. If the StorageEncrypted parameter value is `False`, Encryption is not enabled for the selected RDS database instance.
4. Repeat steps 1 to 3 for auditing each RDS Instance and change Region to verify for other regions.

## References

1. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html>
2. <https://aws.amazon.com/blogs/database/selecting-the-right-encryption-options-for-amazon-rds-and-amazon-aurora-database-engines/#:~:text=With%20RDS%2Dencrypted%20resources%2C%20data,transparent%20to%20your%20database%20engine>.
3. <https://aws.amazon.com/rds/features/security/>
