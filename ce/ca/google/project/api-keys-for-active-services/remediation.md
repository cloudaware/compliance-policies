# Remediation

## From Console

1. Go to `APIs & Services\Credentials`
2. In the section `API Keys`, to delete API Keys: Click the `Delete Bin Icon` in front of every `API Key Name`.

## From Google Cloud Command Line

1. Run the following from within the project you wish to audit

    gcloud services api-keys list --filter

2. Pipe the results into

    gcloud alpha services api-keys delete
