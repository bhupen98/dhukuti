import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6">Dhukuti – Terms and Conditions</h1>
      <p className="text-gray-500 mb-4">
        Effective Date: <b>[Add Date]</b>
      </p>

      <section className="mb-6">
        <h2 className="font-bold mb-2">1. Platform Purpose</h2>
        <p>
          Dhukuti is an online tool for organizing and managing group money-saving circles (“dhukuti” or “rotating savings groups”). The App helps members track, schedule, and record contributions but <b>does not hold, transfer, or guarantee any funds</b>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold mb-2">2. User Responsibilities</h2>
        <ul className="list-disc ml-6">
          <li>You are responsible for all activities and information provided under your account.</li>
          <li>You agree to only join or create groups with people you trust.</li>
          <li>You are solely responsible for any financial transactions that occur outside the App, including sending and receiving payments.</li>
          <li>The App does not mediate, arbitrate, or resolve disputes between users or group members.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold mb-2">3. No Financial Intermediary</h2>
        <ul className="list-disc ml-6">
          <li>Dhukuti <b>does not collect, hold, transfer, or process money</b> for users.</li>
          <li>All payments are made directly between users via external methods (bank transfer, cash, PayPal, etc.).</li>
          <li>We do <b>not guarantee</b> the performance, reliability, or trustworthiness of any group or user.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold mb-2">4. Verification and Identity</h2>
        <ul className="list-disc ml-6">
          <li>Dhukuti may verify emails, phone numbers, or basic identity, but <b>does not guarantee the true identity</b> of any user.</li>
          <li>You are responsible for verifying the identity of other group members if needed.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold mb-2">5. Group and Member Conduct</h2>
        <ul className="list-disc ml-6">
          <li>You agree not to use the App for illegal or fraudulent purposes.</li>
          <li>Dhukuti may suspend or terminate accounts involved in suspected abuse or fraud.</li>
          <li>Users can report suspected abuse, but Dhukuti does not guarantee resolution.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold mb-2">6. Disclaimer of Liability</h2>
        <ul className="list-disc ml-6">
          <li><b>Dhukuti is not liable</b> for any loss, damages, or disputes arising from use of the App, including non-payment, fraud, or disagreements between group members.</li>
          <li>Use Dhukuti <b>at your own risk</b>.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold mb-2">7. Data and Privacy</h2>
        <ul className="list-disc ml-6">
          <li>We collect only information necessary to operate the App (see our Privacy Policy).</li>
          <li>You agree to our data collection and usage practices.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold mb-2">8. Changes to Terms</h2>
        <ul className="list-disc ml-6">
          <li>Dhukuti reserves the right to change these Terms at any time. Changes will be posted in the App.</li>
          <li>Continued use of the App means you accept the revised Terms.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold mb-2">9. Termination</h2>
        <ul className="list-disc ml-6">
          <li>Dhukuti may suspend or terminate your account for violations of these Terms or for suspicious activity.</li>
          <li>You may close your account at any time.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold mb-2">10. Contact</h2>
        <p>
          For questions or concerns, contact us at: <b>[Your Support Email]</b>
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-400">
        By signing up, you acknowledge that you have read and agree to these Terms and Conditions.
      </p>

      <div className="mt-10 flex justify-center">
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow hover:bg-blue-700 transition"
        >
          Back to Signup
        </Link>
      </div>
    </main>
  );
}
