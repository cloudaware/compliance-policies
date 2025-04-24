# Remediation

## Enable profiling

1. Go to Cloud DLP by visiting <https://console.cloud.google.com/dlp/landing/dataProfiles/configurations>
2. Click `Create Configuration`
3. For projects follow <https://cloud.google.com/dlp/docs/profile-project>. For organizations or folders follow <https://cloud.google.com/dlp/docs/profile-org-folder>

## Review findings

Columns or tables with high data risk have evidence of sensitive information without additional protections. To lower the data risk score, consider doing the following:

• For columns containing sensitive data, apply a BigQuery policy tag to restrict access to accounts with specific access rights.

• De-identify the raw sensitive data using de-identification techniques like masking and tokenization.

## Incorporate findings into your security and governance operations

• Enable sending findings into your security and posture services. You can publish data profiles to Security Command Center and Chronicle.

• Automate remediation or enable alerting of new or changed data risk with Pub/Sub.
