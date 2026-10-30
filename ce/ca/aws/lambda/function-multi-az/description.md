# Description

This policy identifies AWS Lambda Functions that are not configured to use subnets across multiple Availability Zones (AZs). When a Lambda function is connected to a Virtual Private Cloud (VPC), it depends on the VPC’s networking infrastructure. To ensure high availability, the function should be able to fail over to another AZ in the event of a zonal outage.

## Rationale

If a Lambda function is configured to use subnets in only a single AZ, any disruption affecting that zone can result in function unavailability. Configuring subnets across multiple AZs allows the Lambda service to automatically route execution to an available zone, improving resilience and maintaining application availability.

## Audit

This policy flags an *AWS Lambda Function* as `INCOMPLIANT` when the number of associated *AWS Lambda Function Subnet Links* is fewer than **two**.

*Lambda functions* that are not attached to a VPC are marked as `INAPPLICABLE` and are covered by the [`AWS Lambda Function is not in a VPC`](../function-in-vpc/) policy.

*Lambda@Edge* functions are also marked as `INAPPLICABLE`, as VPC attachment is not supported for Lambda@Edge.
