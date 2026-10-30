# Description

This policy identifies Premium Azure Service Bus namespaces older than the initial
30-day deployment window that contain no current queues or topics.

## Rationale

Premium namespaces reserve dedicated messaging capacity and incur capacity charges
even when they contain no messaging entities. An empty namespace cannot carry
messages through a queue or topic, so its reserved capacity is a strong indicator
of avoidable spend.

## Impact

An empty namespace may retain network, identity, authorization, disaster-recovery,
or imminent deployment dependencies. Confirm ownership and architecture before
deleting it or moving workloads.

## Audit

This policy flags an *Azure Service Bus Namespace* as `INCOMPLIANT` if it is in
the `Succeeded` provisioning state, uses the `Premium` SKU tier, was created more
than 30 days ago, and has no non-disappeared related *Azure Service Bus Queue* or
*Azure Service Bus Topic* records.
