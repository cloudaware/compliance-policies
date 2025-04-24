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

            gcloud compute instances stop <INSTANCE_NAME>

2. Update the instance:

            gcloud compute instances set-service-account <INSTANCE_NAME> --service-account=<SERVICE_ACCOUNT> --scopes [SCOPE1, SCOPE2...]

3. Restart the instance:

            gcloud compute instances start <INSTANCE_NAME>
