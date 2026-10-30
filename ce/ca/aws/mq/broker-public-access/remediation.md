# Remediation

## Configure Amazon MQ Brokers to Be Private

Amazon MQ brokers that are publicly accessible cannot be modified in place. To disable public access, the broker must be **recreated** with a configuration that restricts network access to private subnets within your VPC.

### **Using AWS CloudFormation**

Use AWS CloudFormation to provision a new Amazon MQ broker with public accessibility disabled.

#### CloudFormation Template (YAML)

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Disable public access for Amazon MQ brokers

Resources:
MQBroker:
    Type: AWS::AmazonMQ::Broker
    Properties:
        BrokerName: {{broker-name}}
        DeploymentMode: ACTIVE_STANDBY_MULTI_AZ
        EngineType: ActiveMQ
        EngineVersion: {{5.15.0}}
        HostInstanceType: {{mq.m5.large}}
        AutoMinorVersionUpgrade: true
        Logs:
            General: true
            Audit: true
        PubliclyAccessible: false
        SecurityGroups:
            - {{sg-id1}}
            - {{sg-id2}}
        SubnetIds:
            - {{subnet-id1}}
            - {{subnet-id2}}
        Users:
            - Username: {{username}}
              Password: {{password}}

```

Ensure that the broker is associated with **private subnet IDs** and appropriate **security groups** as part of your stack configuration.

### **From Command Line**

1. **Retrieve the Existing Broker Configuration.**

    Describe the current Amazon MQ broker to collect the required configuration parameters.

    ```sh
    aws mq describe-broker \
        --region {{region}} \
        --broker-id {{broker-id}}
    ```

    Example output (truncated):

    ```json
    {
    "PubliclyAccessible": true,
    "EngineType": "ActiveMQ",
    "EngineVersion": "5.15.0",
    "HostInstanceType": "mq.m5.large",
    "SubnetIds": [
        "subnet-id1",
        "subnet-id2"
    ],
    "SecurityGroups": [
        "sg-id"
    ],
    "BrokerId": "broker-id",
    "BrokerName": "broker-name"
    }
    ```

2. **Create a New Private Broker.**

    Using the configuration details from the previous step, create a new broker with public access disabled by including the `--no-publicly-accessible` flag.

    ```sh
    aws mq create-broker \
        --region us-east-1 \
        --broker-name cc-internal-production-broker \
        --configuration Id="{{configuration-id}}",Revision=1 \
        --deployment-mode ACTIVE_STANDBY_MULTI_AZ \
        --engine-type ACTIVEMQ \
        --engine-version {{5.15.0}} \
        --host-instance-type {{mq.m5.large}} \
        --security-groups "{{sg-id1}} {{sg-id2}}" \
        --subnet-ids "{{subnet-id1}} {{subnet-id2}}" \
        --users ConsoleAccess=true,Username="{{username}}",Password="{{password}}" \
        --auto-minor-version-upgrade \
        --no-publicly-accessible
    ```

    Ensure the specified subnet IDs are **private subnets** and do not route traffic directly to an Internet Gateway.

3. **Update Application Connectivity.**

    After the new Amazon MQ broker is available:

    - Update your applications to use the new broker endpoints
    - Validate message production and consumption
    - Decommission the original publicly accessible broker once traffic migration is complete
    - Consider using VPN or AWS Direct Connect for secure client connectivity.
