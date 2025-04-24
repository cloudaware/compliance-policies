# Remediation

## From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the SQL Server instance for which you want to enable to database flag.
3. Click `Edit`.
4. Scroll down to the `Flags` section.
5. If the flag `contained database authentication` is present and its value is set to `on`, then change it to `off`.
6. Click `Save`.
7. Confirm the changes under `Flags` on the Overview page.

## From Google Cloud CLI

1. If any Cloud SQL for SQL Server instance has the database flag `contained database authentication` set to `on`, then change it to `off` using the below command:

            gcloud sql instances patch <INSTANCE_NAME> --database-flags "contained database authentication=off"

Note: This command will overwrite all database flags previously set. To keep those and add new ones, include the values for all flags to be set on the instance; any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign ("=").
