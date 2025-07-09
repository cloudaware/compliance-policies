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

2. In the downloaded `{{distribution-config}}.json`, modify the origins (items in the `Origins` array) and set the `OriginProtocolPolicy` key in `CustomOriginConfig` to `https-only`.
3. Apply the updated configuration to your distribution using the saved ETag:

    ```bash
    aws cloudfront update-distribution \
        --id {{distribution-id}} \
        --if-match $ETAG \
        --distribution-config file://{{distribution-config}}.json 
    ```

4. Install an SSL/TLS certificate on your custom origin.

   ### Important

    If the origin server presents an expired, invalid, or self-signed certificate, supplies the certificate chain in an incorrect order, or omits any intermediate certificates, CloudFront will terminate the TCP connection immediately, return HTTP status code 502 (Bad Gateway) to the viewer, set the `X-Cache` header to `Error from cloudfront`.
