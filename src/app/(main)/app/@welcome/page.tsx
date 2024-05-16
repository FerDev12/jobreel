import { auth } from '@clerk/nextjs/server';
import { Welcome } from '../../_components/welcome';

export default function WelcomePage() {
  auth().protect();

  return <Welcome />;
}
