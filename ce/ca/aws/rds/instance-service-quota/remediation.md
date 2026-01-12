# Remediation

## Request a Service Quota Increase

If the number of Amazon RDS instances is approaching or has reached the configured limit, request an increase to the applicable AWS service quota.

### **From AWS Console**

1. Sign in to the AWS Management Console and open the **Service Quotas** console.

2. In the navigation pane, select **AWS services**.

3. Choose **Amazon RDS** from the list.

4. Identify the quota you want to increase. If the quota is adjustable, you may request an increase at one of the following levels, depending on the value shown in the **Adjustability** column:

   * **Account-level** – Request an increase for account-wide quotas (for example, total RDS instances per Region).
   * **Resource-level** – Request an increase for quotas that apply to specific resources, where applicable.

5. Select the quota and choose **Request increase** at the appropriate level.

6. Enter the new quota value. The requested value must be greater than the current quota.

7. Choose **Request** to submit the increase request.

### **Reviewing Request Status**

To track pending or completed quota increase requests:

* Open the service details page in the **Service Quotas** console and navigate to the **Request history** tab, or
* Select **Dashboard** from the navigation pane.

For pending requests, select the request status to view the request receipt. Once the status changes to **Quota requested**, an AWS Support case number is assigned. Select the case number to view the support ticket and track progress.
