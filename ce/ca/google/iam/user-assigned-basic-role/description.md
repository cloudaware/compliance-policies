# Description

This policy identifies Google IAM Users (Google Accounts as principal identifiers) assigned one of the following basic IAM roles: Owner, Editor, or Viewer.

## Rationale

Basic roles are highly permissive, granting extensive permissions across all Google Cloud services. This approach violates the principle of least privilege and increases the risk of security breaches, accidental data loss, or service disruptions if a user’s credentials are compromised or misused. Adopting more granular predefined roles, or creating custom roles tailored to specific tasks, helps ensure users have only the permissions necessary to perform their job functions.

## Impact

Requires careful planning to ensure the user retains the necessary permissions to perform their job functions without interruption.

## Audit

This policy flags a *Google IAM Policy Binding Member (User)* as `INCOMPLIANT` if its related *Google IAM Policy Binding* `IAM Role Name` is set to **roles/owner**, **roles/editor**, or **roles/viewer**.
