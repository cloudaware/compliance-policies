# Remediation

## From Google Cloud Console

Delete any external (user-managed) Service Account Key older than 90 days:

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. In the Section `Service Account Keys`, for every external (user-managed) service account key where `creation date` is greater than or equal to the past 90 days, click `Delete Bin Icon` to `Delete Service Account key`

Create a new external (user-managed) Service Account Key for a Service Account:

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. Click `Create Credentials` and `Select Service Account Key`.
3. Choose the service account in the drop-down list for which an External (user-managed) Service Account key needs to be created.
4. Select the desired key type format among `JSON` or `P12`.
5. Click `Create`. It will download the `private key`. Keep it safe.
6. Click `Close` if prompted.
7. The site will redirect to the `APIs & Services\Credentials` page. Make a note of the new `ID` displayed in the `Service account keys` section.
