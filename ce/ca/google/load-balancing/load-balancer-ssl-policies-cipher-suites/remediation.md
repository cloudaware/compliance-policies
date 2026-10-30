# Remediation

## From Google Cloud Console

If the TargetSSLProxy or TargetHttpsProxy does not have an SSL policy configured, create a new SSL policy. Otherwise, modify the existing insecure policy.

1. Navigate to the `SSL Policies` page by visiting: <https://console.cloud.google.com/net-security/sslpolicies>
2. Click on the name of the insecure policy to go to its `SSL policy details` page.
3. Click `EDIT`.
4. Set `Minimum TLS version` to `TLS 1.2`.
5. Set `Profile` to `Modern` or `Restricted`.
6. If you select the profile `Custom`, make sure that the following features are disabled:

    ```txt
    TLS_RSA_WITH_AES_128_GCM_SHA256
    TLS_RSA_WITH_AES_256_GCM_SHA384
    TLS_RSA_WITH_AES_128_CBC_SHA
    TLS_RSA_WITH_AES_256_CBC_SHA
    TLS_RSA_WITH_3DES_EDE_CBC_SHA
    ```

## From Google Cloud CLI

1. For each insecure SSL policy, update it to use secure ciphers:

    ```sh
    gcloud compute ssl-policies update {{ssl-policy-name}} \
        --profile {{profile}} \
        --min-tls-version {{min-tls-version}} \
        --custom-features {{custom-features}}
    ```

2. If the target proxy has a GCP default SSL policy, use the following command corresponding to the proxy type to update it.

    ```sh
    gcloud compute target-ssl-proxies update {{target-ssl-proxy-name}} \
        --ssl-policy {{ssl-policy-name}}

    gcloud compute target-https-proxies update {{target-https-proxy-name}} \
        --ssl-policy {{ssl-policy-name}}
    ```
