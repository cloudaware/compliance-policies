# Remediation

## From Azure Portal

1. From Azure Home open Portal menu in the top left, and select `Microsoft Entra ID`.
2. Select `Security`.
3. Select `Conditional Access`.
4. Click `+ New policy`.
5. Enter a name for the policy.
6. Select `Users or workload identities`.
7. Under `Include`, select `All users`.
8. Under `Exclude`, check `Users and groups`.
9. Select users this policy should not apply to and click `Select`.
10. Select `Cloud apps or actions`.
11. Select `All cloud apps`.
12. Select `Grant`.
13. Under `Grant access`, check `Require multifactor authentication` and click `Select`.
14. Set `Enable policy` to `Report-only`.
15. Click `Create`.

After testing the policy in report-only mode, update the `Enable policy` setting from `Report-only` to `On`.
