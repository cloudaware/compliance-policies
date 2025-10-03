# Description

This policy identifies AWS ECR Repositories that do not have a lifecycle policy configured. A lifecycle policy is a set of rules that automates the management of images in a repository, helping to clean up old or unused images.

## Rationale

Configuring a lifecycle policy is a best practice for managing container images in ECR. It helps to:

- **Reduce Storage Costs:** Automatically removes old or untagged images, preventing them from accumulating and incurring unnecessary storage charges.
- **Improve Repository Hygiene:** Keeps repositories clean and makes it easier to find relevant images.
- **Avoid Hitting Service Quotas:** Prevents reaching the maximum number of images allowed per repository.

## Audit

This policy flags an *AWS ECR Repository* as `INCOMPLIANT` if its `Lifecycle Policy Text JSON` is **empty**.
