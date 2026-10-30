# Description

Identify Elastic Beanstalk environments running on a platform branch that AWS has retired. This policy evaluates branch support, using an explicit map of documented solution stack names and AWS retirement dates.

Retirement differs from a platform revision becoming superseded or from enabling managed updates. A newer revision on the same branch does not restore support after the branch retires. Managed updates apply eligible minor and patch updates within a branch; they do not migrate between branches, including after retirement. The platform's provisioning status, such as `Ready`, also does not establish support.

## Rationale

AWS stops providing maintenance updates, security updates, and technical support for retired platform branches. An existing environment can continue running after retirement, but the lack of fixes increases security and operational risk.

## Impact

Migrating to a supported branch can require changes to application code, dependencies, deployment configuration, and operating system assumptions. Test the replacement environment before moving production traffic.

## Audit

This policy marks an *AWS Elastic Beanstalk Environment* as `INCOMPLIANT` if **Status** is `Ready` and **Solution Stack Name** exactly matches a covered revision in one of the following branch groups.

| Branch group | Retirement date |
| --- | --- |
| Mapped Java 7 and Java 8 branches on Amazon Linux AMI | July 18, 2022 |
| Mapped .NET 6 branch on Amazon Linux 2023 | April 8, 2025 |
| Mapped Node.js 18 branches on Amazon Linux 2 and Amazon Linux 2023 | August 11, 2025 |
| Mapped PHP 8.1 branches on Amazon Linux 2 and Amazon Linux 2023 | April 16, 2026 |
| Mapped Corretto, Tomcat 9, Docker, and ECS branches on Amazon Linux 2 | August 6, 2026 |
| Mapped Node.js 20, Python 3.9, and Ruby 3.2 branches on Amazon Linux 2023 | August 13, 2026 |
| IIS 10.0 on Windows Server 2016 and Windows Server Core 2016 | September 30, 2026 |
| .NET 8, .NET 9, and PHP 8.2 on Amazon Linux 2023 | March 31, 2027 |
| Node.js 22 and Ruby 3.3 on Amazon Linux 2023 | July 31, 2027 |

All other applicable revisions are `COMPLIANT`, including future versions.

Environments are `INAPPLICABLE` if **Status** is `Aborting`, `Launching`, `Updating`, `LinkingFrom`, `LinkingTo`, `Terminating`, or `Terminated`. They are also `INAPPLICABLE` if **Solution Stack Name** is missing, does not start with `64bit `, or ends with ` custom`.
