# Remediation

## From Azure Portal

1. Go to `App Services`.

For each App Service:

2. Under `Monitoring`, go to Diagnostic Settings.
3. To update an existing diagnostic setting, click `Edit setting` against the setting. To create a new diagnostic setting, click `Add diagnostic setting` and provide a name for the new setting.
4. Check the checkbox next to `HTTP logs`.
5. Configure a destination based on your specific logging consumption capability (for example Stream to an event hub and then consuming with SIEM integration for Event Hub logging).
6. Click `Save`.
