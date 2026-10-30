# Remediation

## From Google Cloud Console

1. Document the baseline Organization Policies required by the organization.
2. Open the Google Cloud Console at <https://console.cloud.google.com>.
3. Select the organization.
4. Go to `IAM & Admin` > `Organization Policies`.
5. For each required constraint, click `Manage policy`.
6. Configure enforcement or allowed and denied values according to the baseline.
7. Use dry-run mode or non-production folders to validate the effect before broad enforcement.
8. Review folder and project overrides and remove exceptions that are not approved.
