# Remediation

## From Azure Portal

1. From Azure Home open the Portal Menu in top left, and select Microsoft Entra ID.
2. Select `Security`.
3. Select `Conditional Access`.
4. Select `Policies`.
5. Click `+ New policy`.
6. Enter a name for the policy.
7. Click the blue text under `Users`.
8. Select `Select users and groups`.
9. Select administrative groups this policy should apply to and click `Select`.
10. Under `Exclude`, check `Users and groups`.
11. Select users this policy not should apply to and click `Select`.
12. Click the blue text under `Target resources`.
13. Select `All cloud apps`.
14. Click the blue text under `Grant`.
15. Under Grant access, check `Require multifactor authentication` and click `Select`.
16. Set `Enable policy` to `Report-only`.
17. Click `Create`.

After testing the policy in report-only mode, update the `Enable policy` setting from `Report-only` to `On`.
