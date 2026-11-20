# Remediation

1. Open **Identity & Security > Domains** in the OCI Console and select the affected domain.
2. Open **Settings > Password policy** and select the affected policy.
3. Select **Edit password rules**.
4. Set Expires after (days) to a value from 1 to 365. Retain stronger existing settings.
5. Save and verify the setting on each policy, including the domain fallback policy. If a predefined policy cannot be edited, use a custom policy with the required setting and update the affected group assignments.

Communicate the change to users. Review any near-term expiration impact and the process for changing passwords immediately after compromise.
