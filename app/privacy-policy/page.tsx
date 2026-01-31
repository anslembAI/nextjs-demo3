export default function PrivacyPolicyPage() {
    return (
        <div className="container px-4 md:px-6 py-12 pt-28 max-w-4xl mx-auto prose dark:prose-invert">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p>Effective Date: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold mt-4">1. Introduction</h2>
            <p>
                Welcome to LuxeTravel. We value your privacy and are committed to protecting your personal information.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-xl font-semibold mt-4">2. Information We Collect</h2>
            <p>
                We may collect personal information that you voluntarily provide to us when you register on the website,
                express an interest in obtaining information about us or our products and services, when you participate in activities on the website,
                or otherwise when you contact us.
            </p>

            <ul className="list-disc pl-6 mb-4">
                <li>Name and Contact Data</li>
                <li>Payment Data (processed securely by third-party providers)</li>
                <li>Travel Preferences</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">3. Use of Your Information</h2>
            <p>
                We use the information we collect or receive:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>To facilitate account creation and logon process.</li>
                <li>To send you marketing and promotional communications.</li>
                <li>To fulfill and manage your orders.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">4. Contact Us</h2>
            <p>
                If you have questions or comments about this policy, you may email us at privacy@luxetravel.com
            </p>
        </div>
    )
}
