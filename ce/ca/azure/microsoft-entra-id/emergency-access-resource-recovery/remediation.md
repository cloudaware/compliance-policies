# Remediation

Microsoft Entra ID roles grant no Azure RBAC, so a tenant can lose all ability to manage its subscriptions while Global Administrators remain. A Global Administrator restores access by setting Access management for Azure resources to Yes, which grants root-scope access. Maintain emergency access accounts (aka "break-glass accounts") and a tested recovery procedure.

Maintain at least two cloud-only emergency access accounts with active, permanent **Global Administrator** assignments. Protect their credentials under dual control, monitor every sign-in, and exclude the accounts from Conditional Access policies that could block emergency sign-in.

Document and test resource-access recovery at least every **90 days**. During recovery, temporarily enable **Access management for Azure resources**, sign out and back in, and grant **Owner** only at the subscription or non-root management group being recovered. Restore normal access, set **Access management for Azure resources** back to **No** to remove the temporary root-scope elevation, and sign out.

Automated assessment is unavailable: Emergency-account designation and a tested resource-access recovery procedure require organizational review.
