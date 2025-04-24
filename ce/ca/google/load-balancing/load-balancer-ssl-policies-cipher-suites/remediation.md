# Remediation

## From Google Cloud Console

If the TargetSSLProxy or TargetHttpsProxy does not have an SSL policy configured, create a new SSL policy. Otherwise, modify the existing insecure policy.

1. Navigate to the `SSL Policies` page by visiting: <https://console.cloud.google.com/net-security/sslpolicies>
2. Click on the name of the insecure policy to go to its `SSL policy details` page.
3. Click `EDIT`.
4. Set `Minimum TLS version` to `TLS 1.2`.
5. Set `Profile` to `Modern` or `Restricted`.
6. Alternatively, if teh user selects the profile `Custom`, make sure that the following features are disabled:

            TLS_RSA_WITH_AES_128_GCM_SHA256
            TLS_RSA_WITH_AES_256_GCM_SHA384
            TLS_RSA_WITH_AES_128_CBC_SHA
            TLS_RSA_WITH_AES_256_CBC_SHA
            TLS_RSA_WITH_3DES_EDE_CBC_SHA

## From Google Cloud CLI

1. For each insecure SSL policy, update it to use secure cyphers:

            gcloud compute ssl-policies update NAME [--profile COMPATIBLE|MODERN|RESTRICTED|CUSTOM] --min-tls-version 1.2 [--custom-features FEATURES]

2. If the target proxy has a GCP default SSL policy, use the following command corresponding to the proxy type to update it.

            gcloud compute target-ssl-proxies update TARGET_SSL_PROXY_NAME --ssl-policy SSL_POLICY_NAME
            gcloud compute target-https-proxies update TARGET_HTTPS_POLICY_NAME --ssl-policy SSL_POLICY_NAME
