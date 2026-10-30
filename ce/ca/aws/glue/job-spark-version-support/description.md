# Description

This policy identifies AWS Glue Spark batch and streaming job definitions configured with a Glue version that has passed AWS end of support (EOS).

`Glue Version` selects the managed runtime; it is not an Apache Spark version number. The check uses AWS Glue's lifecycle for that runtime, rather than upstream Apache Spark release age. It covers Spark jobs written in Python or Scala, including streaming jobs, without depending on worker type, execution class, or optional job arguments.

## Rationale

AWS does not provide security patches or technical support for Glue versions past EOS and may not honor their SLAs. At EOL, AWS prevents new jobs and job runs, stops existing runs and interactive sessions, and removes the version from SDKs and APIs. Reviewing retained job definitions helps prevent failures when scheduled or infrequently used workloads are needed again.

## Impact

Migrating to another Glue version can change Spark, Python, Scala, dependencies, connectors, permissions, and job behavior. Test workload compatibility, output correctness, performance, and bookmark handling before changing production jobs. A finding describes the collected configuration; it does not prove the job recently executed on the retired version.

## Audit

This policy marks an *AWS Glue Job* as `INCOMPLIANT` if `Command: Name` is **glueetl** or **gluestreaming** and `Glue Version` is **0.9**, **1.0**, or **2.0**. AWS has already ended support for all language variants of these versions. The finding concerns the job definition, regardless of recent runs or trigger state; a completed run does not retire a reusable job definition.

| Glue version / language variant | Apache Spark runtime | End of support | End of life |
| --- | --- | --- | --- |
| 0.9 | 2.2.1 | June 1, 2022 | April 1, 2026 |
| 1.0, Python 2 | 2.4.3 | June 1, 2022 | April 1, 2026 |
| 1.0, Scala/Python 3 | 2.4.3 | September 30, 2022 | April 1, 2026 |
| 2.0 | 2.4.3 | January 31, 2024 | April 1, 2026 |

The *Job* is marked as `COMPLIANT` for other nonempty Glue version values, including current and future versions. A supported version need not be the newest version. The policy checks current support classifications, without date comparisons, and does not validate version syntax. Update the unsupported-version list when AWS ends support for another version.

`Command: Python Version` describes Python shell jobs and does not determine a Spark job's runtime support; this check uses `Glue Version` for both batch and streaming jobs.

The *Job* is marked as `INAPPLICABLE` if `Command: Name` is `pythonshell` or `glueray`, even when `Glue Version` is missing.

Missing or unrecognized commands and missing Glue versions on Spark jobs are `UNDETERMINED`. Deleted jobs are `DISAPPEARED`.
