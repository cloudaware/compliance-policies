# Remediation

Currently there is no way to update the encryption of an existing disk. Therefore you should create a new disk with `Encryption` set to `Customer supplied`.

## From Google Cloud Console

1. Go to Compute Engine `Disks` by visiting: <https://console.cloud.google.com/compute/disks>.
2. Click `CREATE DISK`.
3. Set `Encryption type` to `Customer supplied`,
4. Provide the `Key` in the box.
5. Select `Wrapped key`.
6. Click `Create`.

## From Google Cloud CLI

In the gcloud compute tool, encrypt a disk using the --csek-key-file flag during instance creation. If you are using an RSA-wrapped key, use the gcloud beta component:

            gcloud compute instances create <INSTANCE_NAME> --csek-key-file <example-file.json>

To encrypt a standalone persistent disk:

            gcloud compute disks create <DISK_NAME> --csek-key-file <example-file.json>
