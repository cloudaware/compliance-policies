# Remediation

## From Google Cloud Console

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. Click on the impacted VM instance.
3. If the instance is not stopped, click the `Stop` button. Wait for the instance to be stopped.
4. Next, click the `Edit` button.
5. Scroll down to the `Service Account` section.
6. Select a different service account or ensure that `Allow full access to all Cloud APIs` is not selected.
7. Click the `Save` button to save your changes and then click `START`.

## From Google Cloud CLI

1. Stop the instance:

    ```sh
    gcloud compute instances stop {{instance-name}}
    ```

2. Update the instance:

    ```sh
    gcloud compute instances set-service-account {{instance-name}} \
        --service-account={{service-account}} \
        --scopes [SCOPE1, SCOPE2...]
    ```

3. Restart the instance:

    ```sh
    gcloud compute instances start {{instance-name}}
    ```
