import Layout from '@components/organisms/layout';
import { useRouter } from 'next/router';
import Custom404 from 'pages/404';

export default function NftWhitelistConfirmationPage() {
  const { status } = useRouter().query;

  if (status == 'success') {
    return (
      <Layout>
        <div className="p-5 mx-auto text-center" style={{ maxWidth: '20rem' }}>
          <h1>Success!</h1>
          <p>You joined the Paycer NFT Whitelist.</p>
        </div>
      </Layout>
    );
  }

  if (status == 'alreadyConfirmed') {
    return (
      <Layout>
        <div className="p-5 mx-auto text-center" style={{ maxWidth: '20rem' }}>
          <h1>Already confirmed</h1>
          <p>You already used this link to confirm your spot on the Paycer NFT Whitelist.</p>
        </div>
      </Layout>
    );
  }

  if (status == 'invalidToken') {
    return (
      <Layout>
        <div className="p-5 mx-auto text-center" style={{ maxWidth: '20rem' }}>
          <h1>Invalid confirmation link</h1>
          <p>The link you used is invalid or expired.</p>
        </div>
      </Layout>
    );
  }

  return (<Custom404 />);
}
