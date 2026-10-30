# Remediation

## From Google Cloud Console

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. Click on the instance name to go the the `Instance detail page`.
3. Click `Edit`.
4. For each Network interface, ensure that `External IP` is set to `None`.
5. Click `Done` and then click `Save`.

## From Google Cloud CLI

1. Describe the instance properties:

    ```sh
    gcloud compute instances describe {{instance-name}} \
        --zone={{zone}}
    ```

2. Identify the access config name that contains the external IP address. This access config appears in the following format:

    ```yaml
    networkInterfaces: 
    - accessConfigs: 
        - kind: compute#accessConfig 
            name: External NAT 
            natIP: 130.211.181.55 
            type: {{one-to-one-nat}}
    ```

3. Delete the access config.

    ```sh
    gcloud compute instances delete-access-config {{instance-name}} \
        --zone={{zone}} \
        --access-config-name {{access-config-name}}
    ```

In the above example, the `ACCESS_CONFIG_NAME` is `External NAT`. The name of your access config might be different.
