# Description

Ensure that AWS EC2 instances are not configured with the legacy paravirtual (PV) virtualization type. Hardware Virtual Machine (HVM) is the current standard and provides significant performance and compatibility advantages.

## Rational

HVM AMIs offer full hardware virtualization, allowing guest operating systems to run as if they were on native hardware. This reduces overhead, improves efficiency, and delivers superior performance. Additionally, many modern EC2 instance families and AWS features, such as Enhanced Networking and GPU support, are only available with HVM AMIs.

## Impact

Instances running on PV virtualization may experience degraded performance compared to HVM-based instances. They are also ineligible for migration to newer, more cost-efficient instance families, which can lead to increased operational costs and prevent adoption of the latest AWS capabilities.

Migrating from PV to HVM requires creating new instances from HVM-based AMIs, which involves downtime and a planned migration effort.

## Audit

The *AWS EC2 Instance* is marked as `INCOMPLIANT` if its `Virtualization Type` is set to **paravirtual**.

The *EC2 Instance* is flagged as `INAPPLICABLE` if it's not **running**.
