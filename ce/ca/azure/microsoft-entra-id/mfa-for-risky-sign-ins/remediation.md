# Remediation

## From Azure Portal

1. In the Azure portal, open the portal menu in the upper left and select `Microsoft Entra ID`.
2. Select `Security`.
3. Select `Conditional Access`.
4. Select `Policies`.
5. Click `+ New policy`.
6. Enter a name for the policy.
7. Click the blue text under `Users`.
8. Under `Include`, select `All users`.
9. Under `Exclude`, check `Users and groups`.
10. Select the users this policy should not apply to and click `Select`.
11. Click the blue text under `Target resources`.
12. Select `All cloud apps`.
13. Click the blue text under `Conditions`.
14. Select `Sign-in risk`.
15. Update the `Configure` toggle to `Yes`.
16. Check the sign-in risk level this policy should apply to, e.g. `High` and `Medium`.
17. Select `Done`.
18. Click the blue text under `Grant`, check `Require multifactor authentication`, then click `Select`.
19. Click the blue text under `Session`, check `Sign-in frequency`, select `Every time`, and click `Select`.
20. Set `Enable policy` to `Report-only`.
21. Click `Create`.

After testing the policy in report-only mode, update the `Enable policy` setting from `Report-only` to `On`.
