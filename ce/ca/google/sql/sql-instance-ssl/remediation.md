# Remediation

## From Google Cloud Console

1. Go to <https://console.cloud.google.com/sql/instances>.
2. Click on an instance name to see its configuration overview.
3. In the left-side panel, select `Connections`.
4. In the `security` section, select SSL mode as `Allow only SSL connections`.
5. Under `Configure SSL server certificates` click `Create new certificate` and save the setting

## From Google Cloud CLI

To enforce SSL encryption for an instance run the command:

            gcloud sql instances patch INSTANCE_NAME --ssl-mode= ENCRYPTED_ONLY

Note: `RESTART` is required for type MySQL Generation 1 Instances (`backendType: FIRST_GEN`) to get this configuration in effect.
