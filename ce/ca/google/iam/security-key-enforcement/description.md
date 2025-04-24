# Description

Setup Security Key Enforcement for Google Cloud Platform admin accounts.

## Rationale

Google Cloud Platform users with Organization Administrator roles have the highest level of privilege in the organization. These accounts should be protected with the strongest form of two-factor authentication: Security Key Enforcement. Ensure that admins use Security Keys to log in instead of weaker second factors like SMS or one-time passwords (OTP). Security Keys are actual physical keys used to access Google Organization Administrator Accounts. They send an encrypted signature rather than a code, ensuring that logins cannot be phished.

## Impact

If an organization administrator loses access to their security key, the user could lose access to their account. For this reason, it is important to set up backup security keys.

## Audit

1. Identify users with Organization Administrator privileges:

     gcloud organizations get-iam-policy ORGANIZATION_ID

Look for members granted the role `roles/resourcemanager.organizationAdmin`.
2. Manually verify that Security Key Enforcement has been enabled for each account.

## Default Value

By default, Security Key Enforcement is not enabled for Organization Administrators.

## References

1. <https://cloud.google.com/security-key/>
2. <https://gsuite.google.com/learn-more/key_for_working_smarter_faster_and_more_securely.html>
