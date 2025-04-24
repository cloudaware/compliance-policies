# Remediation

## From Console

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. In the section `API Keys`, Click the `API Key Name`. The API Key properties display on a new page.
3. In the `Key restrictions` section go to `API restrictions`.
4. Click the `Select API` drop-down to choose an API.
5. Click `Save`.
6. Repeat steps 2,3,4,5 for every unrestricted API key

Note: Do not set `API restrictions` to `Google Cloud APIs`, as this option allows access to all services offered by Google cloud.

## From Google Cloud CLI

1. List all API keys.

     gcloud services api-keys list

2. Note the `UID` of the key to add restrictions to.
3. Run the update command with the appropriate flags to add the required restrictions.

    gcloud alpha services api-keys update \<UID> <restriction_flags>

Note: Flags can be found by running

    gcloud alpha services api-keys update --help

or in this documentation <https://cloud.google.com/sdk/gcloud/reference/alpha/services/api-keys/update>
