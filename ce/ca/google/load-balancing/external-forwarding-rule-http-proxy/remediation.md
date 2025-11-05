# Remediation

## Replace the Target HTTP Proxy with a Target HTTPS Proxy

This process involves creating an SSL certificate, configuring a new HTTPS proxy, and updating the forwarding rule to use the secure proxy.

### **From gcloud CLI**

1. **Create an SSL Certificate (if one does not already exist)**

    ```sh
    gcloud compute ssl-certificates create {{certificate-name}} \
        --private-key {{path-to-private-key}} \
        --certificate {{path-to-certificate}} \
    ```

2. **Create a new Target HTTPS Proxy**

    ```sh
    gcloud compute target-https-proxies create {{new-https-proxies-name}} \
        --ssl-certificates {{ssl-certificate}} \
        --url-map {{url-map-name}} \
    ```

3. **Update the Forwarding Rule to use the new Target HTTPS Proxy**

    ```sh
    gcloud compute forwarding-rules set-target {{rule-name}} \
        --target-https-proxy {{new-https-proxy-name}}
    ```

4. **Delete the old Target HTTP Proxy**

    ```sh
    gcloud compute target-http-proxies delete {{old-http-proxy-name}}
    ```
