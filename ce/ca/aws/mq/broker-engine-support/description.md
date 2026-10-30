# Description

This policy identifies AWS MQ Brokers whose current ActiveMQ or RabbitMQ engine minor version has reached its published Amazon MQ end of support (EOS) date.

## Rationale

Supported engine versions receive security patches, bug fixes, and other improvements. After EOS, Amazon MQ schedules an automatic upgrade within 45 days. Identifying brokers that remain on an EOS version helps teams resolve overdue upgrades and control application compatibility and maintenance risk.

## Impact

Upgrades can interrupt message processing and may require application or configuration changes, especially across RabbitMQ major versions. An automatic upgrade scheduled after EOS does not extend engine support.

## Audit

This policy marks an *AWS MQ Broker* as `INCOMPLIANT` if its **State** is **RUNNING**, **REBOOT_IN_PROGRESS**, **CRITICAL_ACTION_REQUIRED**, or **REPLICA**, and its current **Engine Type** and **Engine Version** match one of the following known Amazon MQ end-of-support versions.

| Engine type | Minor version | End of support |
| --- | --- | --- |
| ActiveMQ | 5.15 | September 16, 2024 |
| ActiveMQ | 5.16 | November 15, 2024 |
| ActiveMQ | 5.17 | June 16, 2025 |
| RabbitMQ | 3.11 | February 17, 2025 |
| RabbitMQ | 3.12 | March 17, 2025 |

An operational broker whose engine and version do not match these known EOS rules is `COMPLIANT`, including future minor and major versions.

Brokers in **DELETION_IN_PROGRESS**, **CREATION_FAILED**, or **CREATION_IN_PROGRESS** are `INAPPLICABLE` because they are being removed or have not reached an operational state.
