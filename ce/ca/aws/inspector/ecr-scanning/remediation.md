# Remediation

## Enable Amazon Inspector ECR Scanning

If you are the delegated administrator for an AWS Organization, you can centrally enable Amazon Inspector scan types across multiple accounts and Regions using the AWS CLI and automation scripts. For additional guidance, refer to the *[inspector2-enablement-with-cli](https://github.com/aws-samples/inspector2-enablement-with-cli)* repository on GitHub.

### **From Console**

To activate Amazon Inspector ECR scanning:

1. Open the Amazon Inspector console:
   [https://console.aws.amazon.com/inspector/v2/home](https://console.aws.amazon.com/inspector/v2/home)

2. Using the AWS Region selector in the upper-right corner, select the Region where your ECR repositories are located.

3. In the navigation pane, choose **Account management**.

4. Select the account(s) for which you want to enable a scan type.

5. Choose **Activate**, then select **ECR scanning**.

6. Repeat these steps in each AWS Region that hosts ECR repositories to ensure full coverage.
