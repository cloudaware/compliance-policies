# Description

This policy checks that AWS CodeBuild projects that use Bitbucket as a source repository do **not** embed credentials within the repository URL.

## Rationale

Storing credentials directly in repository URLs is a critical security risk. These credentials can be inadvertently captured in build logs, command line history, or intercepted in transit, leading to unauthorized access to the source code repository. The recommended and more secure method for granting CodeBuild access to Bitbucket repositories is using OAuth.

## Audit

This policy marks an *AWS CodeBuild Project* as `INCOMPLIANT` if the project's `Source Type` is set to **BITBUCKET** and the `Source Location` URL has an **@** character embedded credentials in the URL.

Projects with any other `Source Type` are flagged as `INAPPLICABLE`.
