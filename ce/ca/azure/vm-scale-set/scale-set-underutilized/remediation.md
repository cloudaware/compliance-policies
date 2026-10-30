# Remediation

## Review Before Rightsizing

Confirm 30-day and peak-period demand, autoscale rules, instance health, zone distribution, scheduled jobs, upgrade constraints, and the target capacity. Define a rollback plan before changing a production Scale Set.

## Adjust Scale Set Capacity

### Azure portal

1. Open **Virtual machine scale sets** and select the Scale Set.
2. Select **Scaling**.
3. For autoscale, adjust the minimum, maximum, default capacity, and scale-in rules. For fixed capacity, reduce the instance count gradually.
4. Verify application health, availability, and scaling behavior after each change.

### Azure CLI

For a fixed-capacity Scale Set, set the desired instance count:

```sh
az vmss scale \
    --resource-group "{{resource-group-name}}" \
    --name "{{scale-set-name}}" \
    --new-capacity "{{instance-count}}"
```

## Right-Size the VM SKU

If instance count is appropriate but capacity remains underused, evaluate a smaller compatible VM SKU in a non-production environment first. Apply the model change through a controlled rollout and confirm that the upgrade policy, image, extensions, disks, and networking remain compatible.

## Considerations

- Do not reduce autoscale minimum capacity below the availability requirement.
- Review peak, batch, and seasonal demand; the policy’s 30-day metrics may not represent every workload cycle.
- Monitor workload health and capacity after each change, and restore the prior capacity if service-level objectives are affected.
