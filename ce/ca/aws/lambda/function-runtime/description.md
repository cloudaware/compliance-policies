# Description

This policy identifies AWS Lambda functions whose configured runtime is past the AWS Lambda runtime deprecation date. It evaluates the **Runtime** on the AWS Lambda Function record for Zip deployments.

AWS Lambda supports multiple runtimes for various programming languages. Each runtime is tied to a specific version of the programming language and underlying operating system. When a language or operating system reaches its end of life (EOL), AWS deprecates the associated Lambda runtime.

## Rationale

AWS may stop providing security updates at runtime deprecation, and functions using a deprecated runtime are no longer eligible for technical support. Existing functions can remain invocable indefinitely but may encounter vulnerabilities, expired certificates, or other failures. Owners can address the finding by migrating to a supported runtime or safely retiring an obsolete function.

Deprecation, blocking function creation, and blocking function updates are separate stages. The console prevents creation and updates using a deprecated runtime at deprecation; CLI/API restrictions follow the published create/update-block dates, which AWS can delay. Those delays do not extend runtime support. For example, Python 3.10 is scheduled for deprecation on October 31, 2026; this policy flags it beginning November 1, 2026 UTC, even though its API create/update blocks are scheduled for 2027.

Published versions often retain older runtimes for rollback or historical releases. This policy evaluates only the configured function runtime to avoid findings caused by those retained versions. Published versions, alias targets, and Lambda@Edge version associations are outside its scope; a compliant result does not establish the runtime used by every caller.

## Impact

Runtime migration can require code, dependency, layer, and native-library changes. When production callers use a published version, publishing a replacement also requires a controlled migration of callers and aliases. Removing retained versions is not required to resolve this policy's findings.

## Audit

This policy marks an *AWS Lambda Function* as `INCOMPLIANT` if its **Package Type** is `Zip` and its configured **Runtime** is already deprecated, or has a scheduled AWS Lambda deprecation date.

The function is `COMPLIANT` when **Package Type** is `Zip` and its configured **Runtime** is nonempty and does not match an effective deprecation.

The function is `INAPPLICABLE` when **Package Type** is `Image`, because image contents require separate inspection.

Missing or unrecognized **Package Type**, or an empty Zip **Runtime**, produces `UNDETERMINED`.
