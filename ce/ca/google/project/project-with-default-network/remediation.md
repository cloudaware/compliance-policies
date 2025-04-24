# Remediation

## From Google Cloud Console

1. Go to the `VPC networks` page by visiting: <https://console.cloud.google.com/networking/networks/list>.
2. Click the network named `default`.
3. On the network detail page, click `EDIT`.
4. Click `DELETE VPC NETWORK`.
5. If needed, create a new network to replace the default network.

## From Google Cloud CLI

For each Google Cloud Platform project,

1. Delete the default network:

            gcloud compute networks delete default

2. If needed, create a new network to replace it:

            gcloud compute networks create NETWORK_NAME
