# Description

This policy identifies AWS SageMaker Notebook Instances that are not configured to use a Customer-Managed Key (CMK) from AWS Key Management Service (KMS) for encrypting data at rest. By default, SageMaker uses an AWS-managed key for encryption; however, leveraging a Customer-Managed Key offers enhanced control over key management and access policies.

## Rationale

Encrypting SageMaker notebook instance volumes with a Customer-Managed Key provides stronger security and compliance controls. It allows for full lifecycle management of the encryption key, including creation, rotation, and deactivation. Additionally, it enables fine-grained access controls and auditing of key usage, supporting adherence to organizational and regulatory data protection requirements.

## Impact

Remediation requires provisioning a new SageMaker notebook instance configured with the desired Customer-Managed Key, as the encryption key of an existing instance cannot be modified. This process may involve migrating data from the current instance to the newly created one.

## Audit

This policy flags an *AWS SageMaker Notebook Instance* as `INCOMPLIANT` if the `KMS Key ID` field is **empty**.
