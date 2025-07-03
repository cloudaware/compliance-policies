# Description

Ensure that AWS Backup Recovery Points marked **EXPIRED** are successfully deleted according to their lifecycle schedule. A deletion failure is detected when the `CalculatedLifecycleDeleteAt` timestamp is either missing or older than 2 days relative to the current date.

## Rationale

Persisting expired recovery points beyond their defined retention window:

- Imposes unnecessary storage overhead and associated costs for data no longer required for recovery or compliance.
- Violates internal or external data-retention mandates that require disposal of data after a specified interval.
- Clutters the backup inventory, hindering rapid identification of valid recovery points and potentially extending recovery time objectives during critical incidents.

## Audit

This policy flags an *AWS Backup Recovery Point* as `INCOMPLIANT` if its `Status` field is set to **EXPIRED** and `Calc Lifecycle Delete At` is more than **2 days in the past** or **empty**, indicating that the Recovery Point has failed to delete.

The Recovery Point is marked as `INAPPLICABLE` if `Status` is not equal to **EXPIRED**.
