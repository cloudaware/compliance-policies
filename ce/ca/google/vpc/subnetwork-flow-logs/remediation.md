# Remediation

## From Google Cloud Console

1. Go to the VPC network GCP Console visiting <https://console.cloud.google.com/networking/networks/list>
2. Click the name of a subnet, The `Subnet details` page displays.
3. Click the `EDIT` button.
4. Set `Flow Logs` to `On`.
5. Expand the `Configure Logs` section.
6. Set `Aggregation Interval` to `5 SEC`.
7. Check the box beside `Include metadata`.
8. Set `Sample rate` to `100`.
9. Click `Save`.

### Note

It is not possible to configure a Log filter from the console.

## From Google Cloud CLI

To enable VPC Flow Logs for a network subnet, run the following command:

    gcloud compute networks subnets update [SUBNET_NAME] --region [REGION] --enable-flow-logs --logging-aggregation-interval=interval-5-sec --logging-flow-sampling=1 --logging-metadata=include-all
