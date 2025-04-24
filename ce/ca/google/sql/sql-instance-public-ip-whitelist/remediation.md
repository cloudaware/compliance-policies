# Remediation

## From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Click the instance name to open its `Instance details` page.
3. Under the `Configuration` section click `Edit configurations`
4. Under `Configuration options` expand the `Connectivity` section.
5. Click the `delete` icon for the authorized network `0.0.0.0/0`.
6. Click `Save` to update the instance.

## From Google Cloud CLI

Update the authorized network list by dropping off any addresses.

            gcloud sql instances patch <INSTANCE_NAME> --authorized-networks=IP_ADDR1,IP_ADDR2...
