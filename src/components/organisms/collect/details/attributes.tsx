import Card from "@components/molecules/card";
import Nft from "@hooks/nft/nft";
import { Trans } from "@lingui/macro";

export interface AttributesProps {
    attributes: Nft['attributes'];
}

const Attributes = ({ attributes }: AttributesProps) => {
    return (
        <div>
            <h2 className="display-5"><Trans>Attributes</Trans></h2>
            <div className="row">
                {
                    attributes.map((attribute) => (
                        <div className="col-6">
                            <Card className="p-4">
                                <h5 className="header-pretitle text-center">
                                    {attribute.traitType}
                                </h5>
                                <span className="text-center text-capitalize">
                                    {attribute.value.toString()}
                                </span>
                            </Card>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Attributes;