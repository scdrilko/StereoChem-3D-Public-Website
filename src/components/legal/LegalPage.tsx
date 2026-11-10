type LegalPageId =
| "copyright"
| "disclaimer"
| "terms"
| "privacy"
| "contact";

interface LegalPageProps {
page: LegalPageId;
onNavigate: (section: string) => void;
}

const pageTitles: Record<LegalPageId, string> = {
copyright: "Copyright Notice",
disclaimer: "Disclaimer",
terms: "Terms of Service",
privacy: "Privacy Policy",
contact: "Contact Us",
};

export default function LegalPage({
page,
onNavigate,
}: LegalPageProps) {
const sectionClass = "mb-7";
const headingClass = "mb-3 text-lg font-semibold text-slate-800";
const paragraphClass = "mb-3 leading-7 text-slate-600";

return (
<div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
<button
type="button"
onClick={() => onNavigate("home")}
className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-800"
>
← Back to Home
</button>

<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
<div className="mb-8 border-b border-slate-200 pb-5">
<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
StereoChem 3D
</p>

<h1 className="text-3xl font-bold text-slate-900">
{pageTitles[page]}
</h1>

<p className="mt-3 text-sm text-slate-500">
Effective date: 10 November 2026
</p>
</div>

{page === "copyright" && (
<>
<section className={sectionClass}>
<h2 className={headingClass}>1. Copyright Ownership</h2>
<p className={paragraphClass}>
Unless otherwise stated, the original educational text,
website design, graphics, custom illustrations, molecular
visualizations, and software code developed for StereoChem
3D are protected by applicable copyright and intellectual
property laws.
</p>
<p className={paragraphClass}>
StereoChem 3D is an educational platform intended to support
the understanding of stereochemistry through interactive
learning and three-dimensional molecular visualization.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>2. Permitted Educational Use</h2>
<p className={paragraphClass}>
Users may access and use the website for personal,
non-commercial educational purposes. Brief quotations or
references may be used where permitted by applicable law,
with appropriate acknowledgement where appropriate.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>3. Restrictions</h2>
<p className={paragraphClass}>
Unless permitted by the copyright owner or applicable law,
users must not reproduce, republish, modify, distribute,
sell, or commercially exploit substantial portions of the
website content, software, or visual materials.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>4. Third-Party Materials</h2>
<p className={paragraphClass}>
Third-party names, trademarks, libraries, scientific
resources, and other materials remain the property of
their respective owners and are subject to their own
licences and terms.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>5. Copyright Enquiries</h2>
<p className={paragraphClass}>
For permissions, attribution questions, or copyright
concerns, please contact us at{" "}
<a
                  href="mailto:3dlearnsphere@gmail.com"
                  className="font-medium text-blue-600 hover:underline"
                >
3dlearnsphere@gmail.com
</a>.
</p>
</section>
</>
)}

{page === "disclaimer" && (
<>
<section className={sectionClass}>
<h2 className={headingClass}>1. Educational Purpose</h2>
<p className={paragraphClass}>
StereoChem 3D is provided for educational and informational
purposes. It is designed to help students, teachers, and
other learners explore stereochemistry and related chemical
concepts.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>2. Scientific Accuracy</h2>
<p className={paragraphClass}>
We make reasonable efforts to provide useful and scientifically
accurate explanations, structures, calculations, and
visualizations. However, errors, omissions, or limitations
may occur. Molecular representations and stereochemical
assignments should be independently verified when used for
academic research, publications, examinations, or other
critical purposes.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>3. AI-Generated Content</h2>
<p className={paragraphClass}>
Responses produced by the AI Tutor may be incomplete,
inaccurate, or misleading. AI-generated explanations should
be treated as supplementary learning material and checked
against textbooks, peer-reviewed literature, and other
authoritative scientific sources.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>4. No Professional Advice</h2>
<p className={paragraphClass}>
Website content does not constitute professional,
pharmaceutical, medical, regulatory, or laboratory safety
advice. Users are responsible for applying appropriate
scientific judgement and safety procedures.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>5. External Services</h2>
<p className={paragraphClass}>
Some features may rely on external services or scientific
databases. We do not control the availability, accuracy,
or policies of those third-party services.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>6. Limitation</h2>
<p className={paragraphClass}>
To the extent permitted by applicable law, StereoChem 3D
is provided without a guarantee that every feature will
operate continuously, without interruption, or without
error.
</p>
</section>
</>
)}

{page === "terms" && (
<>
<section className={sectionClass}>
<h2 className={headingClass}>1. Acceptance of Terms</h2>
<p className={paragraphClass}>
By accessing or using StereoChem 3D, you agree to use the
website in accordance with these Terms of Service and
applicable laws. If you do not agree, please discontinue
use of the website.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>2. Appropriate Use</h2>
<p className={paragraphClass}>
You agree not to misuse the website, interfere with its
operation, attempt unauthorized access, introduce malicious
code, or use the platform in a way that violates applicable
laws or the rights of others.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>3. Educational Content</h2>
<p className={paragraphClass}>
The website is intended for learning and educational
exploration. Users should independently verify important
chemical information, stereochemical assignments, and
AI-generated explanations before relying on them.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>4. Intellectual Property</h2>
<p className={paragraphClass}>
Website content and original materials are protected by
applicable intellectual property laws. These terms do not
grant permission to reproduce or commercially distribute
protected materials without authorization.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>5. Availability and Changes</h2>
<p className={paragraphClass}>
Features may be updated, modified, suspended, or withdrawn
as the platform develops. We do not guarantee uninterrupted
availability of the website or any particular feature.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>6. Third-Party Services</h2>
<p className={paragraphClass}>
Certain website features may use external services or
resources. Their use may also be subject to the relevant
third party's terms and policies.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>7. Limitation of Liability</h2>
<p className={paragraphClass}>
To the extent permitted by applicable law, StereoChem 3D
shall not be responsible for losses arising from reliance
on educational content, AI-generated responses, or temporary
service interruptions. Nothing in these terms excludes
liability that cannot lawfully be excluded.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>8. Changes to These Terms</h2>
<p className={paragraphClass}>
These terms may be revised as the website develops. The
updated version and its effective date will be published
on this page.
</p>
</section>
</>
)}

{page === "privacy" && (
<>
<section className={sectionClass}>
<h2 className={headingClass}>1. Introduction</h2>
<p className={paragraphClass}>
This Privacy Policy explains how information may be
processed when you use StereoChem 3D. We aim to limit
information handling to what is reasonably needed to
operate and improve the educational features of the website.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>2. Information You Submit</h2>
<p className={paragraphClass}>
If you use the AI Tutor, the question or text you submit
may be sent from the website server to the Google Gemini
service to generate a response, where that service is
configured. The information is then subject to the
applicable service provider terms and privacy practices.
</p>
<p className={paragraphClass}>
If you use molecular lookup or structure-retrieval features,
a chemical name, identifier, or structure query may be sent
to PubChem to retrieve relevant chemical information.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>3. Hosting and Technical Information</h2>
<p className={paragraphClass}>
The website is hosted using a third-party hosting provider.
Like other websites, the hosting infrastructure may process
technical information such as request details, IP addresses,
browser information, and server logs for security,
troubleshooting, and service operation. Such processing
is subject to the hosting provider's applicable policies.
</p>
</section>


<section className={sectionClass}>
<h2 className={headingClass}>4. Cookies and Analytics</h2>
<p className={paragraphClass}>
StereoChem 3D does not currently intentionally operate
advertising trackers or a third-party website analytics
programme. Technical storage or processing by the hosting
provider or external services may nevertheless occur as
part of delivering the website.
</p>
<p className={paragraphClass}>
The website uses a simple aggregate visitor counter to
display the total number of counted browser sessions.
It uses browser session storage to help prevent repeated
counting within the same browser tab session. The counter
stores an aggregate total and does not create individual
visitor identity records, such as names or email addresses.
It is not designed to identify unique individuals. Technical
information may still be processed by the hosting and
counter infrastructure as described in this policy.
</p>
</section>


<section className={sectionClass}>
<h2 className={headingClass}>5. Data Sharing</h2>
<p className={paragraphClass}>
Information submitted to features that rely on external
services may be processed by those service providers.
We do not operate a user account or public user-profile
system as part of the current learning website.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>6. Data Security and Retention</h2>
<p className={paragraphClass}>
We take reasonable steps within our control to operate the
website responsibly. However, no internet transmission or
electronic storage system can be guaranteed to be completely
secure. Retention of technical logs or information processed
by external providers is governed by their respective
practices and policies.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>7. External Websites and Services</h2>
<p className={paragraphClass}>
Links and integrations may direct you to third-party
websites or services, including Google Gemini, PubChem,
and the website hosting provider. Their privacy policies
apply to their own services and processing.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>8. Policy Updates</h2>
<p className={paragraphClass}>
This policy may be updated when website features or data
practices change. The latest effective date will be shown
at the top of this page.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>9. Contact</h2>
<p className={paragraphClass}>
For privacy-related questions, contact{" "}
<a
                  href="mailto:3dlearnsphere@gmail.com"
                  className="font-medium text-blue-600 hover:underline"
                >
3dlearnsphere@gmail.com
</a>.
</p>
</section>
</>
)}

{page === "contact" && (
<>
<section className={sectionClass}>
<h2 className={headingClass}>Get in Touch</h2>
<p className={paragraphClass}>
We welcome feedback, suggestions, corrections, and
enquiries related to StereoChem 3D and its educational
resources.
</p>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>Email</h2>
<p className={paragraphClass}>
For general enquiries, technical feedback, content
corrections, or copyright and privacy questions, write to:
</p>
<a
                href="mailto:3dlearnsphere@gmail.com"
                className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
              >
3dlearnsphere@gmail.com
</a>
</section>

<section className={sectionClass}>
<h2 className={headingClass}>About StereoChem 3D</h2>
<p className={paragraphClass}>
StereoChem 3D is a 3S-Powered Stereochemistry Learning
Platform designed to make stereochemistry more accessible
through interactive three-dimensional molecular
visualization and guided learning resources.
</p>
</section>
</>
)}

<div className="mt-8 border-t border-slate-200 pt-5">
<button
type="button"
onClick={() => onNavigate("home")}
className="text-sm font-medium text-blue-600 hover:text-blue-800"
>
← Return to StereoChem 3D
</button>
</div>
</div>
</div>
);
}