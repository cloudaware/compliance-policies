# Remediation

## From Azure Portal

1. Navigate to `Network Watcher`.
2. Under `Logs`, select `Flow logs`.
3. Click `Add filter`.
4. From the `Filter` drop-down menu, select `Flow log type`.
5. From the `Value` drop-down menu, check `Virtual network` only.
6. Click `Apply`.
7. Click the name of a virtual network flow log.
8. Under `Storage Account`, set `Retention days` to `0`, `90`, or a number greater than 90. If `Retention days` is set to `0`, the logs are retained indefinitely with no retention policy.
9. Repeat steps 7 and 8 for each virtual network flow log requiring remediation.

## From Azure CLI

Run the following command update the retention policy for a flow log in a network watcher, setting `retention` to `0`, `90`, or a number greater than 90:

```sh
az network watcher flow-log update --location <location> --name <flow-log> --retention <number-of-days>
```

Repeat for each virtual network flow log requiring remediation.
