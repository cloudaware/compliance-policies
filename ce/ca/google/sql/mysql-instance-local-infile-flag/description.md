# Description

It is recommended to set the `local_infile` database flag for a Cloud SQL MySQL instance to `off`.

## Rationale

The `local_infile` flag controls the server-side LOCAL capability for LOAD DATA statements. Depending on the `local_infile` setting, the server refuses or permits local data loading by clients that have LOCAL enabled on the client side.

To explicitly cause the server to refuse LOAD DATA LOCAL statements (regardless of how client programs and libraries are configured at build time or runtime), start mysqld with local_infile disabled. local_infile can also be set at runtime.

Due to security issues associated with the `local_infile` flag, it is recommended to disable it. This recommendation is applicable to MySQL database instances.

## Impact

Disabling `local_infile` makes the server refuse local data loading by clients that have LOCAL enabled on the client side.

## Audit

### From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the instance to open its `Instance Overview` page
3. Ensure the database flag `local_infile` that has been set is listed under the `Database flags` section.

### From Google Cloud CLI

1. List all Cloud SQL database instances:

            gcloud sql instances list

2. Ensure the below command returns `off` for every Cloud SQL MySQL database instance.

            gcloud sql instances describe <INSTANCE_NAME> --format=json | jq '.settings.databaseFlags[] | select(.name=="local_infile")|.value'

## Default Value

By default `local_infile` is `on`.

## References

1. <https://cloud.google.com/sql/docs/mysql/flags>
2. <https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_local_infile>
3. <https://dev.mysql.com/doc/refman/5.7/en/load-data-local.html>

## Additional Information

WARNING: This patch modifies database flag values, which may require the instance to be restarted. Check the list of supported flags - <https://cloud.google.com/sql/docs/mysql/flags> - to see if your instance will be restarted when this patch is submitted.

Note: some database flag settings can affect instance availability or stability, and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines."

Note: Configuring the above flag restarts the Cloud SQL instance.
