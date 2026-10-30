# Remediation

## Right-Size Overutilized Instances

Resize the instance to a larger machine type if the workload consistently exceeds the current capacity.

### Using gcloud CLI

1. Stop the instance:

    ```sh
    gcloud compute instances stop {{instance-name}} \
        --zone={{zone}}
    ```

2. Change the machine type:

    ```sh
    gcloud compute instances set-machine-type {{instance-name}} \
        --machine-type={{new-machine-type}} \
        --zone={{zone}}
    ```

3. Start the instance:

    ```sh
    gcloud compute instances start {{instance-name}} \
        --zone={{zone}}
    ```

## Implement Autoscaling

For workloads with variable demand, consider moving the application to a managed instance group and configuring autoscaling policies based on CPU utilization.

### Considerations

- Verify that the selected machine type is available in the instance zone.
- Confirm that the workload and attached resources are compatible with the new machine type.
- Schedule resizing during a maintenance window if the instance serves production traffic.
