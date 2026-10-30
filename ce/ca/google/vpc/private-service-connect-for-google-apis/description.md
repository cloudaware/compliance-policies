# Description

Private Service Connect for Google APIs lets workloads access `googleapis.com` services through private endpoints in a VPC. Configure it for VPCs that host sensitive or production workloads that call Google APIs.

## Rationale

Using Private Service Connect keeps API traffic on Google private networking and allows firewall rules to control which workloads can reach Google APIs. This reduces reliance on public internet paths and supports stronger egress control.

## Impact

Private Service Connect endpoints and DNS changes must be planned per VPC. Incorrect DNS or firewall configuration can prevent workloads from reaching Google APIs.

## Audit

### From Google Cloud CLI

1. List VPC networks that host in-scope workloads:

    ```sh
    gcloud compute networks list --format="table(name)"
    ```

2. Confirm that a Private Service Connect address exists for each in-scope VPC:

    ```sh
    gcloud compute addresses list \
        --filter="purpose=PRIVATE_SERVICE_CONNECT" \
        --format="table(name,address,purpose,network)"
    ```

3. Confirm that global forwarding rules target Google APIs:

    ```sh
    gcloud compute forwarding-rules list \
        --global \
        --format="table(name,IPAddress,network,target)"
    ```

4. Confirm that private DNS zones resolve `googleapis.com` records to the Private Service Connect endpoint address.
