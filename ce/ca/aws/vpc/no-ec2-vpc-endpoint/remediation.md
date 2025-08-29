# Remediation

## From Command Line

### Create the VPC Endpoint

```sh
aws ec2 create-vpc-endpoint \
    --vpc-id {{vpc-id}} \
    --service-name com.amazonaws.{{region}}.ec2 \
    --subnet-ids {{subnet-id1}} {{subnet-id2}} \
    --security-group-ids {{security-group-id}}
```

## Using CloudFormation

- CloudFormation template (YAML):

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Create EC2 VPC Endpoint

Parameters:
  VpcId:
    Type: String
    Description: The ID of the VPC where the endpoint will be created.
  SubnetIds:
    Type: CommaDelimitedList
    Description: Comma-separated list of subnet IDs for the VPC endpoint.
  SecurityGroupIds:
    Type: CommaDelimitedList
    Description: Comma-separated list of security group IDs to associate with the VPC endpoint.

Resources:
  EC2VpcEndpoint:
    Type: AWS::EC2::VPCEndpoint
    Properties:
      VpcId: !Ref VpcId
      ServiceName: !Sub "com.amazonaws.${AWS::Region}.ec2"
      SubnetIds: !Ref SubnetIds
      SecurityGroupIds: !Ref SecurityGroupIds

Outputs:
  VpcEndpointId:
    Description: The ID of the created VPC endpoint
    Value: !Ref EC2VpcEndpoint
```
