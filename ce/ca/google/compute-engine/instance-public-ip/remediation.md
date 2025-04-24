# Remediation

## From Google Cloud Console

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. Click on the instance name to go the the `Instance detail page`.
3. Click `Edit`.
4. For each Network interface, ensure that `External IP` is set to `None`.
5. Click `Done` and then click `Save`.

## From Google Cloud CLI

1. Describe the instance properties:

            gcloud compute instances describe <INSTANCE_NAME> --zone=<ZONE>

2. Identify the access config name that contains the external IP address. This access config appears in the following format:

            networkInterfaces: 
            - accessConfigs: 
                - kind: compute#accessConfig 
                  name: External NAT 
                  natIP: 130.211.181.55 
                  type: ONE_TO_ONE_NAT

3. Delete the access config.

            gcloud compute instances delete-access-config <INSTANCE_NAME> --zone=<ZONE> --access-config-name <ACCESS_CONFIG_NAME>

In the above example, the `ACCESS_CONFIG_NAME` is `External NAT`. The name of your access config might be different.
