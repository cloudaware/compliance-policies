# Remediation

## Enforce TLS Encryption for Client-Broker Communication

Update the MSK cluster security configuration to require TLS encryption for all data in transit between Kafka clients and brokers.

Ensure that all Kafka producers and consumers are configured to use TLS before applying this change. Clients that do not support TLS will lose connectivity once the update is completed.

### **From Command Line**

#### Step 1: Retrieve the Current Cluster Version

Run the following command to obtain the cluster’s current version, which is required to perform an update:

```sh
aws kafka describe-cluster \
  --cluster-arn {{cluster-arn}} \
  --query 'ClusterInfo.CurrentVersion' \
  --output text
```

#### Step 2: Update the Cluster Security Configuration

Execute the following command to enforce TLS encryption for client-to-broker communication. Replace authentication-related values with those appropriate for your environment.

```sh
aws kafka update-security \
    --cluster-arn {{cluster-arn}} \
    --current-version {{current-version}} \
    --encryption-info '{
        "EncryptionInTransit": {
        "ClientBroker": "TLS"
        }
    }' \
    --client-authentication '{
        "Sasl": {
            "Scram": {
                "Enabled": true
            }
        }
    }'
```

#### Consideration

- The `ClientBroker` setting must be set to `TLS` to fully enforce encrypted client connections.
- Modify the `--client-authentication` configuration to align with your authentication requirements (e.g., TLS, SASL/SCRAM, or IAM).
- The update is applied asynchronously; monitor the cluster state to confirm successful completion.
