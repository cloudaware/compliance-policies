# Description

Ensure that all database instances within your Amazon Aurora clusters have consistent accessibility settings, either all public or all private, in alignment with the Fault-Tolerance AWS best practices. This practice ensures seamless connectivity and optimal failover performance for your Aurora clusters.

## Rational

It is highly recommended to have all the database instances running within an Aurora cluster as either publicly or privately accessible because in case of a failover, an instance might go from publicly accessible to privately accessible and obstruct the connectivity to the database cluster.

In the event of a failover, the accessibility setting (public or private) of the instance should remain consistent to avoid connectivity issues. A discrepancy in accessibility settings can lead to a situation where an instance switches from being publicly accessible to privately accessible, disrupting access to the database cluster.

Consistency in accessibility settings helps maintain a secure network environment and ensures compliance with organizational policies and regulatory requirements. Publicly accessible instances expose databases to the internet, which might be necessary for some applications but could pose security risks if not managed properly.

Uniform accessibility settings simplify the management and monitoring of Aurora clusters, making it easier to implement network policies, troubleshoot issues, and maintain overall operational efficiency.

## Impact

Mixed accessibility settings can expose parts of the cluster to unintended network environments, increasing the risk of unauthorized access and potential security breaches.

## Audit

This policy will mark an AWS RDS Aurora cluster as `COMPLIANT` if all of the cluster's related AWS RDS instances have the same `PubliclyAccessible` attribute value.

If at least one of the related AWS RDS Instances' accessibility statuses differs from the others, the policy will mark the cluster as `INCOMPLIANT`.
