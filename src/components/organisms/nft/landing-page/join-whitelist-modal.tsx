import Alert from "@components/atoms/alert"
import GradientButton from "@components/atoms/button/gradient-button"
import Form from "@components/atoms/form"
import Input from "@components/atoms/form/input"
import Modal from "@components/molecules/modal"
import useWallet from "@hooks/use-wallet"
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
  const { address } = useWallet();

  const [status, setStatus] = useState<'success' | 'emailAlreadyUsed' | 'walletAlreadyUsed' | 'error' | undefined>(undefined);

  const onSubmit = useCallback(async ({ email }: FormValues) => {
    const result = await api.joinNftWhitelist(email, address, 'landingPage');
    setStatus(result);
  }, []);

  if (!address) return null;

  return (
    <Modal centered show={props.show} onHide={props.onHide}>
      <>
        <Modal.Header closeButton onHide={props.onHide}>
          <Modal.Title><Trans>Join NFT Whitelist</Trans></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            status === 'success'
              ? <div>
                  <p><Trans>An email has been sent to your address. Click the confirmation link to join the Paycer NFT whitelist.</Trans></p>
                  <div className="mt-4" onClick={props.onHide}>
                    <GradientButton className="w-100">
                      <Trans>Close</Trans>
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
                      <p><Trans>Enter your email address below to reserve your Paycer NFT.</Trans></p>
                      <Input label={t`Email address`} name="email" />
                      { status == 'emailAlreadyUsed' && <Alert className="mt-4" variant="danger"><Trans>This email is already on the whitelist.</Trans></Alert> }
                      { status == 'walletAlreadyUsed' && <Alert className="mt-4" variant="danger"><Trans>This wallet is already on the whitelist.</Trans></Alert> }
                      { status == 'error' && <Alert className="mt-4" variant="danger"><Trans>Something went wrong.</Trans></Alert> }
                      <div className="mt-4" onClick={submitForm}>
                        <GradientButton disabled={isSubmitting} className="w-100">
                          <Trans>Submit</Trans>
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