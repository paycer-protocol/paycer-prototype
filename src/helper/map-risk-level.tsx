import {t} from "@lingui/macro";

export default (riskLevel: number) => {
    switch (riskLevel) {
        case 0:
            return t`Low`
        case 1:
            return t`Medium`
        case 2:
            return t`High`
    }
}