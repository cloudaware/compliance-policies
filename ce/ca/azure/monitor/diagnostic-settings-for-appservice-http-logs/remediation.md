# Remediation

## From Azure Portal

1. Go to `App Services`.

For each App Service:

2. Go to Diagnostic Settings.
3. Click `Add Diagnostic Setting`.
4. Check the checkbox next to `HTTP logs`.
5. Configure a destination based on your specific logging consumption capability (for example Stream to an event hub and then consuming with SIEM integration for Event Hub logging).
