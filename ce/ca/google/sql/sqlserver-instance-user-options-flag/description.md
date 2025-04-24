# Description

It is recommended that, `user options` database flag for Cloud SQL SQL Server instance should not be configured.

## Rationale

The `user options` option specifies global defaults for all users. A list of default query processing options is established for the duration of a user's work session. The user options option allows you to change the default values of the SET options (if the server's default settings are not appropriate).

A user can override these defaults by using the SET statement. You can configure user options dynamically for new logins. After you change the setting of user options, new login sessions use the new setting; current login sessions are not affected. This recommendation is applicable to SQL Server database instances.

## Impact

Setting custom flags via command line on certain instances will cause all omitted flags to be reset to defaults. This may cause you to lose custom flags and could result in unforeseen complications or instance restarts. Because of this, it is recommended you apply these flags changes during a period of low usage.

## Audit

### From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the instance to open its `Instance Overview` page
3. Ensure the database flag `user options` that has been set is not listed under the `Database flags` section.

### From Google Cloud CLI

1. Ensure the below command returns empty result for every Cloud SQL SQL Server database instance

            gcloud sql instances describe <INSTANCE_NAME> --format=json | jq '.settings.databaseFlags[] | select(.name=="user options")|.value'

In the output, database flags are listed under the `settings` as the collection `databaseFlags`.

## Default Value

By default `user options` is not configured.

## References

1. <https://cloud.google.com/sql/docs/sqlserver/flags>
2. <https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/configure-the-user-options-server-configuration-option?view=sql-server-ver15>
3. <https://www.stigviewer.com/stig/ms_sql_server_2016_instance/2018-03-09/finding/V-79335>

## Additional Information

WARNING: This patch modifies database flag values, which may require your instance to be restarted. Check the list of supported flags - <https://cloud.google.com/sql/docs/sqlserver/flags> - to see if your instance will be restarted when this patch is submitted.

Note: some database flag settings can affect instance availability or stability, and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines.

Note: Configuring the above flag does not restart the Cloud SQL instance.
