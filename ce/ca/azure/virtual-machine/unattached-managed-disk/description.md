# Description

Ensure that Azure Managed Disks not currently attached to any Virtual Machine are either deleted or transitioned to an appropriate archival state.

## Rationale

Unattached Managed Disks continue to accrue storage costs, resulting in avoidable cloud expenditure. Proactively identifying and managing these resources is essential for cost optimization and operational efficiency.

Moreover, the presence of unattached disks introduces unnecessary clutter within the Azure environment, complicating resource tracking and increasing administrative overhead.

## Audit

This policy flags an *Azure Managed Disk* as `INCOMPLIANT` if the `Disk State` is set to **Unattached**.
