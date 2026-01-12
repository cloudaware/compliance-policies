# Description

This policy identifies Amazon EMR clusters that are not associated with an EMR security configuration.
Security configurations enable encryption and other protective controls to safeguard sensitive data processed and stored by EMR clusters.

Data encryption helps prevent unauthorized access to sensitive information within EMR clusters and their associated storage systems. This includes data stored on persistent media (**data at rest**) and data transmitted across the network (**data in transit**).

## Rationale

Protecting data throughout its lifecycle is a fundamental security requirement for distributed data processing environments such as Amazon EMR.

1. **Encryption at Rest**

   Prevents unauthorized access to data stored on local disks or attached Amazon EBS volumes in the event of underlying infrastructure compromise.

2. **Encryption in Transit**

   Protects data exchanged between EMR nodes (for example, primary and core nodes in the Hadoop ecosystem), reducing the risk of man-in-the-middle attacks within the VPC.

## Audit

This policy flags an *AWS EMR Cluster* as `INCOMPLIANT` if it is not associated with an **AWS EMR Security Configuration**.
