# Description

Logging on an HTTPS load balancer records network traffic and its destination.

## Rationale

Logging allows you to view HTTPS network traffic to your web applications.

## Impact

On high-use systems with a high sample rate, log files may grow quickly. Ensure the sample rate is set appropriately so that storage costs remain reasonable.

## Audit

### From Google Cloud Console

1. From Google Cloud home, open the Navigation Menu in the top left.
2. Under the `Networking` heading, select `Network services`.
3. Select the HTTPS load balancer you want to audit.
4. Select `Edit`, then `Backend Configuration`.
5. Select `Edit` on the corresponding backend service.
6. Ensure that `Enable Logging` is selected. Also ensure that `Sample Rate` is set to an appropriate level for your needs.

### From Google Cloud CLI

1. Run the following command:

    ```sh
    gcloud compute backend-services describe {{service-name}}
    ```

2. Ensure that `enable-logging` is enabled and `sample rate` is set to your desired level.

## Default Value

By default, logging for HTTPS load balancing is disabled. When logging is enabled, the default sample rate is 1.0 (100%). Ensure this value fits your organization’s needs to avoid high storage costs.

## References

1. <https://cloud.google.com/load-balancing/>
2. <https://cloud.google.com/load-balancing/docs/https/https-logging-monitoring#gcloud:-global-mode>
3. <https://cloud.google.com/sdk/gcloud/reference/compute/backend-services/>
