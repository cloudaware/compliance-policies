# Remediation

## Migrate the Broker to Active/Standby Deployment Mode

AWS MQ does not allow changing the deployment mode of an existing broker. To remediate a single-instance broker, you must **create a new broker** with the **active/standby deployment mode** and migrate the configuration and users from the original broker.

### **From Command Line**

1. Retrieve the configuration of the existing single-instance broker:

    ```sh
    aws mq describe-broker \
        --broker-id {{broker-id}}
    ```

   The output includes the broker’s settings, such as engine type, version, instance type, subnets, and security groups:

    ```json
    {
        "EngineVersion": "5.15.0",
        "EngineType": "ActiveMQ",
        "DeploymentMode": "SINGLE_INSTANCE",
        "HostInstanceType": "mq.m5.large",

        ---

        "SubnetIds": [
        "subnet-0abcd1234abcd1234",
        "subnet-01234abcd1234abcd"
        ],
        "SecurityGroups": [
        "sg-01234abcd1234abcd"
        ]
    }
    ```

2. Create a new broker with the **active/standby multi-AZ deployment mode** using the retrieved configuration and appropriate parameters:

    ```sh
    aws mq create-broker \
        --broker-name {{broker-name}} \
        --deployment-mode ACTIVE_STANDBY_MULTI_AZ \
        --configuration Id="{{unique-id}}",Revision=1 \
        --engine-type ACTIVEMQ \
        --engine-version {{5.18.0}} \
        --host-instance-type {{mq.m5.large}} \
        --no-publicly-accessible \
        --security-groups "{{sg-id1}}" \
        --subnet-ids "{{subnet-id1}}" "{{subnet-id2}}" \
        --users ConsoleAccess={{true}},Username="{{brokeruser}}",Password="{{brokerpasswd}}" \
        --auto-minor-version-upgrade
    ```

3. Update applications, clients, and event sources to point to the new broker.

4. After you validate that the new broker is fully operational, decommission the original single-instance broker to avoid unnecessary costs.
