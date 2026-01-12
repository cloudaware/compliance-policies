# Remediation

## Remove Unused Amazon DynamoDB Tables

To remove unused Amazon DynamoDB tables from your AWS cloud account, perform the following steps.

### **From Console**

1. Sign in to the AWS Management Console.
2. Navigate to the **Amazon DynamoDB** console.
3. In the left navigation pane, under **Dashboard**, choose **Tables**.
4. Select the DynamoDB table you want to remove and choose **Delete** from the top menu.
5. In the **Delete table** confirmation dialog, perform the following actions:

   * (Optional) Choose whether to delete any Amazon CloudWatch alarms associated with the table.
   * Enter `confirm` in the confirmation field.
   * Choose **Delete** to remove the selected table.
6. Repeat Steps 4 and 5 for each unused DynamoDB table in the current AWS Region.
7. If applicable, switch AWS Regions and repeat the remediation process.

### **From Command Line**

Use the `delete-table` command (OSX/Linux/UNIX) to remove an unused Amazon DynamoDB table. After the request is submitted, the table transitions to the `DELETING` state until the removal process is complete.

```sh
aws dynamodb delete-table \
    --region us-east-1 \
    --table-name cc-product-reviews
```
