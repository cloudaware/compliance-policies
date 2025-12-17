# Description

This policy identifies AWS ECS Fargate Services that are configured with **platform version 1.3.0**.

AWS Fargate platform versions are immutable runtime environments. Version 1.3.0 is considered outdated compared to 1.4.0 and later, which include significant architectural and performance improvements.

## Rationale

Running services on outdated platform versions prevents access to the latest features, performance optimizations, and security enhancements.

## Impact

Upgrading to a newer platform version may require operational effort to ensure compatibility with existing tasks and configurations.

## Audit

This policy marks an **AWS ECS Fargate Service** as `INCOMPLIANT` if the **Platform Version** is set to **1.3.0**.

Inactive ECS Services and other non-Fargate services are marked as `INAPPLICABLE`.
