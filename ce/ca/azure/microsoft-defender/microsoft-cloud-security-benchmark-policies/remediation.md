# Remediation

## From Azure Portal

### Part A - List all disabled policies

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Select the appropriate Subscription.
5. Click on `Security policies` in the left column.
6. Click on `Microsoft cloud security benchmark`.
7. Click `Add Filter` and select `Effect`.
8. Check the `Disabled` box to search for all disabled policies.
9. Click `Apply`.

### Part B - Remediate Policy Effect

For each policy that remains in the list:

1. Click the blue ellipses to the right of the policy name.
2. Click `Manage effect and parameters`.
3. Under Policy Effect, select the `Audit` radio button.
4. Click `Save`.
5. Click `Refresh`.

Repeat "Part B - Remediate Policy Effect" until no more policies are listed.
