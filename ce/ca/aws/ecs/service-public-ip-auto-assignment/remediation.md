# Remediation

## Update the ECS Service Network Configuration

### **Using the AWS CLI**

Changing the network configuration triggers a new service deployment.

1. Prepare a `network-config.json` file. Ensure you include the correct subnets and security groups, but set `assignPublicIp` to **DISABLED**.

    ```json
    {
    "awsvpcConfiguration": {
        "subnets": ["subnet-xxxx", "subnet-yyyy"],
        "securityGroups": ["sg-xxxx"],
        "assignPublicIp": "DISABLED"
    }
    }
    ```

2. Run the update command:

    ```sh
    aws ecs update-service \
        --cluster {{cluster-name}} \
        --service {{service-name}} \
        --network-configuration file://network-config.json
    ```
