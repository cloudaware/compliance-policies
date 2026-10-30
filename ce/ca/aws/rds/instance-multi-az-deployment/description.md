# Description

Amazon RDS offers Multi-AZ deployments that provide enhanced availability and
durability for your databases, using synchronous replication to replicate data to a
standby instance in a different Availability Zone (AZ). In the event of an infrastructure
failure, Amazon RDS automatically fails over to the standby to minimize downtime and
ensure business continuity.

## Rationale

Database availability is crucial for maintaining service uptime, particularly for
applications that are critical to the business. Implementing Multi-AZ deployments with
Amazon RDS ensures that your databases are protected against unplanned outages
due to hardware failures, network issues, or other disruptions. This configuration
enhances both the availability and durability of your database, making it a highly
recommended practice for production environments.

## Impact

Multi-AZ deployments may increase costs due to the additional resources required to
maintain a standby instance; however, the benefits of increased availability and reduced
risk of downtime outweigh these costs for critical applications.

## Audit

This policy flags an *AWS RDS Instance* as `INCOMPLIANT` if the `Multi AZ` checkbox is set to **false**.

*Instances* that are **not in an available state** or that **belong to an RDS cluster** are marked as `INAPPLICABLE`.
