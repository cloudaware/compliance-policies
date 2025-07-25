# Description

Ensure that all attached AWS EBS volumes are encrypted at rest using AWS-managed or customer-managed keys. Encryption provides a critical layer of data protection and should be enforced for all in-use volumes.

## Rational

Encrypting EBS volumes at rest helps safeguard sensitive data from unauthorized access in the event of physical compromise or internal misuse. Enforcing encryption for all attached volumes ensures that data is protected during operation and aligns with security best practices and compliance requirements.

## Audit

This policy flags an *AWS EBS Volume* as `INCOMPLIANT` if the `Encrypted` checkbox is set to **false** and the Volume is currently **attached** to an EC2 instance.

Volumes that are **not attached** to any instance are marked as `INAPPLICABLE`.
