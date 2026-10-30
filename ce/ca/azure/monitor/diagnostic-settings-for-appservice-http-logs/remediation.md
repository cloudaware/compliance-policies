# Remediation

## From Azure Portal

1. Go to `App Services`.

    For each App Service:

2. Under `Monitoring`, go to `Diagnostic Settings`.
3. To update an existing diagnostic setting, click `Edit setting` for that setting. To create a new diagnostic setting, click `Add diagnostic setting` and provide a name.
4. Check the checkbox next to `HTTP logs`.
5. Configure a destination based on your logging consumption capability, for example, stream to an Event Hub and consume with a SIEM integration.
6. Click `Save`.
