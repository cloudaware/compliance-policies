# Remediation

Confidential Computing can only be enabled when an instance is created. You must delete the current instance and create a new one.

## From Google Cloud Console

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. Click `CREATE INSTANCE`.
3. Fill out the desired configuration for your instance.
4. Under the `Confidential VM service` section, check the option `Enable the Confidential Computing service on this VM instance`.
5. Click `Create`.

## From Google Cloud CLI

Create a new instance with Confidential Compute enabled.

            gcloud compute instances create <INSTANCE_NAME> --zone <ZONE> --confidential-compute --maintenance-policy=TERMINATE
