# Remediation

## Recreate the RDS Instance with a Custom Master Username

Amazon RDS does **not** support modifying the master username of an existing database instance. To remediate this finding, you must **recreate the database instance with a custom master username** and migrate the existing data to the new instance. Restoring the cluster from a snapshot to modify the master username is also not support.

### **From Command Line**

1. **Retrieve the Current Instance Configuration**

    Describe the existing RDS instance to capture the configuration details required to recreate it (engine, instance class, networking, storage, and availability settings).

    ```sh
    aws rds describe-db-instances \
        --region {{region}} \
        --db-instance-identifier {{db-instance-id}}
    ```

2. **Review the Output and Record Required Settings**

    From the command output, note the configuration values needed to create the replacement instance, including the current master username, instance class, engine, VPC security groups, subnet group, and storage configuration.

    ```json
    {
    "DBInstances": [
        {
        "DBInstanceIdentifier": "{{db-instance-id}}",
        "MasterUsername": "admin",
        ...
        }
    ]
    }
    ```

3. **Create a New RDS Instance with a Compliant Master Username**

    Create a new database instance using the recorded configuration details, ensuring the **master username complies with your security policy**.

    ```sh
    aws rds create-db-instance \
        --region {{region}} \
        --db-instance-identifier {{new-db-instance-id}} \
        --allocated-storage 20 \
        --db-instance-class {{db.t3.medium}} \
        --engine {{postgres}} \
        --vpc-security-group-ids {{sg-id1}} {{sg-id2}} \
        --master-username {{ca-inventory-pg}} \
        --master-user-password {{password}}
    ```

4. **Migrate Data and Update Application Configuration**

    Once the new instance status becomes `available`:

    - Migrate the data from the source instance to the new instance using an appropriate migration method.
    - Update application configuration to reference the **new database endpoint**.

5. **Delete the Original RDS Instance**

    After verifying that the application is fully operational against the new instance and data migration is complete, delete the original RDS instance to prevent further charges.

    ```sh
    aws rds delete-db-instance \
        --region {{region}} \
        --db-instance-identifier {{db-instance-id}} \
        --final-db-snapshot-identifier {{db-instance-snapshot}}
    ```
