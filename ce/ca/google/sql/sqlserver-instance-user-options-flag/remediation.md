# Remediation

## From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the SQL Server instance for which you want to enable the database flag.
3. Click `Edit`.
4. Scroll down to the `Flags` section.
5. Click the X next to the `user options` flag.
6. Click `Save` to save your changes.
7. Confirm your changes under `Flags` on the Overview page.

## From Google Cloud CLI

1. List all Cloud SQL database instances:

    ```sh
    gcloud sql instances list
    ```

2. Clear the `user options` database flag for every Cloud SQL SQL Server database instance using either of the following commands.

    Clear all flags to their default values:

    ```sh
    gcloud sql instances patch {{instance-name}} \
        --clear-database-flags
    ```

    OR

    To clear only the `user options` database flag, configure the database flags without `user options`, and keep all other flags you want to configure.

    ```sh
    gcloud sql instances patch {{instance-name}} \
        --database-flags {{database-flags-without-user-options}}
    ```

    Note: This command will overwrite all database flags previously set. To keep those and add new ones, include the values for all flags you want set on the instance; any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign ("=").
