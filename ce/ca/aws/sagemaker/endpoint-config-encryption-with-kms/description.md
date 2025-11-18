# Description

This policy identifies AWS SageMaker Endpoint Configurations that do not use an AWS KMS customer-managed key (CMK) for storage encryption.

## Rationale

By default, the storage volume for a SageMaker endpoint is encrypted with a temporary, Amazon-managed key. Using a customer-managed KMS key provides an additional layer of security and control. It enables you to manage the key lifecycle, define access policies, and audit key usage, which is critical for protecting sensitive machine learning models and associated data.

## Audit

This policy flags an *AWS SageMaker Endpoint Configs* as `INCOMPLIANT` if the `KMS Key ID` field is **empty**.
