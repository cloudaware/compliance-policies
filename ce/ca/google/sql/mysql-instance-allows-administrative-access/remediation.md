# Remediation

## From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Platform Console using <https://console.cloud.google.com/sql/>.
2. Select the instance to open its Overview page.
3. Select `Access Control > Users`.
4. Click the `More actions icon` for the user to be updated.
5. Select `Change password`, specify a `New password`, and click `OK`.

## From Google Cloud CLI

1. Set a password for a MySQL instance:

    ```sh
    gcloud sql users set-password root \
        --host={{host}} \
        --instance={{instance-name}} \
        --prompt-for-password
    ```

2. A prompt will appear, requiring the user to enter a password:

    ```txt
    Instance Password:
    ```

3. With a successful password configured, the following message should be seen:

    ```txt
    Updating Cloud SQL user...done.
    ```
