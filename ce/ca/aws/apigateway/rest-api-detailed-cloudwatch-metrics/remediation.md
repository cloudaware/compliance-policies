# Remediation

## Enable Detailed CloudWatch Metrics

### **From Console**

1. Log in to the AWS Console.
2. Navigate to the **API Gateway** service.
3. In the navigation panel, select **APIs** to view all API Gateway APIs.
4. Click the API you want to reconfigure.
5. Select **Stages** from the API menu to access its stages.
6. Click the stage you want to modify and open the **Logs/Tracing** tab.
7. In the **CloudWatch Settings** section, enable **Detailed CloudWatch Metrics** and click **Save Changes**. Once enabled, each API method will start generating metrics such as API calls, Latency, Integration Latency, 4XX, and 5XX errors.
8. Repeat steps 6–7 for all stages of the selected API.
9. Repeat steps 4–8 for each API in the current AWS region.
10. Switch regions from the navigation bar and repeat the process for other regions.

### **From Command Line**

1. Use the `update-stage` command to enable detailed CloudWatch metrics for a specific API stage. Each method in the stage will start generating metrics such as API calls, Latency, Integration Latency, 4XX, and 5XX errors:

    ```sh
    aws apigateway update-stage \
        --region {{us-east-1}} \
        --rest-api-id {{rest-api-id}} \
        --stage-name {{stage-name}} \
        --patch-operations op=replace,path=/*/*/metrics/enabled,value=true
    ```

2. The command output will return metadata for the updated stage:

    ```json
    {
        "stageName": "{{stage-name}}",
        "cacheClusterSize": "0.5",
        "cacheClusterEnabled": false,
        "cacheClusterStatus": "NOT_AVAILABLE",
        "deploymentId": "abc123",
        "createdDate": "2025-01-11T10:56:31+00:00",
        "lastUpdatedDate": "2025-01-11T12:34:58+00:00",
        "methodSettings": {
            "*/*": {
                "cacheTtlInSeconds": 300,
                "loggingLevel": "INFO",
                "dataTraceEnabled": true,
                "metricsEnabled": true,
                "unauthorizedCacheControlHeaderStrategy": "SUCCEED_WITH_RESPONSE_HEADER",
                "throttlingRateLimit": 10000.0,
                "cacheDataEncrypted": false,
                "cachingEnabled": false,
                "throttlingBurstLimit": 5000,
                "requireAuthorizationForCacheControl": true
            }
        }
    }
    ```

3. Repeat steps 1–2 for all stages of the selected API.
4. Repeat steps 1–3 for all APIs in the current AWS region.
