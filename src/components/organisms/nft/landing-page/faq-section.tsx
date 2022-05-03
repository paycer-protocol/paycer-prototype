import PageHeader from "@components/molecules/page-header";
import { Trans } from "@lingui/macro";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";

const AccordionItemBorder = styled.div`
  border: 1px solid #3C506F;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`

export default function FaqSection() {
  return (
    <div className="container">
      <PageHeader.Subtitle><Trans>FAQ</Trans></PageHeader.Subtitle>
      <PageHeader.Title><Trans>We answer your questions</Trans></PageHeader.Title>

      <Accordion className="mt-5">
        <AccordionItemBorder>
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is the total supply?</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
        <AccordionItemBorder>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </AccordionItemBorder>
      </Accordion>
    </div>
  )
}