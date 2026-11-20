# Remediation

For each existing NSG flow log still in use, enable logging and traffic analytics to the approved central Log Analytics workspace. Verify that records arrive and retain them for the required period. New NSG flow logs cannot be created after June 30, 2025.

For migrated workloads, verify replacement virtual network flow-log coverage and analytics before deleting confirmed disabled legacy leftovers. Do not re-enable migration leftovers. If no NSG flow logs remain, use the virtual network flow-log capture and retention assessments. Preserve migration records and a rollback plan before changing logging.
