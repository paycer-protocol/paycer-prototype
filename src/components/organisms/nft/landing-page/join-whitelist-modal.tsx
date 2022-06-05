import Alert from "@components/atoms/alert"
import GradientButton from "@components/atoms/button/gradient-button"
import Form from "@components/atoms/form"
import Input from "@components/atoms/form/input"
import Modal from "@components/molecules/modal"
import { useDapp } from '@context/dapp-context'
import { t, Trans } from "@lingui/macro"
import api from "api"
import { useCallback, useState } from "react"
import * as Yup from "yup";

interface JoinWhitelistModalProps {
  show: boolean
  onHide: () => void
}

interface FormValues {
  email: string;
}

const schema = Yup.object({
  email: Yup.string().required(t`This field is required`).email(t`Please enter a valid email address`),
});

export default function JoinWhitelistModal(props: JoinWhitelistModalProps) {
  //const { address } = useWallet();

  const [status, setStatus] = useState<'success' | 'noSpotsAvailable' | 'emailAlreadyUsed' | 'error' | undefined>(undefined);

  const onSubmit = useCallback(async ({ email }: FormValues) => {
    const result = await api.joinNftWhitelist(email,'landingPage');
    setStatus(result);
  }, []);

  //if (!address) return null;

  return (
    <Modal centered show={props.show} onHide={props.onHide}>
      <>
        <Modal.Header closeButton onHide={props.onHide}>
          <Modal.Title>{t`Join Waitinglist`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            status === 'success'
              ? <div>
                  <p>{t`An email has been sent to your address. Click the confirmation link.`}</p>
                  <div className="mt-4" onClick={props.onHide}>
                    <GradientButton className="w-100">
                      {t`Close`}
                    </GradientButton>
                  </div>
                </div>
              : <Form
                  initialValues={{ email: '' }}
                  validationSchema={schema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={onSubmit}
                >
                  {({ submitForm, isSubmitting }) => (
                    <div>
                      <p>{t`Enter your email address below to join the waitinglist.`}</p>
                      <Input label={t`Email address`} name="email" />
                      { status == 'noSpotsAvailable' && <Alert className="mt-4" variant="danger">{t`There are no more spots left on the whitelist.`}</Alert> }
                      { status == 'emailAlreadyUsed' && <Alert className="mt-4" variant="danger">{t`This email is already on the whitelist.`}</Alert> }

                      { status == 'error' && <Alert className="mt-4" variant="danger">{t`Something went wrong.`}</Alert> }
                      <div className="mt-4" onClick={submitForm}>
                        <GradientButton disabled={isSubmitting} className="w-100">
                          {t`Submit`}
                        </GradientButton>
                      </div>
                    </div>
                  )}
                </Form>
          }

        </Modal.Body>
      </>
    </Modal>
  )
}
