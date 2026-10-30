# Description

VPC Service Controls create service perimeters around supported Google Cloud services and projects. Use them for sensitive workloads to restrict access based on approved resources, identities, and networks.

## Rationale

Service perimeters reduce data exfiltration risk by limiting how protected services can be accessed and how data can move across project and network boundaries. They complement IAM by adding contextual controls around supported services.

## Impact

VPC Service Controls can block legitimate traffic if perimeters, ingress rules, egress rules, or access levels are incomplete. Test changes in dry-run mode and validate application, administrative, and third-party access before enforcement.

## Audit

### From Google Cloud CLI

1. Verify that the Access Context Manager API is enabled:

    ```sh
    gcloud services list --enabled \
        --filter="name:accesscontextmanager.googleapis.com" \
        --format="value(name)"
    ```

2. List Access Context Manager policies for the organization:

    ```sh
    gcloud access-context-manager policies list \
        --organization={{organization-id}} \
        --format="table(name,title)"
    ```

3. List service perimeters and confirm that sensitive projects and supported services are protected:

    ```sh
    gcloud access-context-manager perimeters list \
        --policy={{policy-id}} \
        --format="table(name,title,perimeterType,status.resources,status.restrictedServices)"
    ```
