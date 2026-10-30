# Description

It is recommended to set a password for the administrative user (`root` by default) to prevent unauthorized access to the SQL database instances.

This recommendation is applicable only to MySQL instances. PostgreSQL does not offer any setting for No Password from the cloud console.

## Rationale

At the time of MySQL Instance creation, not providing an administrative password allows anyone to connect to the SQL database instance with administrative privileges. The root password should be set to ensure only authorized users have these privileges.

## Impact

Connection strings for administrative clients need to be reconfigured to use a password.

## Audit

### From Google Cloud CLI

1. List all SQL database instances of type MySQL:

    ```sh
    gcloud sql instances list \
        --filter='{{database-version}}:MYSQL*' \
        --project={{project-id}} \
        --format="(NAME,{{primary-address}})"
    ```

2. For every MySQL instance try to connect using the `PRIMARY_ADDRESS`, if available:

    ```sh
    mysql -u root -h {{mysql-instance-ip-address}}
    ```

    The command should return either an error message or a password prompt.

    Sample Error message:

    ```txt
    ERROR 1045 (28000): Access denied for user 'root'@'{{instance-ip}}' (using password: NO)
    ```

    If a command produces the `mysql>` prompt, the MySQL instance allows anyone to connect with administrative privileges without needing a password.

Note: The `No Password` setting is exposed only at the time of MySQL instance creation. Once the instance is created, the Google Cloud Platform Console does not expose a setting to confirm whether a password for an administrative user is set.

## Default Value

From the Google Cloud Platform Console, the `Create Instance` workflow enforces the rule to enter the root password unless the option `No Password` is selected explicitly.

## References

1. <https://cloud.google.com/sql/docs/mysql/create-manage-users>
2. <https://cloud.google.com/sql/docs/mysql/create-instance>
