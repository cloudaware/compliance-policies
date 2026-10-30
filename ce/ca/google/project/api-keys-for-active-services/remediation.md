# Remediation

## From Google Cloud Console

1. Go to `APIs & Services\Credentials`.
2. In the `API Keys` section, delete API keys by clicking the Delete icon in front of each `API Key Name`.

## From Google Cloud CLI

1. Run the following from within the project you want to audit:

    ```sh
    gcloud services api-keys list \
        --filter={{filter}}
    ```

2. Pipe the results into:

    ```sh
    gcloud alpha services api-keys delete {{api-key-id}}
    ```
