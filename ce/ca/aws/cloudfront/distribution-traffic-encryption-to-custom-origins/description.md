# Description

Ensure that AWS CloudFront Distributions communicating with custom origins enforce end‑to‑end encryption by using HTTPS.

**Note**: Distributions using Amazon S3 buckets as custom origins for static website hosting are excluded, as those endpoints do not support HTTPS.

## Rationale

Requiring HTTPS between CloudFront edge locations and your origin ensures that data in transit remains confidential and tamper‑proof, mitigating the risk of man‑in‑the‑middle attacks.

## Audit

This policy flags an *AWS CloudFront Web Distribution* as `INCOMPLIANT` if at least one custom *AWS CloudFront Origin* associated with the distribution (excluding S3 static websites as origin) meets one of the following conditions:

- The Origin's `Custom Origin Config Protocol Policy` field is set to **http-only**
- The Origin's `Custom Origin Config Protocol Policy` field is set to **match-viewer** , and at least one associated *AWS CloudFront Cache Behavior* has the `Viewer Protocol Policy` field set to **allow-all**.

If a Web Distribution has no Origins in the CMDB or a custom Origin's `Config Protocol Policy` is set to **match-viewer** but there are no related Cache Behaviors in the CMDB, the Distribution is marked as `UNDETERMINED`.
