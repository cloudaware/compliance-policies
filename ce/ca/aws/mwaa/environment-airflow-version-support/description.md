# Description

This policy identifies AWS MWAA environments whose configured Apache Airflow version has reached its
**Amazon MWAA end-of-support date**. It uses the [AWS support schedule](https://docs.aws.amazon.com/mwaa/latest/userguide/airflow-versions.html)
reviewed on October 27, 2026. A supported release does not fail merely because a newer release exists
or upstream Apache Airflow support has ended.

## Rationale

An environment can continue operating after MWAA ends support for its Airflow version, but AWS no
longer provides technical support for that environment. Continued use increases security, privacy,
and operational risks, including downtime. Upgrading to a supported release reduces these risks and
restores access to technical support.

## Impact

Changing Airflow versions can affect DAGs, provider packages, plugins, Python dependencies, and
configuration options. Plan a maintenance window and test workflow compatibility before upgrading.

## Audit

This policy marks an *AWS MWAA Environment* as `INCOMPLIANT` if its **Status** is **AVAILABLE** or
**UPDATE_FAILED** and its **Airflow Version** is one of the end-of-support releases listed below.
**UPDATE_FAILED** remains in scope because AWS defines it as a successful rollback to the previous,
usable environment.

| Airflow Version           | Amazon MWAA end-of-support date |
| ------------------------- | ------------------------------- |
| `1.10.12`                 | February 21, 2024               |
| `2.0.2`                   | April 29, 2024                  |
| `2.2.2`                   | June 27, 2024                   |
| `2.4.3`, `2.5.1`, `2.6.3` | December 30, 2025               |

The environment is `COMPLIANT` in either assessable state when its nonempty **Airflow Version** does
not match one of these releases. New and future versions pass without requiring a compliant-version
list.

The environment is `INAPPLICABLE` when **Status** is **CREATING**, **CREATE_FAILED**, **PENDING**,
**UPDATING**, **ROLLING_BACK**, **CREATING_SNAPSHOT**, **MAINTENANCE**, **UNAVAILABLE**, **DELETING**,
or **DELETED**. These states do not establish a stable, usable environment version.

Missing **Status**, an unrecognized status, or missing **Airflow Version** in an assessable state
produces `UNDETERMINED`.
