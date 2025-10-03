# Description

This policy identifies AWS ECR Repositories that are not configured with image tag immutability. When enabled, image tag immutability prevents existing image tags from being overwritten by subsequent pushes with the same tag.

## Rationale

Setting image tag mutability to `IMMUTABLE` ensures that a tag, such as `my-app:latest` or `my-app:v1.0`, consistently references a specific image digest. This safeguards against accidental or malicious overwrites, which could result in deploying incorrect or vulnerable application versions. Immutable tags provide a reliable and auditable deployment history, facilitating rollbacks and supporting a secure software supply chain.

To selectively allow updates, you can configure **Mutable tag exclusions** or **Immutable tag exclusions**, enabling flexibility for specific use cases while maintaining overall immutability.

## Audit

This policy flags an *AWS ECR Repository* as `INCOMPLIANT` if its `Image Tag Mutability` is set to **MUTABLE**.
