import PageHeader from "@components/molecules/page-header";
import {t, Trans} from "@lingui/macro";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";

const AccordionItemBorder = styled.div`
  border: 1px solid #3C506F;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  .accordion-button { font-weight: 600; }
  .accordion-button:not(.collapsed) { background: #16212E; color: #FFF; }
  .accordion-button:after { transform: none!important; position: relative; top: -5px; font-size: 25px; font-weight: 300; color: #FFF; content: '+'; background: none;}
  .accordion-button:not(.collapsed):after { color: #FFF; content: '-'; background: none; }
  .accordion-body { background: #16212E; color: #FFF; }
`

const StyledAccordionHeader = styled(Accordion.Header)`
  &:hover {
    button,button:after { color: #E224A2; }
  }
`

export default function FaqSection() {
  return (
    <div className="container">
      <h5 className="text-uppercase mb-2 text-pink fw-bold">
        {t`FAQ`}
      </h5>
      <div className="h1 mb-4">
        {t`We answer your questions`}
      </div>
      <Accordion className="mt-5">
        <AccordionItemBorder>
          <Accordion.Item eventKey="0">
            <StyledAccordionHeader>{t`When can I sign up for the whitelisting?`}</StyledAccordionHeader>
            <Accordion.Body>
              {t`We will launch specific campaigns to grant our community and early supporters whitelist spots. Stay tuned, we will announce all the details on our social media.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="1">
            <StyledAccordionHeader>{t`When does the pre-sale take place?`}</StyledAccordionHeader>
            <Accordion.Body>
              {t`The pre-sale is for everyone that has a whitelist spot. The minting for these wallets will be before the public sale. A specific date will be announced, please follow our social media for updates.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="2">
            <StyledAccordionHeader>{t`When does the Public Sale take place?`}</StyledAccordionHeader>
            <Accordion.Body>
              {t`The public sale is open for everyone. Depending how many NFTs are sold in the pre-sale, the remaining batch will be up for grabs. Stay tuned, we will announce all the dates on our social media soon.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="3">
            <StyledAccordionHeader>{t`On which blockchain will the NFT be launched?`}</StyledAccordionHeader>
            <Accordion.Body>
              {t`Ethereum.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="4">
            <StyledAccordionHeader>{t`How much will the NFT cost?`}</StyledAccordionHeader>
            <Accordion.Body>
              {t`Please follow our announcement channels and social media. We will publicise a mint price ahead of the sale dates.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="5">
            <StyledAccordionHeader>{t`How many NFTs may be purchased per person?`}</StyledAccordionHeader>
            <Accordion.Body>
              {t`2.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
      </Accordion>
    </div>
  )
}