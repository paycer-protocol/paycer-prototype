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
            <Accordion.Header>{t`When can I sign up for the whitelisting?`}</Accordion.Header>
            <Accordion.Body>
              {t`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="1">
            <Accordion.Header>{t`When does the pre-sale take place?`}</Accordion.Header>
            <Accordion.Body>
              {t`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="2">
            <Accordion.Header>{t`When does the Public Sale take place?`}</Accordion.Header>
            <Accordion.Body>
              {t`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="3">
            <Accordion.Header>{t`On which blockchain will the NFT be launched?`}</Accordion.Header>
            <Accordion.Body>
              {t`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="4">
            <Accordion.Header>{t`How much will the NFT cost?`}</Accordion.Header>
            <Accordion.Body>
              {t`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="5">
            <Accordion.Header>{t`How many NFTs may be purchased per person?`}</Accordion.Header>
            <Accordion.Body>
              {t`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.`}
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
      </Accordion>
    </div>
  )
}