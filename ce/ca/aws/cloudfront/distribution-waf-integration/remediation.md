# Remediation

## Associate an AWS WAF Web ACL with the CloudFront Distribution

To protect Amazon CloudFront distributions with AWS WAF, create and configure a web ACL and associate it with the target distribution.

### **From Command Line**

1. **Create or identify an AWS WAF Web ACL**

    Ensure an appropriate web ACL exists with the required rule sets. This may include AWS Managed Rules, marketplace rule groups, or custom rules aligned with your organization’s security policies.

2. **Retrieve the current CloudFront distribution configuration and ETag**

    Download the existing distribution configuration and capture the associated `ETag`, which is required to apply updates:

    ```sh
    aws cloudfront get-distribution-config \
        --id {{distribution-id}} \
        --query 'DistributionConfig' \
        > {{distribution-config}}.json

    ETAG=$(aws cloudfront get-distribution-config \
        --id {{distribution-id}} \
        --query 'ETag' \
        --output text)
    ```

3. **Update the Web ACL association**

    Edit the downloaded `{{distribution-config}}.json` file and set the `WebACLId` attribute:

    - For **AWS WAF (v2)**, specify the **web ACL ARN**, for example:
    `arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/a1b2c3d4-5678-90ab-cdef-EXAMPLE11111`

    - For **AWS WAF Classic**, specify the **web ACL ID**, for example:
    `a1b2c3d4-5678-90ab-cdef-EXAMPLE11111`

4. **Apply the updated CloudFront distribution configuration**

    Use the previously captured `ETag` to update the distribution:

    ```sh
    aws cloudfront update-distribution \
        --id {{distribution-id}} \
        --if-match $ETAG \
        --distribution-config file://{{distribution-config}}.json
    ```
