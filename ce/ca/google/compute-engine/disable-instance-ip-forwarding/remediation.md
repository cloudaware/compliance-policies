# Remediation

You only edit the `canIpForward` setting at instance creation time. Therefore, you need to delete the instance and create a new one where `canIpForward` is set to `false`.

## From Google Cloud Console

1. Go to the `VM Instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. Select the `VM Instance` you want to remediate.
3. Click the `Delete` button.
4. On the `VM Instances` page, click `CREATE INSTANCE`.
5. Create a new instance with the desired configuration. By default, the instance is configured to not allow IP forwarding.

## From Google Cloud CLI

1. Delete the instance:

            gcloud compute instances delete INSTANCE_NAME

2. Create a new instance to replace it, with `IP forwarding` set to `Off`

            gcloud compute instances create
