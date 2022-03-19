import useWallet from "@hooks/use-wallet";
import TierTile from "./tier-tile";

const TierList = () => {
    const wallet = useWallet();

    console.log(wallet);

    return (
        <div className="row">
            <div className="col-xl-4"><TierTile tier="basic" /></div>
            <div className="col-xl-4"><TierTile tier="associate" /></div>
            <div className="col-xl-4"><TierTile tier="senior" /></div>
            <div className="col-xl-4"><TierTile tier="manager" /></div>
            <div className="col-xl-4"><TierTile tier="partner" /></div>
        </div>
    );
};

export default TierList;