# Remediation

A tenant permits management group creation under one of two rules: any user or service principal in the tenant, or only principals granted management group write permission on the root management group. The Require write permissions for creating new management groups setting selects between them. Prerequisites: Grant management group write permission on the root management group to every user and pipeline identity that must continue to create management groups.

Using an account with **Hierarchy Settings Administrator** or **Owner** access on the root management group, open **Management groups**, select the root group, and open **Settings**. Enable **Require write permissions for creating new management groups**. Verify that authorized identities can still create groups and that identities without the required permission cannot.

Automated assessment is unavailable: Tenant requireAuthorizationForGroupCreation is not collected.
