# Remediation

Remove and add route table entries to ensure that only the minimum required subnets or hosts are routable for the intended peering purpose.

## From Command Line

1. For each `{{route_table_id}}` containing routes that are not compliant with your routing policy (that grant more than the desired least access), delete the non-compliant route:

    ```sh
    aws ec2 delete-route --route-table-id {{route_table_id}} --destination-cidr-block {{non_compliant_destination_CIDR}}
    ```

2. Create a new compliant route:

    ```sh
    aws ec2 create-route \
        --route-table-id {{route_table_id}} \
        --destination-cidr-block {{compliant_destination_CIDR}} \
        --vpc-peering-connection-id {{peering_connection_id}}
    ```
