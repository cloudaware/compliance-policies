# Remediation

## Create an RDS Event Subscription

Configure Amazon RDS event subscriptions to receive notifications for **maintenance** and **failure** events for DB clusters.

### **From Console**

1. Sign in to the AWS Management Console.

2. Navigate to the **Amazon RDS** console.

3. In the navigation pane, under **Amazon RDS**, select **Event subscriptions**.

4. Choose **Create event subscription**.

5. On the **Create event subscription** page, configure the following settings:

    - Enter a unique name in the **Name** field.

   **Target Section**

    - For **Send notifications to**, choose one of the following:

        - Create a new Amazon SNS topic. Provide a unique **Topic name** and specify the email address(es) to receive notifications.
        - Select an existing Amazon SNS topic by choosing its ARN from the list.

    **Source Section**

    - Set **Source type** to **Clusters**.
    - For **Clusters to include**, select **All clusters**.
    - For **Event categories to include**, select **Select specific event categories** and choose **maintenance** and **failure**.

6. Choose **Create** to create the event subscription.

7. Repeat steps 4-6 to create event subscriptions for other Amazon RDS resources in the current AWS Region, if applicable.

8. Switch to other AWS Regions from the console and repeat this remediation process as required.

### **From Command Line**

1. Create an Amazon SNS topic to receive RDS event notifications:

    ```sh
    aws sns create-topic \
        --name {{rds-event-notifications}}
    ```

2. Note the Amazon Resource Name (ARN) returned in the output:

    ```json
    {
        "TopicArn": "{{topic-arn}}"
    }
    ```

3. Subscribe an email endpoint to the SNS topic:

    ```sh
    aws sns subscribe \
        --topic-arn {{topic-arn}} \
        --protocol email \
        --notification-endpoint my@email.com
    ```

4. Confirm the email subscription using the token sent to the specified email address:

    ```sh
    aws sns confirm-subscription \
        --topic-arn {{topic-arn}} \
        --token {{confirmation-token}}
    ```

5. Create an Amazon RDS event subscription for DB cluster **maintenance** and **failure** events:

    ```sh
    aws rds create-event-subscription \
        --region {{us-east-1}} \
        --subscription-name {{subscription-name}} \
        --sns-topic-arn {{topic-arn}} \
        --source-type db-cluster \
        --event-categories maintenance failure \
        --source-ids {{db-cluster-id}} \
        --enabled
    ```

6. Verify that the event subscription is successfully created by reviewing the command output:

    ```json
    {
        "EventSubscription": {
            "Status": "creating",
            "SourceType": "db-cluster",
            "EventCategoriesList": [
            "maintenance",
            "failure"
            ],
            "Enabled": true
        }
    }
    ```

7. Repeat steps 1–6 for additional RDS DB clusters in the same AWS Region, if required.

8. Update the `--region` parameter and repeat the remediation steps for other AWS Regions.
