# Description

This policy identifies AWS ECS Fargate Services that are configured with **platform version 1.1.0, 1.2.0 or 1.3.0**, or have running tasks using these versions.

AWS Fargate platform versions identify the kernel and container runtime used by tasks; they are separate from task-definition revisions, container image versions and internal platform patch revisions. The latest platform versions are Linux **1.4.0** and Windows **1.0.0**.

## Rationale

Running services on outdated platform versions prevents access to the latest features, performance optimizations, and security enhancements.

## Impact

Upgrading to a newer platform version may require operational effort to ensure compatibility with existing tasks and configurations. Migrating to Linux 1.4.0 changes task networking; check task-ENI access to image registries, logs and secrets.

## Audit

This policy marks an *AWS ECS Service* as `INCOMPLIANT` if its `Platform Version`, or the `Platform Version` of a related *AWS ECS Task* with `Last Status` **RUNNING** and `Launch Type` **FARGATE**, is **1.1.0**, **1.2.0** or **1.3.0**. The service must have `Status` **ACTIVE**; a confirmed older configuration or task takes precedence over task-data diagnostics, even when scaled to zero.

Inactive ECS Services and other non-Fargate services are marked as `INAPPLICABLE`. This includes **DRAINING**, **INACTIVE**, and launch types **EC2**, **EXTERNAL** and **MANAGED_INSTANCES**.

A service is `COMPLIANT` when at least one running Fargate task is assessed, all assessed tasks use Linux **1.4.0** or Windows **1.0.0**, and its configured version is **LATEST**, **1.4.0**, **1.0.0** or absent. Services with no assessable running Fargate tasks are `INAPPLICABLE`.
