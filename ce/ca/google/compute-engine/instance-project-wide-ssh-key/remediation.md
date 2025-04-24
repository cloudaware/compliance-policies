# Remediation

## From Google Cloud Console

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>. It will list all the instances in your project.
2. Click on the name of the Impacted instance
3. Click `Edit` in the toolbar
4. Under SSH Keys, go to the `Block project-wide SSH keys` checkbox
5. To block users with project-wide SSH keys from connecting to this instance, select `Block project-wide SSH keys`
6. Click `Save` at the bottom of the page
7. Repeat steps for every impacted Instance

## From Google Cloud CLI

To block project-wide public SSH keys, set the metadata value to `TRUE`:

            gcloud compute instances add-metadata <INSTANCE_NAME> --metadata block-project-ssh-keys=TRUE
