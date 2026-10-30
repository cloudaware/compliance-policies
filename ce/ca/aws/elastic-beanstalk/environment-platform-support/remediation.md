# Remediation

Migrate the application to an Elastic Beanstalk platform branch that AWS currently supports. Updating the platform revision within a retired branch does not restore support.

1. **Confirm the finding.** In the environment's AWS account and Region, verify the deployed solution stack and platform branch against the AWS retirement schedule. Reconcile missing or stale CMDB data before making changes.
2. **Plan the migration.** Select a supported target branch and review changes to the operating system, runtime, application server, dependencies, and configuration. Back up application data and prepare a rollback plan before changing production.
3. **Build and test the replacement.** Create a separate environment on the target branch and deploy the application. Preserve the required environment variables, secret references, IAM roles, networking, certificates, scaling settings, and external database connections. Validate startup, health checks, application behavior, logging, security controls, scaling, and data access.
4. **Move production traffic or processing.** Use the application's deployment process, including an environment URL swap where appropriate. For worker environments, coordinate queue processing to prevent unintended duplicate consumers. Keep the original environment available until the replacement is verified.
5. **Verify and complete the migration.** Check production health, confirm that CMDB collection reports the new solution stack, and reevaluate the policy. Terminate the original environment only after confirming that rollback is no longer required.

Use an in-place platform change only when AWS supports the specific transition and compatibility testing confirms it is suitable. Follow AWS's migration guidance for the source and target branches; use a separate environment when the transition requires replacement or when rollback depends on retaining the original environment.

For Docker or ECS platforms, migrate the host platform branch and maintain the application's container image and runtime separately. A custom container image does not restore support to a retired host branch.

After migration, enable managed platform updates to receive eligible minor and patch updates within the supported branch. Managed updates do not migrate between branches or extend a branch's support period.

Prioritize Windows Server 2016 migrations. AWS states that the default AMIs become inaccessible on January 15, 2027, preventing operations that launch new instances, including scaling and instance replacement. Retaining a custom AMI does not restore Elastic Beanstalk branch support.
