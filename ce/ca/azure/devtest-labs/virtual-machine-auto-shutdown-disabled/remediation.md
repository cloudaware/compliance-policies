# Remediation

Before enabling auto-shutdown, confirm the lab's operating hours, maintenance
windows, time zone, notification recipients, and any approved exception for workloads
that must remain available after hours.

## Azure portal

1. Open the affected Azure DevTest Lab.
2. Select **Configuration and policies**, then **Auto-shutdown**.
3. Set **Enabled** to **On**, then set a shutdown time and time zone that match the
   lab's approved operating schedule.
4. Configure notifications as required and select **Save**.
5. For a VM with an individual schedule, open the VM, select **Operations**, then
   **Auto-shutdown**, and set **Enabled** to **On**. Individual VM schedules can
   override the lab schedule when the lab's auto-shutdown policy permits them.
6. Verify that each affected VM reports an applicable shutdown schedule with status
   `Enabled` after the next Cloudaware collection.

## Automation

For infrastructure-as-code or API-based remediation, create or update the
`Microsoft.DevTestLab/labs/schedules` resource named `labVmsShutdown` with
`properties.status` set to `Enabled` and `properties.taskType` set to
`LabVmsShutdownTask`. Preserve the approved recurrence, time zone, and notification
settings when updating an existing schedule. This lab schedule applies to VMs without
an allowed individual schedule override.
