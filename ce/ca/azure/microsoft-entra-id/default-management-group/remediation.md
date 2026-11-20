# Remediation

A tenant places each new subscription under one of two scopes: the root management group, or another management group the organization designates. The Default management group hierarchy setting selects between them for the whole tenant. Prerequisites: Create the management group that will receive new subscriptions and assign it the policies and role assignments that new subscriptions must carry.

Using an account with **Hierarchy Settings Administrator** or **Owner** access on the root management group, open **Management groups**, select the root group, and open **Settings**. Choose **Change default management group**, select the designated group, and save the selection. Verify the hierarchy setting and the placement of a newly created subscription.

Automated assessment is unavailable: Tenant default management-group setting is not collected; current subscription membership does not establish the default for new subscriptions.
