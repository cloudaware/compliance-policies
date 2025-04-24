# Description

It is recommended to set `external scripts enabled` database flag for Cloud SQL SQL Server instance to `off`

## Rationale

`external scripts enabled` enable the execution of scripts with certain remote language extensions. This property is OFF by default. When Advanced Analytics Services is installed, setup can optionally set this property to true. As the External Scripts Enabled feature allows scripts external to SQL such as files located in an R library to be executed, which could adversely affect the security of the system, hence this should be disabled. This recommendation is applicable to SQL Server database instances.

## Impact

Setting custom flags via command line on certain instances will cause all omitted flags to be reset to defaults. This may cause you to lose custom flags and could result in unforeseen complications or instance restarts. Because of this, it is recommended you apply these flags changes during a period of low usage.

## Audit

### From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the instance to open its `Instance Overview` page
3. Ensure the database flag `external scripts enabled` that has been set is listed under the `Database flags` section.

### From Google Cloud CLI

1. Ensure the below command returns `off` for every Cloud SQL SQL Server database instance

            gcloud sql instances describe <INSTANCE_NAME> --format=json | jq '.settings.databaseFlags[] | select(.name=="external scripts enabled")|.value'

In the output, database flags are listed under the `settings` as the collection `databaseFlags`.

## Default Value

By default `external scripts enabled` is `off`

## References

1. <https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/external-scripts-enabled-server-configuration-option?view=sql-server-ver15>
2. <https://cloud.google.com/sql/docs/sqlserver/flags>
3. <https://docs.microsoft.com/en-us/sql/advanced-analytics/concepts/security?view=sql-server-ver15>
4. <https://www.stigviewer.com/stig/ms_sql_server_2016_instance/2018-03-09/finding/V-79347>

## Additional Information

WARNING: This patch modifies database flag values, which may require your instance to be restarted. Check the list of supported flags - <https://cloud.google.com/sql/docs/sqlserver/flags> - to see if your instance will be restarted when this patch is submitted.

Note: some database flag settings can affect instance availability or stability, and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines."

Note: Configuring the above flag restarts the Cloud SQL instance.
