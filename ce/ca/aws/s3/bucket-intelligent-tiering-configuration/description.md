# Description

This policy identifies AWS S3 Buckets that use the Intelligent-Tiering storage class but do not have archive configurations enabled to automatically transition objects to the lower-cost Archive Access or Deep Archive Access tiers.

The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective access tier based on usage patterns, without performance impact or operational overhead. By default, it transitions objects between three low-latency access tiers: Frequent Access, Infrequent Access, and Archive Instant Access. To maximize cost savings, you can additionally enable one or both of the asynchronous archive access tiers.

## Rationale

Enabling the Archive Access and Deep Archive Access tiers allows S3 Intelligent-Tiering to automatically move objects that remain unused for 90 and 180 consecutive days, respectively, for up to 730 days. Leveraging these tiers provides significant cost savings for long-term data retention without requiring complex lifecycle configurations.

## Impact

If the Archive Access tiers are not enabled, objects in the Intelligent-Tiering storage class will only transition between Frequent Access, Infrequent Access, and Archive Instant Access. As a result, infrequently or never-accessed objects may remain in higher-cost storage instead of being transitioned to the most cost-efficient archival options.

## Audit

This policy flags an *AWS S3 Bucket* as `INCOMPLIANT` if:

- The bucket does not have `Intelligent Tiering Configurations` enabled, and either
  - The bucket contains objects stored in `Intelligent Tiering Storage`, or
  - `Lifecycle Rules` are configured to move objects to **Intelligent-Tiering**.

The *S3 Bucket* is marked as `INAPPLICABLE` if `Intelligent Tiering Storage` is **empty**, and `Lifecycle Rules` are **not** configured with **Intelligent Tiering**.
