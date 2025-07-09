# Remediation

## Permissions

CloudFront delivers access logs via the CloudWatch vended logs. To enable and configure log delivery, you must have IAM permissions for the target logging service and for CloudWatch Logs delivery actions.

## From Command Line

### Enable Standard Logging Using CloudWatch API

1. Create a delivery source for the CloudFront Distribution logs:

```sh
aws logs put-delivery-source \
    --name {{delivery-name}} \
    --resource-arn {{distribution-arn}} \
    --log-type ACCESS_LOGS
```

2. Configure the delivery destination where the logs should be sent (CloudWatch Logs, Kinesis Data Firehose, or S3):

```sh
aws logs put-delivery-destination \
    --name {{destination-name}} \
    --delivery-destination-configuration {{delivery-destination-arn}}
```

3. Link source and destination to bind your CloudFront distribution to the target destination:

```sh
aws logs create-delivery \
    --delivery-source-name {{delivery-name}} \
    --delivery-destination-arn {{delivery-destination-arn}}
```

## Using CloudFormation

- CloudFormation template (YAML):

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Enable CloudFront standard logging via CloudFormation

Parameters:
  CloudFrontDistributionArn:
    Type: String
    Description: ARN of the existing CloudFront distribution

  LogDeliveryDestinationArn:
    Type: String
    Description: ARN of the log destination resource (e.g., CloudWatch Logs group, Firehose stream, or S3 bucket)

  DistributionId:
    Type: String
    Description: The ID of the CloudFront distribution (for naming purposes)

Resources:
  LogDeliverySource:
    Type: AWS::Logs::DeliverySource
    Properties:
      Name: !Sub "cf-access-logs-source-${DistributionId}"
      ResourceArn: !Ref CloudFrontDistributionArn
      LogType: ACCESS_LOGS

  LogDeliveryDestination:
    Type: AWS::Logs::DeliveryDestination
    Properties:
      Name: !Sub "cf-access-logs-dest-${DistributionId}"
      DestinationResourceArn: !Ref LogDeliveryDestinationArn

  LogDelivery:
    Type: AWS::Logs::Delivery
    Properties:
      DeliverySourceName: !Ref LogDeliverySource
      DeliveryDestinationArn: !Ref LogDeliveryDestination
```
