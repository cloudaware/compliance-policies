# Description

This policy identifies AWS Elastic Load Balancers that are considered idle, including **Application Load Balancers (ALBs)** and **Classic Load Balancers (CLBs)**. A load balancer is classified as idle if it has processed zero requests (that is, the `RequestCount` metric equals 0) over a 30 days period.

## Rationale

Idle load balancers continue to incur hourly charges even when they are not serving traffic. Identifying and decommissioning unused ALBs and CLBs helps reduce unnecessary costs, improve resource hygiene, and optimize overall AWS spending.

## Audit

This policy applies only to Application and Classic Load Balancers.

*AWS Elastic Load Balancer* is flagged as `INCOMPLIANT` if its `1-Month Request Count` metric is less than or equal to **0**.

An *ELB* is marked as `INAPPLICABLE` if its `Created Time` is less than 30 days ago.
