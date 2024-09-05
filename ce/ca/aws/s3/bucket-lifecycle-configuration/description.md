# Description

Configure Amazon S3 Lifecycle in order to ensure the automation of object lifecycle management, storage costs optimization, and compliance with data retention policies.

## Rational

An S3 Lifecycle configuration consists of rules that define actions to be taken on a group of objects. These actions include:

- **Transition Actions:** Move objects to different storage classes as they age, helping to optimize costs without manual intervention.

- **Expiration Actions:** Automatically delete objects that have reached the end of their lifecycle, ensuring compliance with data retention policies.

## Impact

Organizations may accumulate outdated or irrelevant data, resulting in cluttered storage environments that are more difficult to manage and maintain. Without proper lifecycle policies, the storage of redundant or obsolete data can consume significant resources and escalate costs unnecessarily.

## Audit

The object is marked as `INCOMPLIANT` if the `Lifecycle Rules JSON` field is empty or **none** of the Lifecycle rules in `Lifecycle Rules JSON` have `"status": "Enabled"`.

Lifecycle configuration on MFA-enabled buckets is not supported therefore if the `Versioning MFA Delete Enabled` field is set to `true`, the policy marks the object as `INAPPLICABLE`.

`UNDETERMINED` status indicates a possible permission issue with `s3:GetLifecycleConfiguration` API call.
