# Remediation

## Steps

1. **Write the rotation function code.**
2. **Create a Lambda function using that code.**
3. **Set up appropriate network access and permissions.**
4. **Configure the secret for rotation.**

### Prerequisite (Database Secrets Only): Choose a Rotation Strategy

AWS Secrets Manager supports two rotation strategies:

- **Option 1: Single User Strategy**

  - Use a single user for rotation. You can proceed directly to **Step 1**.

- **Option 2: Alternating Users Strategy**

  - Create a separate secret containing **superuser credentials**.
  - Add the ARN of the superuser secret to the original secret’s JSON structure.
  - Note: *Amazon RDS Proxy does not support the alternating users strategy.*

For more information, see *[Lambda Function Rotation Strategies](https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotation-strategy.html)*.

## Step 1: Write the Rotation Function Code

A **rotation function** is an AWS Lambda function that Secrets Manager invokes to rotate your secret.

AWS provides pre-built templates for **Amazon RDS**, **Amazon Aurora**, **Amazon Redshift**, and **Amazon DocumentDB** in *[Rotation function templates](https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_available-rotation-templates.html)*.

To create your function:

1. Review the available templates.

   - If a suitable one exists, copy and customize the code.
   - Otherwise, write your own rotation function. See *[Lambda Rotation Functions](https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda-functions.html)* for guidance.
2. Package your function and dependencies into a ZIP file, for example:

   ```sh
   zip {{my-function}}.zip {{my_function}}.py
   ```

## Step 2: Create the Lambda Function

1. **Create a Trust Policy** for the Lambda execution role.
   The policy must allow the following:

   - Secrets Manager operations on the secret.
   - Access to the service or database being rotated (for example, password updates).

2. **Create the Lambda execution role and apply the trust policy:**

   ```sh
   aws iam create-role \
       --role-name {{rotation-lambda-role}} \
       --assume-role-policy-document file://{{trust-policy}}.json
   ```

3. **Create the Lambda Function using your ZIP file:**

   ```sh
   aws lambda create-function \
       --function-name {{rotation-function}} \
       --runtime python3.7 \
       --zip-file fileb://{{my-function}}.zip \
       --handler .{{handler}} \
       --role {{rotation-lambda-role-arn}}
   ```

4. **Allow Secrets Manager to Invoke the Lambda Function:**

   ```sh
   aws lambda add-permission \
       --function-name {{rotation-function}} \
       --action lambda:InvokeFunction \
       --statement-id SecretsManager \
       --principal secretsmanager.amazonaws.com \
       --source-account {{123456789012}}
   ```

## Step 3: Set Up Network Access

Ensure the Lambda function has network access to both **AWS Secrets Manager** and your **database or service**.

For more details, see *[Network Access for Lambda Rotation Functions](https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotation-function-network-access.html)*.

## Step 4: Configure the Secret for Rotation

Finally, enable automatic rotation by calling the `rotate-secret` command.

```sh
aws secretsmanager rotate-secret \
    --secret-id MySecret \
    --rotation-lambda-arn {{rotation-function-arn}} \
    --rotation-rules '{"ScheduleExpression": "cron(0 16 1,15 * ? *)", "Duration": "2h"}'
```

You can define a rotation schedule using a **cron()** or **rate()** expression and specify a rotation window duration.
