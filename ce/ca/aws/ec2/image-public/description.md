# Description

This policy identifies Amazon Machine Images (AMIs) that are configured with **public** launch permissions. A public AMI can be launched by any AWS account.

To prevent unintended data exposure, AMIs should not be publicly shared unless explicitly required. If sharing is necessary, AMIs should be shared only with specific, trusted AWS accounts rather than made public.

## Rationale

Publicly accessible AMIs appear in the **Community AMIs** catalog and can be used by any AWS account to launch Amazon EC2 instances. AMIs capture the full state of a virtual machine and may contain proprietary software, configuration files, or sensitive data, including hardcoded credentials.

Unless an AMI is intentionally created for public software distribution, it should remain private or be shared only with trusted AWS accounts to reduce the risk of data leakage and intellectual property exposure.

## Audit

This policy flags an *AWS EC2 Image* as `INCOMPLIANT` if the `Public` field is set to **True**.
