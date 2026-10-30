# Remediation

## From Google Cloud CLI

To enable deletion protection on an existing Cloud SQL instance, run:

```sh
gcloud sql instances patch {{instance-name}} \
    --deletion-protection
```

To enable deletion protection when creating a new Cloud SQL instance, include `--deletion-protection` in the `gcloud sql instances create` command.
