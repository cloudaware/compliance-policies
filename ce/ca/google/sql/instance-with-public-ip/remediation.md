# Remediation

## From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console: <https://console.cloud.google.com/sql/instances>
2. Click the instance name to open its Instance details page.
3. Select the `Connections` tab.
4. Deselect the `Public IP` checkbox.
5. Click `Save` to update the instance.

## From Google Cloud CLI

1. For every instance, remove its public IP and assign a private IP instead:

    ```sh
    gcloud sql instances patch {{instance-name}} \
        --network={{vpc-network-name}} \
        --no-assign-ip
    ```

2. Confirm the changes using the following command:

    ```sh
    gcloud sql instances describe {{instance-name}}
    ```
