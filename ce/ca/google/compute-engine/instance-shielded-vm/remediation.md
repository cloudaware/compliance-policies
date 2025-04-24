# Remediation

To be able turn on `Shielded VM` on an instance, your instance must use an image with Shielded VM support.

## From Google Cloud Console

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. Click on the instance name to see its `VM instance details` page.
3. Click `STOP` to stop the instance.
4. When the instance has stopped, click `EDIT`.
5. In the Shielded VM section, select `Turn on vTPM` and `Turn on Integrity Monitoring`.
6. Optionally, if you do not use any custom or unsigned drivers on the instance, also select `Turn on Secure Boot`.
7. Click the `Save` button to modify the instance and then click `START` to restart it.

## From Google Cloud CLI

You can only enable Shielded VM options on instances that have Shielded VM support. For a list of Shielded VM public images, run the gcloud compute images list command with the following flags:

            gcloud compute images list --project gce-uefi-images --no-standard-images

1. Stop the instance:

            gcloud compute instances stop <INSTANCE_NAME>

2. Update the instance:

            gcloud compute instances update <INSTANCE_NAME> --shielded-vtpm --shielded-vm-integrity-monitoring

3. Optionally, if you do not use any custom or unsigned drivers on the instance, also turn on secure boot.

            gcloud compute instances update <INSTANCE_NAME> --shielded-vm-secure-boot

4. Restart the instance:

            gcloud compute instances start <INSTANCE_NAME>
