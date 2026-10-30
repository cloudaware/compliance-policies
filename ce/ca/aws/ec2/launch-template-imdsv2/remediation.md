# Remediation

## Require IMDSv2 for the Latest Launch Template Version

Launch Templates are immutable. To enforce IMDSv2, publish a new template version with the required metadata options.

### **From Command Line**

Create a new launch template version from the current latest version:

```sh
aws ec2 create-launch-template-version \
    --launch-template-id {{launch-template-id}} \
    --source-version {{current-latest-version-number}} \
    --version-description "Require IMDSv2" \
    --launch-template-data '{"MetadataOptions":{"HttpEndpoint":"enabled","HttpTokens":"required"}}'
```

This command creates a new latest version of the launch template.

Replace `{{current-latest-version-number}}` with the current latest launch template version.

If the launch template is managed through infrastructure as code, update the source configuration so future deployments continue to require IMDSv2.
