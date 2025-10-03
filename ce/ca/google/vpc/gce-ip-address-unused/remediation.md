# Remediation

Before deleting a reserved IP address, confirm that it is not required for any current or planned services. Coordinate with application owners or the network team to ensure the IP is not reserved for upcoming deployments, temporarily stopped services, or part of a failover configuration.

## Release an Unused Static External IP Address

### **Using gcloud CLI**

```sh
gcloud compute addresses delete {{address-name}} \
    --region {{region}} \
    --project {{project-id}}
```

For global addresses (e.g., used by global load balancers), run:

```sh
gcloud compute addresses delete {{address-name}} \
    --global \
    --project {{project-id}}
```
