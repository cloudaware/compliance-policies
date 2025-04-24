# Remediation

## From Google Cloud Console

1. Go to the VM compute metadata page by visiting: <https://console.cloud.google.com/compute/metadata>.
2. Click `Edit`.
3. Add a metadata entry where the key is `enable-oslogin` and the value is `TRUE`.
4. Click `Save` to apply the changes.
5. For every instance that overrides the project setting, go to the `VM Instances` page at <https://console.cloud.google.com/compute/instances>.
6. Click the name of the instance on which you want to remove the metadata value.
7. At the top of the instance details page, click `Edit` to edit the instance settings.
8. Under `Custom metadata`, remove any entry with key `enable-oslogin` and the value is `FALSE`
9. At the bottom of the instance details page, click `Save` to apply your changes to the instance.

## From Google Cloud CLI

1. Configure oslogin on the project:

            gcloud compute project-info add-metadata --metadata enable-oslogin=TRUE

2. Remove instance metadata that overrides the project setting.

            gcloud compute instances remove-metadata <INSTANCE_NAME> --keys=enable-oslogin

Optionally, you can enable two factor authentication for OS login. For more information, see: <https://cloud.google.com/compute/docs/oslogin/setup-two-factor-authentication>.
