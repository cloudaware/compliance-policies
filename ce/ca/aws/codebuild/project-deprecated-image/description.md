# Description

This policy checks whether an AWS CodeBuild project's `Environment Image` exactly matches an AWS-managed image in the published deprecated-image list.

## Rationale

Deprecated managed images no longer receive minor or patch updates from CodeBuild and are no longer cached on build hosts. Continuing to use them can expose build environments to unpatched vulnerabilities and increase provisioning time. Deprecation does not mean that AWS prevents builds from running.

## Impact

Moving to a current image can change runtimes, tools, operating-system packages, and default behavior. Test the project's buildspec and dependencies before updating production builds.

## Audit

This policy marks an *AWS CodeBuild Project* as `INCOMPLIANT` if its `Environment Image` exactly matches one of the following identifiers:

| Image identifier | Deprecation date |
| --- | --- |
| `aws/codebuild/standard:3.0` | June 30, 2022 |
| `aws/codebuild/amazonlinux2-x86_64-standard:2.0` | June 30, 2022 |
| `aws/codebuild/standard:4.0` | March 31, 2023 |
| `aws/codebuild/amazonlinux2-aarch64-standard:1.0` | March 31, 2023 |
| `aws/codebuild/amazonlinux2-x86_64-standard:3.0` | May 9, 2023 |

The project is marked as `COMPLIANT` if its `Environment Image` begins with `aws/codebuild/` and does not exactly match a listed deprecated image. This means no deprecation was identified by this check; it does not certify that the image or its runtimes are supported.

The project is marked as `INAPPLICABLE` if its image identifier is outside the `aws/codebuild/` namespace, including custom or private registry images. Their deprecation status cannot be established reliably from the AWS-managed image list.

Missing image values result in `UNDETERMINED` because the configured image cannot be evaluated.

The check evaluates the configured project image only. It does not resolve aliases, pinned tags, or digests, or assess individual build overrides and runtime support.
