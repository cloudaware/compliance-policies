# Description

Enable auto-shutdown for Azure DevTest Lab virtual machines unless the workload has
an approved operational exception. The applicable lab schedule controls the time at
which DevTest Lab shuts down virtual machines that are no longer needed.

## Rationale

Development and test workloads commonly run only during defined hours. An enabled
auto-shutdown schedule prevents unattended virtual machines from continuing to
consume billable compute resources outside those hours.

## Impact

Without auto-shutdown, inactive DevTest Lab virtual machines can continue to incur
compute charges. Enabling a schedule can interrupt workloads that are legitimately
needed after hours, so confirm the lab's maintenance window, time zone, and approved
exceptions before changing it.

## Audit

This policy marks an *Azure DevTest Lab Virtual Machine* as `INCOMPLIANT` if its
applicable `labVmsShutdown` schedule:

- Is missing, or
- Has a `status` other than `Enabled`.

## Default Value

By default, lab auto-shutdown is disabled.

## References

- <https://learn.microsoft.com/en-us/azure/devtest-labs/devtest-lab-auto-shutdown>
- <https://learn.microsoft.com/en-us/rest/api/dtl/schedules/create-or-update?view=rest-dtl-2018-09-15>
