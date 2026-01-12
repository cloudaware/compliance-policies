# Description

Identify AWS IAM users that exist in the account but do not have an enabled console password and do not have any active programmatic access keys.

## Rationale

Although IAM users without active credentials cannot currently be used to access AWS resources, their continued presence introduces several risks:

1. **Administrative Overhead**: These users add unnecessary clutter to the IAM console, credential reports, and access reviews.
2. **Permission Creep**: If such users remain members of IAM groups or have inline policies attached, those permissions could become immediately effective if a password or access key is later created.
3. **Security Blind Spots**: Dormant accounts are rarely monitored. An attacker with `iam:CreateAccessKey` permissions could exploit these users to establish persistence without triggering alerts for an active human user.

## Audit

This policy marks an *AWS IAM User* as `INCOMPLIANT` if all of the following `Cred Report Attributes` are set to **false**:

* **password_enabled**
* **access_key_1_active**
* **access_key_2_active**

If any of these attributes are set to **true**, the user’s credentials are evaluated by the policy
[`AWS IAM User with credentials unused for 45 days or more is not disabled`](../disable-user-with-unused-credentials-45-days-and-more/).

An *AWS IAM User* is marked as `INAPPLICABLE` if its **Create Date** is within the last 30 days, providing a grace period for initial setup.

A status of `UNDETERMINED` may indicate insufficient permissions to retrieve the credential report via the `iam:GetCredentialReport` API.
