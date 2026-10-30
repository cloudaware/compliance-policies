# Remediation

Review the VPC subnet and confirm its creation source, owner, and expected management workflow.

If the subnet appears to be managed through AWS CloudFormation or AWS Service Catalog, validate that the associated stack or provisioned product is still the expected source of management. If the subnet was created manually or through another workflow, confirm that the ownership and lifecycle expectations are documented. Retire the subnet if it is no longer required.
