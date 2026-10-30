# Remediation

## Enforce MFA from Oracle Cloud Console

1. Sign in to the OCI Console.
2. Open the navigation menu and select `Identity & Security`.
3. Under `Identity`, select `Domains`.
4. Select the identity domain that contains the affected users.
5. Open `Security`, then select `Sign-on policies`.
6. If `Security Policy for OCI Console` exists, open it and confirm that:
   - The policy is activated.
   - The OCI Console application is assigned to the policy.
   - The `MFA for all users` rule is active.
   - The rule allows access, prompts for an additional factor, and sets MFA enrollment to `Required`.
7. If the `Security Policy for OCI Console` policy does not exist or cannot be used, create a sign-on policy for OCI Console access:
   - Select `Create sign-on policy`.
   - Add a sign-on rule for the users or groups that require OCI Console access.
   - Set the rule action to allow access.
   - Enable `Prompt for an additional factor`.
   - Set MFA enrollment to `Required`.
   - Add the OCI Console application to the policy.
   - Activate the policy after testing.
8. Keep any temporary administrator exclusion limited to rollout or emergency-access testing, and remove it after MFA enforcement is verified.
9. Have affected users complete MFA enrollment at their next OCI Console sign-in, then confirm their MFA status changes to `Activated`.

## User enrollment

After MFA is enforced, users are prompted to enroll when they sign in to the OCI Console. Each user must register an approved factor, such as Oracle Mobile Authenticator or another factor allowed by the identity domain MFA settings. Administrators can disable MFA for another user during account recovery, but MFA activation is completed by the user.
