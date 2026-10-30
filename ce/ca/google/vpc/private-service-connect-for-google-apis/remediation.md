# Remediation

## From Google Cloud CLI

1. Reserve an internal address for the Private Service Connect endpoint:

    ```sh
    gcloud compute addresses create psc-apis-endpoint \
        --global \
        --purpose=PRIVATE_SERVICE_CONNECT \
        --addresses={{private-ip-address}} \
        --network=projects/{{project-id}}/global/networks/{{vpc-name}}
    ```

2. Create the forwarding rule for Google APIs:

    ```sh
    gcloud compute forwarding-rules create psc-apis \
        --global \
        --network={{vpc-name}} \
        --address=psc-apis-endpoint \
        --target-google-apis-bundle=all-apis
    ```

3. Create or update private DNS zones so `googleapis.com` resolves to the endpoint IP address.
4. Add firewall rules that allow only approved sources to reach the endpoint.
5. Test workload access to required Google APIs before removing existing public egress paths.
