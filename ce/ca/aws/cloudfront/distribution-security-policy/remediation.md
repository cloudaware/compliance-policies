# Remediation

## Update the Security Policy

### **From Console**

1. Log in to the AWS Management Console.
2. Navigate to the **Amazon CloudFront** console.
3. In the left navigation pane, choose **Distributions**.
4. Select the CloudFront distribution to reconfigure.
5. Open the **General** tab and choose **Edit**.
6. Under **Security policy**, select **TLSv1.2_2025 (recommended)**.
7. Choose **Save changes**.
8. Repeat these steps for each CloudFront distribution, if applicable.

### **From Command Line**

1. Retrieve the current distribution configuration

    ```sh
    aws cloudfront get-distribution-config \
        --id {{distribution-id}} \
        --query 'DistributionConfig'
    ```

2. Identify the non-compliant setting

    In the output, locate the `ViewerCertificate.MinimumProtocolVersion` field.
    For example:

    ```json
    {
    "ViewerCertificate": {
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1",
        "CertificateSource": "acm"
    }
    }
    ```

3. Retrieve the configuration ETag

    ```sh
    aws cloudfront get-distribution-config \
        --id {{distribution-id}} \
        --query 'ETag'
    ```

    Output:

    ```sh
    "{{etag-value}}"
    ```

4. Update the security policy

    Edit the configuration from Step 1 and set the minimum protocol version to `TLSv1.2_2025`, `TLSv1.3_2025`, or `TLSv1.2_2021`.
    Save the modified configuration as `compliant-security-policy.json`.

    ```json
        {
        "ViewerCertificate": {
            "SSLSupportMethod": "sni-only",
            "MinimumProtocolVersion": "TLSv1.2_2025",
            "CertificateSource": "acm"
        }
    }
    ```

    > **Note:** Do not remove other required configuration fields when saving the full document—only update the `MinimumProtocolVersion` value.

5. Apply the updated configuration

    ```sh
    aws cloudfront update-distribution \
        --id {{distribution-id}} \
        --if-match {{etag-value}} \
        --distribution-config file://compliant-security-policy.json \
        --query 'Distribution.Status'
    ```

6. Verify the update

    A successful update returns:

    ```sh
    "InProgress"
    ```
