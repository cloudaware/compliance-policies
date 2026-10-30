# Remediation

## From Console

1. Log in to the AWS Management Console and open the RDS dashboard at <https://console.aws.amazon.com/rds/>.
2. In the left navigation panel, click `Databases`.
3. Select the database instance that needs to be encrypted.
4. Click the `Actions` button at the top right and select `Take Snapshot`.
5. On the Take Snapshot page, enter a name for the snapshot in the `Snapshot Name` field and click `Take Snapshot`.
6. Select the newly created snapshot, click the `Actions` button at the top right, and select `Copy snapshot` from the menu.
7. On the Make Copy of DB Snapshot page, perform the following:

    - In the New DB Snapshot Identifier field, enter a name for the new snapshot.
    - Check `Copy Tags`. The new snapshot must have the same tags as the source snapshot.
    - Select `Yes` from the `Enable Encryption` dropdown list to enable encryption. You can choose the AWS default encryption key or a custom key from the Master Key dropdown list.

8. Click `Copy Snapshot` to create an encrypted copy of the selected instance snapshot.
9. Select the new encrypted snapshot copy, click the `Actions` button at the top right, and select `Restore Snapshot`. This restores the encrypted snapshot to a new database instance.
10. On the Restore DB Instance page, enter a unique name for the new database instance in the DB Instance Identifier field.
11. Review the instance configuration details and click `Restore DB Instance`.
12. After the new instance is provisioned, update application configuration to use the endpoint of the new encrypted database instance. Once the database endpoint is changed at the application level, remove the unencrypted instance.

## From Command Line

1. Run the `describe-db-instances` command to list all RDS database names available in the selected AWS region. The output returns the database instance identifier.

    ```sh
    aws rds describe-db-instances --region {{region-name}} --query 'DBInstances[*].DBInstanceIdentifier'
    ```

2. Run the `create-db-snapshot` command to create a snapshot for the selected database instance. The output returns the new snapshot name.

    ```sh
    aws rds create-db-snapshot \
        --region {{region-name}} \
        --db-snapshot-identifier {{DB-Snapshot-Name}} \
        --db-instance-identifier {{DB-Name}}
    ```

3. Run the `list-aliases` command to list the KMS key aliases available in the specified region. The output returns each key alias. For this process, locate the ID of the AWS default KMS key.

    ```sh
    aws kms list-aliases --region {{region-name}}
    ```

4. Run the `copy-db-snapshot` command using the default KMS key ID for RDS instances returned earlier to create an encrypted copy of the database instance snapshot. The output returns the encrypted instance snapshot configuration.

    ```sh
    aws rds copy-db-snapshot \
        --region {{region-name}} \
        --source-db-snapshot-identifier {{DB-Snapshot-Name}} \
        --target-db-snapshot-identifier {{DB-Snapshot-Name-Encrypted}} \
        --copy-tags \
        --kms-key-id {{KMS-ID-For-RDS}}
    ```

5. Run the `restore-db-instance-from-db-snapshot` command to restore the encrypted snapshot created in the previous step to a new database instance. If successful, the output returns the new encrypted database instance configuration.

    ```sh
    aws rds restore-db-instance-from-db-snapshot \
        --region {{region-name}} \
        --db-instance-identifier {{DB-Name-Encrypted}} \
        --db-snapshot-identifier {{DB-Snapshot-Name-Encrypted}}
    ```

6. Run the `describe-db-instances` command to list all RDS database names available in the selected AWS region. The output returns database instance identifier names. Select the encrypted database name that you just created, `DB-Name-Encrypted`.

    ```sh
    aws rds describe-db-instances --region {{region-name}} --query 'DBInstances[*].DBInstanceIdentifier'
    ```

7. Run the `describe-db-instances` command again using the RDS instance identifier returned earlier to determine whether the selected database instance is encrypted. The output should return the encryption status `True`.

    ```sh
    aws rds describe-db-instances \
        --region {{region-name}} \
        --db-instance-identifier {{DB-Name-Encrypted}} \
        --query 'DBInstances[*].StorageEncrypted'
    ```
