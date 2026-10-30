[Back](../index.md)

# Automated Provisioning

This dashboard presents the information about objects that were created via automated processes like:

- CloudFormation
- AutoScaling
- EMR
- EKS
- Fleet
- Spot
- ElasticBeanstalk
- Service Catalog
- EKS Alpha
- k8s
- etc.

The dashboard includes:

- Resource Count by status (Automated vs Not Automated). Presented as bar chart with 2 bars.
- Resource Count by Provisioning Source. Column chart, each column showing number of resources provisioned from a specific source.
- Coverage by Account. Horizontal bar chart, each bar is an AWS Account and the value is % of resources that were created by automated process out of all resources.
- Coverage by Object Type. Similar to Coverage by Account, but instead grouped by Object Types.

## Issues

- ❌ CMDB does not have normalized data for these dashboards
  - Possible solution is to create CEv2 policies that mark the objects accordingly and create dashboard from the output of these policies.
