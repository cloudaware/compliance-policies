# Description

This policy identifies AWS Accounts where service quotas for RDS Instances exceeds the service limit for your organization for the deployed RDS workloads. By default, CloudAware enforces a threshold of 90% of the maximum allowed number of provisioned database instances.

## Rationale

AWS imposes service quotas on the number of resources you can provision to protect you from unintentional spend and to ensure service availability. If your account hits the RDS instance limit, automated scaling activities, disaster recovery processes, or new deployments will fail. Proactively monitoring this count ensures you can request quota increases before business operations are impacted.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if the service quota for *AWS RDS Instances* reaches or exceeds the defined limit.

An *AWS Account* is marked as `UNDETERMINED` when AWS account service quota information is unavailable.

## References

1. <https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html>
2. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Limits.html>
