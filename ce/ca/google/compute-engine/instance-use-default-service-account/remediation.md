# Remediation

## From Google Cloud Console

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. Click on the instance name to go to its `VM instance details` page.
3. Click `STOP` and then click `EDIT`.
4. Under the section `API and identity management`, select a service account other than the default Compute Engine service account. You may first need to create a new service account.
5. Click `Save` and then click `START`.

## From Google Cloud CLI

1. Stop the instance:

    ```sh
    gcloud compute instances stop {{instance-name}}
    ```

2. Update the instance:

    ```sh
    gcloud compute instances stop {{instance-name}}
    ```

3. Restart the instance:

    ```sh
    gcloud compute instances start {{instance-name}}
    ```
