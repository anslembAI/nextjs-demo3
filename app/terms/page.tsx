export default function TermsPage() {
    return (
        <div className="container px-4 md:px-6 py-12 pt-28 max-w-4xl mx-auto prose dark:prose-invert">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold mt-4">1. Agreement to Terms</h2>
            <p>
                These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and LuxeTravel (“we,” “us” or “our”), concerning your access to and use of our website.
            </p>

            <h2 className="text-xl font-semibold mt-4">2. User Representations</h2>
            <p>
                By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
                <li>You are not a minor in the jurisdiction in which you reside.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">3. Prohibited Activities</h2>
            <p>
                You may not access or use the Site for any purpose other than that for which we make the Site available.
                The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>

            <h2 className="text-xl font-semibold mt-4">4. Modifications and Interruptions</h2>
            <p>
                We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice.
            </p>

            <h2 className="text-xl font-semibold mt-4">5. Contact Us</h2>
            <p>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: terms@luxetravel.com
            </p>
        </div>
    )
}
