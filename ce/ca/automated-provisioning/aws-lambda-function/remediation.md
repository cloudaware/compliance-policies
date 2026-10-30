# Remediation

Review the Lambda function and confirm whether it is associated with an expected automated provisioning or service-managed workflow.

Use the function tags, CloudFormation stack relationship, Service Catalog provisioned product, AWS SAM deployment source, and recent creation events to understand how the function was created or is managed.

Do not add or edit AWS-managed tags only to change this policy result. AWS-reserved tags and service-managed default tags are intended to be applied by the service that owns the provisioning workflow. Retire the function if review confirms it is no longer required.
