import moment from "moment";
import {BigNumber} from "@ethersproject/bignumber";

export function formatLastRewardtime(lastRewardTime: BigNumber):string {
    // @ts-ignore
    if (BigNumber.isBigNumber(lastRewardTime)) {
        let momentLastRewardTime = moment(lastRewardTime.toNumber() * 1000)
        return momentLastRewardTime.format('MM/DD/YYYY, h:mm:ss a')
    }
    return ''
}
