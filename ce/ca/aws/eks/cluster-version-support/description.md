# Description

This policy checks the Kubernetes minor version of an Amazon EKS cluster control plane against the AWS EKS release and support calendar. Support dates are determined by the **Version** field. **Platform Version** identifies the platform family so that legacy Outposts local clusters can be excluded; its revision number does not determine Kubernetes support.

## Rationale

Keeping control planes within standard support provides time for tested upgrades and avoids extended-support charges and eventual automatic upgrades. AWS continues to maintain Kubernetes versions beyond upstream support, so the upstream Kubernetes lifecycle alone does not determine EKS support. Extended support includes security patches and technical support; entering it does not mean the version is unsupported or unpatched.

## Impact

Extended support provides continued AWS support for an additional charge. Reaching the end of standard support is therefore distinct from reaching the final support cutoff. After final support ends, AWS gradually upgrades remaining control planes; a retained CMDB version should be verified against AWS before remediation.

## Audit

This policy marks an *AWS EKS Cluster* as `INCOMPLIANT` if its **Version** is **1.29–1.33**, or **1.34–1.37** on or after the corresponding **End of standard support** date below. These version checks apply to clusters whose **Platform Version** starts with **eks.**, subject to the exclusions below.

The finding distinguishes two support periods:

- **Extended support:** Standard support has ended, but the end-of-extended-support date has not been reached. AWS continues to provide support and security patches; additional charges may apply.
- **Support ended:** Versions **1.29** and **1.30** have already reached final support expiry. Versions **1.31–1.37** receive this finding on or after their **End of extended support** date.

All other assessed versions are `COMPLIANT`, including newer versions without a support cutoff in this calendar.

Clusters are `INAPPLICABLE` if **Status** is **CREATING**, **PENDING**, **FAILED**, or **DELETING**, or if **Platform Version** starts with **eks-local-outposts.**, which identifies legacy Outposts local clusters with a separate release schedule. **UPDATING** clusters remain in scope.

Missing **Status** or **Platform Version**, an unrecognized platform family, or missing **Version** for an assessed platform results in diagnostic `UNDETERMINED`.

| Kubernetes version | End of standard support | End of extended support |
| --- | --- | --- |
| 1.29 | March 23, 2025 | March 23, 2026 |
| 1.30 | July 23, 2025 | July 23, 2026 |
| 1.31 | November 26, 2025 | November 26, 2026 |
| 1.32 | March 23, 2026 | March 23, 2027 |
| 1.33 | July 29, 2026 | July 29, 2027 |
| 1.34 | December 2, 2026 | December 2, 2027 |
| 1.35 | March 27, 2027 | March 27, 2028 |
| 1.36 | August 2, 2027 | August 2, 2028 |
| 1.37 | December 1, 2027 | December 1, 2028 |
