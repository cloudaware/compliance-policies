# Remediation

## From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the SQL Server instance for which you want to enable to database flag.
3. Click `Edit`.
4. Scroll down to the `Flags` section.
5. Click the X next `user options` flag shown
6. Click `Save` to save your changes.
7. Confirm your changes under `Flags` on the Overview page.

## From Google Cloud CLI

1. List all Cloud SQL database Instances

            gcloud sql instances list

2. Clear the `user options` database flag for every Cloud SQL SQL Server database instance using either of the below commands.

Clearing all flags to their default value

            gcloud sql instances patch <INSTANCE_NAME> --clear-database-flags

OR

To clear only `user options` database flag, configure the database flag by overriding the `user options`. Exclude `user options` flag and its value, and keep all other flags you want to configure.

            gcloud sql instances patch <INSTANCE_NAME> --database-flags [FLAG1=VALUE1,FLAG2=VALUE2]

Note: This command will overwrite all database flags previously set. To keep those and add new ones, include the values for all flags you want set on the instance; any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign ("=").
