# Remediation

## From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the SQL Server instance for which you want to enable to database flag.
3. Click `Edit`.
4. Scroll down to the `Flags` section.
5. To set a flag that has not been set on the instance before, click `Add item`, choose the flag `user connections` from the drop-down menu, and set its value to your organization recommended value.
6. Click `Save` to save your changes.
7. Confirm your changes under `Flags` on the Overview page.

## From Google Cloud CLI

1. Configure the `user connections` database flag for every Cloud SQL SQL Server database instance using the below command.

            gcloud sql instances patch <INSTANCE_NAME> --database-flags "user connections=[0-32,767]"

Note: This command will overwrite all database flags previously set. To keep those and add new ones, include the values for all flags you want set on the instance; any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign ("=").
