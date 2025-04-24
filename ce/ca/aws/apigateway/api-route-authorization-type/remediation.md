# Remediation

Configure an appropriate `Authorization Type` for each route in AWS API Gateway. Select the authorization mechanism based on your security requirements - for example, **IAM**, **JWT**, or **Lambda** authorizers for HTTP APIs, and **IAM** or **Lambda** authorizers for WebSocket APIs.

## From AWS CLI

1. To update an API Route to use IAM authorization, run the following command:

    ```sh
    aws apigatewayv2 update-route \
    --api-id {{api-id}} \
    --route-id {{route-id}} \
    --authorization-type AWS_IAM
    ```

    Replace `{{api-id}}` with the ID of your API Gateway API and `{{route-id}}` with the ID of the Route you are updating.

    When IAM authorization is enabled, clients must use *Signature Version 4 (SigV4)* to sign their requests with AWS credentials. API Gateway invokes your API route only if the client has `execute-api` permission for the route.

2. To configure a Lambda or JWT authorizer, use the `create-authorizer` command:

    ```sh
        aws apigatewayv2 create-authorizer \
        --api-id {{api-id}} \
        --authorizer-type {{REQUEST/JWT}} \
        --identity-source '$request.header.Authorization' \
        --name {{authorizer-name}} \
        [--authorizer-uri {{lambda-uri}}] \
        [--authorizer-payload-format-version {{format-version}}] \
        [--jwt-configuration Audience={{audience}},Issuer={{issuer}}] 
    ```

    - For Lambda authorizer:

        Specify the `--authorizer-uri` to point to the Lambda function ARN, and use `--authorizer-payload-format-version` to define the payload version (e.g., **1.0** or **2.0**).

    - For JWT authorizer:
        
        Use the `--jwt-configuration` to specify the `Audience` and `Issuer` that correspond to your identity provider.

    You must grant API Gateway permission to invoke the Lambda authorizer. This can be done by updating the Lambda function's resource policy using the `add-permission` command. If this permission is not configured, API Gateway will return a `500 Internal Server Error` when invoking the function.

    ```sh
        aws lambda add-permission \
        --function-name {{authorizer-function}} \
        --statement-id {{statement-id}} \ 
        --action lambda:InvokeFunction \
        --principal apigateway.amazonaws.com \
        --source-arn {{source-arn}}
    ```

    Once the authorizer is created, associate it with a specific route using the `update-route` command:

    ```sh
        aws apigatewayv2 update-route \
        --api-id {{api-id}} \
        --route-id {{route-id}} \
        --authorization-type {{CUSTOM/JWT}} \
        --authorizer-id {{authorizer-id}}
    ```
