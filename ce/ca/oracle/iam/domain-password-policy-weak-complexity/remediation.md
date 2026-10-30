# Remediation

## Update Password Policy Requirements

Update each affected group password policy so passwords must be at least 14 characters long and must include at least one numeric character and at least one special character. If a group uses `simplePasswordPolicy` or `standardPasswordPolicy`, move the group to a custom password policy that meets these requirements.

### From Oracle Cloud Console

1. Open `Identity & Security`.
2. Select `Domains`.
3. Open the affected identity domain.
4. Open `Settings`, then select `Password policy`.
5. For an affected custom password policy, edit the policy and configure:
   - `Password length (minimum)`: `14` or greater.
   - `Numeric (minimum)`: `1` or greater.
   - `Special (minimum)`: `1` or greater.
6. For a group assigned to `simplePasswordPolicy` or `standardPasswordPolicy`:
   - Create a custom password policy with the required settings.
   - Open the affected group.
   - Assign the group to the custom password policy.
7. Save the changes.
8. Confirm each affected group is assigned to a compliant custom password policy.
