# Remediation

## From Google Cloud Console

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. In the section `API Keys`, click the `API Key Name`. The API Key properties display on a new page.
3. Click `REGENERATE KEY` to rotate the API key.
4. Click `Save`.
5. Repeat steps 2, 3, and 4 for every API key that has not been rotated in the last 90 days.

Note: Do not set `HTTP referrers` to wildcards `(* or *.[TLD] or .[TLD]/)` allowing access to any HTTP referrer.
Do not set `IP addresses` and the referrer to `any host (0.0.0.0 or 0.0.0.0/0 or ::0)`.

## From Google Cloud CLI

There is not currently a way to regenerate an API key using gcloud commands. To regenerate a key, create a new one, duplicate the restrictions from the key being rotated, and delete the old key.

1. List existing keys.

    ```sh
    gcloud services api-keys list
    ```

2. Note the `UID` and restrictions of the key to regenerate.
3. Run this command to create a new API key. {{key-name}} is the display name of the new key.

    ```sh
    gcloud alpha services api-keys create \
        --display-name="{{key-name}}"
    ```

    Note the `UID` of the newly created key.

4. Run the update command to add required restrictions.

    Note: the restriction may vary for each key.
    Refer to this documentation for the appropriate flags. <https://cloud.google.com/sdk/gcloud/reference/alpha/services/api-keys/update>

    ```sh
    gcloud alpha services api-keys update {{uid-of-new-key}}
    ```

5. Delete the old key.

    ```sh
    gcloud alpha services api-keys delete {{uid-of-old-key}}
    ```
