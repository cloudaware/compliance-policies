# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment settings`.
4. Click on the appropriate Management Group or Subscription.
5. Click on `Security policies` in the left column.
6. Click on `Microsoft cloud security benchmark`
7. Click `Add Filter` and select `Effect`
8. Check the `Disabled` box to search for all disabled policies
9. Click `Apply`
10. Click the blue ellipsis `...` to the right of a policy name.
11. Click `Manage effect and parameters`.
12. Under `Policy effect`, select the radio button next to `Audit`.
13. Click `Save`.
14. Click `Refresh`.
15. Repeat steps 10-14 until all disabled policies are updated.
16. Repeat steps 1-15 for each Management Group or Subscription requiring remediation.
