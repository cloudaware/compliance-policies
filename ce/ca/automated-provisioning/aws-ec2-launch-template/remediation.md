# Remediation

Review the EC2 launch template and confirm how it was created and managed.

Validate whether the launch template is associated with a CloudFormation stack, Service Catalog provisioned product, Amazon EKS managed node group, AWS Application Migration Service workflow, or AWS Elastic Disaster Recovery workflow. If the launch template is intentionally managed outside those workflows, document the owner, creation source, and expected management process. Retire the launch template if review confirms it is no longer needed.
