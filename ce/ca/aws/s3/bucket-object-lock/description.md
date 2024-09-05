# Description

Object Lock feature helps you ensure that your data remains unaltered and immutable for a specified retention period or indefinitely. It uses a write-once-read-many (WORM) model to store objects. You can use Object Lock to help meet regulatory requirements that require WORM storage, or to add another layer of protection against object changes or deletion.

## Rational

### Best practices for using S3 Object Lock

- Consider using Governance mode if you want to protect objects from being deleted by most users during a pre-defined retention period, but at the same time want some users with special permissions to have the flexibility to alter the retention settings or delete the objects.
- Consider using Compliance mode if you never want any user, including the root user in your AWS account, to be able to delete the objects during a pre-defined retention period.
- You can use Legal Hold when you are not sure for how long you want your objects to stay immutable. This could be because you have an upcoming external audit of your data and want to keep objects immutable till the audit is complete. Alternatively, you may have an ongoing project utilizing a dataset that you want to keep immutable until the project is complete.

### Considerations When Not to Use S3 Object Lock

- When your data requires frequent updates, modifications, or deletions, implementing S3 Object Lock may hinder operational agility and flexibility.
- When dealing with transient or temporary data that doesn't require long-term retention or immutability, using S3 Object Lock may add unnecessary complexity and overhead.
- When your application necessitates high throughput or frequent write operations to S3 objects, S3 Object Lock may introduce performance limitations due to its immutable nature.

## Audit

This policy marks an object as `INCOMPLIANT` when the `Object Lock Enabled` field value is `No`and `COMPLIANT` when the `Object Lock Enabled` field value is `Yes` otherwise the policy will mark the object as `UNDETERMINED`.

Additionally, `UNDETERMINED` status indicates a possible permissions issue with `s3:GetObjectLockConfiguration` API call.
