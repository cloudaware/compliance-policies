# Remediation

## From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the PostgreSQL instance where the database flag needs to be enabled.
3. Click `Edit`.
4. Scroll down to the `Flags` section.
5. To set a flag that has not been set on the instance before, click `Add a Database Flag`, choose the flag `log_disconnections` from the drop-down menu and set the value as `on`.
6. Click `Save`.
7. Confirm the changes under `Flags` on the Overview page.

## From Google Cloud CLI

1. Configure the `log_disconnections` database flag for every Cloud SQL PosgreSQL database instance using the below command:

            gcloud sql instances patch <INSTANCE_NAME> --database-flags log_disconnections=on

Note: This command will overwrite all previously set database flags. To keep those and add new ones, include the values for all flags to be set on the instance; any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign ("=").
