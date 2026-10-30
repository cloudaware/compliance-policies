# Description

Google Cloud Resource Manager folders should be structured primarily by environment, such as production, non-production, and sandbox, and by sensitivity, such as security, logging, shared services, or regulated workloads.

## Rationale

Folders provide a hierarchy for inherited IAM policies, organization policies, and other guardrails. A folder structure aligned to environment and sensitivity helps apply consistent controls to projects with similar risk profiles. Ad hoc or organization-chart-based structures can make policy inheritance harder to reason about and can mix workloads with different security requirements.

## Impact

Changing folder structure can affect inherited IAM permissions, organization policies, automation, and operational ownership. Plan and test project moves before applying changes to production workloads.

## Audit

### From Google Cloud Console

1. Open the Google Cloud Console at <https://console.cloud.google.com>.
2. Select the organization.
3. Go to `IAM & Admin` > `Manage resources`.
4. Review the folder hierarchy.
5. Verify that top-level and key folders are organized by environment and sensitivity, and that projects with different control requirements are not grouped under the same folder without a clear reason.
