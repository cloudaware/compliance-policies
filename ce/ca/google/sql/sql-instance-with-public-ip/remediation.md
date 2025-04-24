# Remediation

## From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console: <https://console.cloud.google.com/sql/instances>
2. Click the instance name to open its Instance details page.
3. Select the `Connections` tab.
4. Deselect the `Public IP` checkbox.
5. Click `Save` to update the instance.

## From Google Cloud CLI

1. For every instance remove its public IP and assign a private IP instead:

            gcloud sql instances patch <INSTANCE_NAME> --network=<VPC_NETWORK_NAME> --no-assign-ip

2. Confirm the changes using the following command:

            gcloud sql instances describe <INSTANCE_NAME>
