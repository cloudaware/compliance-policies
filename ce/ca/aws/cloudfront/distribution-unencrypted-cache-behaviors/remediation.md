# Remediation

## From Command Line

1. Retrieve the current distribution configuration and capture its `ETag`:

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

2. In the downloaded `{{distribution-config}}.json`, modify the cache behaviors (`DefaultCacheBehavior` and an item in the `CacheBehaviors.Items` array) and set the `ViewerProtocolPolicy` key to either `redirect-to-https` or `https-only`.
3. Apply the updated configuration to your distribution using the saved ETag:

    ```bash
    aws cloudfront update-distribution \
        --id {{distribution-id}} \
        --if-match $ETAG \
        --distribution-config file://{{distribution-config}}.json 
    ```
