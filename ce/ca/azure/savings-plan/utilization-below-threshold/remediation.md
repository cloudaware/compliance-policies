# Remediation

1. In the Azure portal, open **Cost Management + Billing**, select **Savings
   plans**, and open the affected plan.
2. Review **Utilization** for each period below 80% and compare several periods to
   determine whether the shortfall is persistent.
3. Confirm that the plan's benefit scope contains sufficient eligible compute
   usage. Account for seasonal demand, outages, migrations, and overlapping
   Reservations or Savings Plans.
4. Where permitted by current Azure rules, align the benefit scope with accounts,
   subscriptions, or resource groups that have suitable eligible usage.
5. Because an active Savings Plan's hourly commitment cannot be reduced, use the
   observed demand to set a lower hourly commitment or a better scope for future
   purchases.

Validate proposed changes with the workload owner and FinOps team. Do not change
future coverage based on a single low-utilization period.
