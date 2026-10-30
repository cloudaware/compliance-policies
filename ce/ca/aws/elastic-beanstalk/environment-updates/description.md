# Description

This policy identifies AWS Elastic Beanstalk Environments that do not have **Managed Platform Updates** enabled.

Managed platform updates use an immutable deployment model to automatically upgrade an Elastic Beanstalk environment to a new platform version. During an immutable update, Elastic Beanstalk provisions a parallel set of EC2 instances running the new platform version while the existing instances continue to serve traffic. Once the new instances pass all health checks, the original instances are terminated, leaving only the updated environment in service. This approach ensures platform updates are applied without service interruption or in-place modification of existing instances.

## Rationale

Amazon Elastic Beanstalk regularly releases platform updates for Linux- and Windows-based environments. These updates include security patches, operating system fixes, performance improvements, and new platform features.

When Managed Platform Updates are enabled, Elastic Beanstalk applies these updates automatically during a user-defined maintenance window. Updates are performed using an immutable deployment strategy, ensuring that the environment can safely roll back to its original state if an update fails. This reduces operational risk while helping maintain a secure, stable, and up-to-date application environment.

## Audit

This policy flags an *AWS Elastic Beanstalk Environment* as `INCOMPLIANT` if its related *AWS Elastic Beanstalk Configuration Set.* does **not** include the following `Option Settings`:

- **aws:elasticbeanstalk:managedactions ManagedActionsEnabled true**

An *Elastic Beanstalk environment* is marked as `INAPPLICABLE` if its `Status` is not **Ready**.
