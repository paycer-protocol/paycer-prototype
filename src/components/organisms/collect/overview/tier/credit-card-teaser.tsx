import Button from "@components/atoms/button";
import Card from "@components/molecules/card";
import { Trans } from "@lingui/macro";

const CreditCardTeaser = () => {
    return (
        <Card>
            <Card.Body>
                <h2 className="display-4"><Trans>Collect your Paycer Partner Credit Card</Trans></h2>
                <Button><Trans>Learn more</Trans></Button>
            </Card.Body>
        </Card>
    );
};

export default CreditCardTeaser;