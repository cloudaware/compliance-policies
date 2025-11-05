# Description

This policy identifies AWS Elastic Beanstalk Environments that do not have enhanced health reporting enabled.

## Rationale

Enabling Enhanced Health Reporting provides significant operational advantages. It allows for faster detection and diagnosis of issues that may affect application availability and performance. The detailed metrics and customizable health dashboards offer deeper insights into the root causes of problems, helping reduce downtime and improve overall reliability.

In contrast, Basic Health Reporting only provides binary instance health information from Elastic Load Balancing checks, which is often insufficient for diagnosing complex issues.

## Audit

This policy flags an *AWS Elastic Beanstalk Environment* as `INCOMPLIANT` if its related *AWS Elastic Beanstalk Configuration Set.* contains the entry **aws:elasticbeanstalk:healthreporting:system SystemType basic** in `Option Settings`.

*Beanstalk Environment* is marked as `INAPPLICABLE` in its `Status` is not **Ready**.
