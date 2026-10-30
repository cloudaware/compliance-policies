# Description

This policy identifies AWS MQ brokers that are configured to be **publicly accessible**.

To reduce security exposure, Amazon MQ brokers deployed within your AWS account should not be accessible from the public internet. Publicly accessible brokers increase the risk of unauthorized access and potential data exposure.

## Rationale

Amazon MQ brokers should be deployed within private subnets to ensure access is restricted to resources inside the VPC or through secure connectivity mechanisms such as AWS Site-to-Site VPN, Client VPN, or AWS Direct Connect. Making a broker publicly accessible exposes it to external threats, including brute-force attacks and other malicious activity.

## Audit

This policy flags an *AWS MQ Broker* as `INCOMPLIANT` when the `Publicly Accessible` field is set to **true**.
