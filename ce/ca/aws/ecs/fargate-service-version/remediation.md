# Remediation

## Update the ECS Service to Use the `LATEST` Platform Version

Before applying the update in production, ensure that your application is tested with the new platform version in a staging environment to verify compatibility.

Changing the platform version triggers a new service deployment. Confirm the operating system and target availability in the service's Region: the latest platform versions are Linux **1.4.0** and Windows **1.0.0**. For Linux 1.4.0, follow the [AWS migration guide](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform-version-migration.html); check task-ENI egress and VPC endpoints for image pulls, logs and secrets.

For the **ECS** deployment controller, use the command below. For **CODE_DEPLOY**, create a new CodeDeploy deployment; for **EXTERNAL**, create and promote an updated task set through that controller. These controllers do not support changing the platform version through `update-service`. Preserve existing service configuration and sufficient deployment capacity.

### **Using the AWS CLI**

```sh
aws ecs update-service \
    --region {{region}} \
    --cluster {{cluster-name}} \
    --service {{service-name}} \
    --platform-version LATEST \
    --force-new-deployment
```

`--force-new-deployment` also replaces old tasks when the service already selects LATEST. Alternatively, specify **1.4.0** explicitly for Linux.

Wait for the service to stabilize:

```sh
aws ecs wait services-stable \
    --region {{region}} \
    --cluster {{cluster-name}} \
    --services {{service-name}}
```

Use `describe-services` to check deployments and `list-tasks --service-name {{service-name}} --desired-status RUNNING` to find tasks. Inspect every task using `describe-tasks` in batches of at most 100, checking lookup failures, `platformFamily`, `platformVersion`, health and application traffic. LATEST alone does not prove that old tasks were replaced. For a scaled-to-zero service, validate a test deployment before relying on scale-out. Refresh CMDB service/task collection and rerun the policy; resolve missing data before treating a diagnostic as a finding.

Record the original configuration and use the deployment controller's rollback process if needed. A rollback must be able to launch replacement tasks; a deprecated platform can no longer launch new tasks. Forced deployments can pull changed images behind mutable tags, so verify image digests as well.
