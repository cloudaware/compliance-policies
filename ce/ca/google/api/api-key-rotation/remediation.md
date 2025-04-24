# Remediation

## From Google Cloud Console

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. In the section `API Keys`, Click the `API Key Name`. The API Key properties display on a new page.
3. Click `REGENERATE KEY` to rotate API key.
4. Click `Save`.
5. Repeat steps 2,3,4 for every API key that has not been rotated in the last 90 days.

Note: Do not set `HTTP referrers` to wild-cards `(* or *.[TLD] or .[TLD]/)` allowing access to any/wide HTTP referrer(s).
Do not set `IP addresses` and referrer to any host `(0.0.0.0 or 0.0.0.0/0 or ::0)`

## From Google Cloud CLI

There is not currently a way to regenerate and API key using gcloud commands. To 'regenerate' a key you will need to create a new one, duplicate the restrictions from the key being rotated, and delete the old key.

1. List existing keys.

    gcloud services api-keys list

2. Note the `UID` and restrictions of the key to regenerate.
3. Run this command to create a new API key. <key_name> is the display name of the new key.

    gcloud alpha services api-keys create --display-name="<key_name>"

    Note the `UID` of the newly created key

4. Run the update command to add required restrictions.

    Note: the restriction may vary for each key.
    Refer to this documentation for the appropriate flags. <https://cloud.google.com/sdk/gcloud/reference/alpha/services/api-keys/update>

        gcloud alpha services api-keys update <UID of new key>

5. Delete the old key.

    gcloud alpha services api-keys delete \<UID of old key>
