# Remediation

## From Google Cloud CLI

1. Log in to the Google Cloud Console
2. Go to Compute Engine
3. Go to VM instances
4. Click on the Specific VM
5. Click `EDIT`
6. Unselect `Enable connecting to serial ports` below `Remote access` block.
7. Click `Save`

## From Google Cloud Console

Use the following command to disable.

```sh
gcloud compute instances add-metadata {{instance-name}} \
    --zone={{zone}} \
    --metadata=serial-port-enable=false
```

or

```sh
gcloud compute instances add-metadata {{instance-name}} \
    --zone={{zone}} \
    --metadata=serial-port-enable=0
```
