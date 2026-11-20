export const CATEGORIES = [
  {
    slug: "property-title",
    name: "Property Title Investigation",
    description: "Claims invited before a property is bought, mortgaged or transferred.",
  },
  {
    slug: "lost-documents",
    name: "Lost Documents",
    description: "Loss of title deeds, share certificates, allotment letters and more.",
  },
  {
    slug: "court-dispute",
    name: "Court & Dispute Notices",
    description: "Summons by publication, proclamations and court-ordered notices.",
  },
  {
    slug: "corporate-filings",
    name: "Corporate Filings",
    description: "Company and LLP notices required under the Companies Act.",
  },
  {
    slug: "change-of-name",
    name: "Change of Name",
    description: "Declarations of a change of name by individuals.",
  },
  {
    slug: "bank-auctions",
    name: "Bank Auctions & SARFAESI",
    description: "Possession, sale and e-auction notices by secured creditors.",
  },
  {
    slug: "insolvency",
    name: "Insolvency & Liquidation",
    description: "Public announcements and claims invitations under the IBC.",
  },
  {
    slug: "succession-probate",
    name: "Succession & Probate",
    description: "Probate, letters of administration and succession certificates.",
  },
  {
    slug: "power-of-attorney",
    name: "Power of Attorney",
    description: "Execution and revocation of powers of attorney.",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const PUBLISHER_TYPES = {
  advocate: "Advocate",
  individual: "Individual",
  company: "Company / LLP",
  institution: "Bank / Institution",
} as const;

export type PublisherType = keyof typeof PUBLISHER_TYPES;

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export type Notice = {
  id: string;
  category: CategorySlug;
  title: string;
  summary: string;
  body: string[];
  schedule?: { label: string; value: string }[];
  city: string;
  state: string;
  /** Date of publication, YYYY-MM-DD (India time) */
  publishedAt: string;
  /** Days allowed for objections or claims, counted from publication */
  objectionDays?: number;
  publisher: {
    name: string;
    type: PublisherType;
    detail: string;
    address: string;
  };
  verification: string;
};

export const NOTICES: Notice[] = [
  {
    id: "LNB-2026-004812",
    category: "property-title",
    title: "Title investigation — Flat No. 702, Tower B, Varthur, Bengaluru",
    summary:
      "My client proposes to purchase the flat described below. Claims of any kind are invited within 14 days.",
    body: [
      "NOTICE is hereby given that my client intends to purchase the property more fully described in the Schedule below from its present owner, Mr. Rajesh Venkataraman, son of Late Shri K. Venkataraman, who has represented that the said property is free from all encumbrances.",
      "Any person having any claim, right, title or interest in the said property, by way of sale, mortgage, lease, lien, charge, gift, inheritance, maintenance, possession or otherwise, is hereby required to make the same known in writing, together with documentary proof, to the undersigned within 14 days from the date of publication of this notice.",
      "If no claim is received within the said period, it shall be presumed that there are no such claims, or that the same have been waived, and my client shall proceed to complete the transaction.",
    ],
    schedule: [
      { label: "Property", value: "Residential Flat No. 702, 7th Floor, Tower B, Lakeview Residency" },
      { label: "Area", value: "1,450 sq. ft. super built-up, with one covered car park" },
      { label: "Location", value: "Sy. No. 112/3, Varthur Hobli, Bengaluru East Taluk" },
    ],
    city: "Bengaluru",
    state: "Karnataka",
    publishedAt: "2026-11-18",
    objectionDays: 14,
    publisher: {
      name: "Adv. Meera Krishnan",
      type: "advocate",
      detail: "Enrolment No. KAR/2194/2009",
      address: "No. 14, 2nd Floor, Residency Road, Bengaluru 560025",
    },
    verification: "Bar Council enrolment verified",
  },
  {
    id: "LNB-2026-004798",
    category: "lost-documents",
    title: "Loss of original sale deed — Plot No. 14, Sector 21, Gurugram",
    summary:
      "Original registered sale deed lost in transit. Finder is requested to return it; any misuse will be at the user's risk.",
    body: [
      "The general public is hereby informed that the original registered Sale Deed No. 8812 dated 03 March 2011, executed in my favour in respect of Plot No. 14, Sector 21, Gurugram, has been lost while travelling between Gurugram and New Delhi on 09 November 2026.",
      "A complaint has been lodged with the police and LR No. 0451/2026 has been issued. Any person finding the said document is requested to return it to the address below. Any person dealing with the said property on the strength of the lost document shall do so at their own risk and cost.",
    ],
    city: "Gurugram",
    state: "Haryana",
    publishedAt: "2026-11-16",
    publisher: {
      name: "Sunil Kumar Yadav",
      type: "individual",
      detail: "Owner of the property",
      address: "House No. 228, Sector 21, Gurugram 122016",
    },
    verification: "Identity verified (Aadhaar e-KYC)",
  },
  {
    id: "LNB-2026-004771",
    category: "court-dispute",
    title: "Summons by publication — Civil Suit No. 1184 of 2026, City Civil Court, Ahmedabad",
    summary:
      "Defendant Mr. Haresh Patel is directed to appear before the court on 15 December 2026, failing which the matter will proceed ex parte.",
    body: [
      "IN THE COURT OF THE CITY CIVIL JUDGE, AHMEDABAD. Civil Suit No. 1184 of 2026. Shree Ambica Traders, Plaintiff, versus Mr. Haresh Dhirajlal Patel, Defendant.",
      "Whereas the above-named Plaintiff has instituted a suit for recovery of money against you, and whereas it has been shown to the satisfaction of the Court that you cannot be served in the ordinary way, you are hereby summoned to appear in this Court in person or through an advocate on 15 December 2026 at 11:00 a.m.",
      "Take notice that in default of your appearance on the day mentioned above, the suit will be heard and determined in your absence.",
    ],
    city: "Ahmedabad",
    state: "Gujarat",
    publishedAt: "2026-11-12",
    publisher: {
      name: "Adv. Nirav Shah",
      type: "advocate",
      detail: "Advocate for the Plaintiff · Enrolment No. G/1022/2012",
      address: "301, Shapath IV, S.G. Highway, Ahmedabad 380015",
    },
    verification: "Bar Council enrolment verified",
  },
  {
    id: "LNB-2026-004760",
    category: "corporate-filings",
    title: "Shifting of registered office from Maharashtra to Karnataka — Kaveri Agritech Private Limited",
    summary:
      "Application to the Regional Director under Section 13 of the Companies Act, 2013. Objections within 14 days.",
    body: [
      "BEFORE THE REGIONAL DIRECTOR, WESTERN REGION, MINISTRY OF CORPORATE AFFAIRS. In the matter of Section 13(4) of the Companies Act, 2013 and Rule 30 of the Companies (Incorporation) Rules, 2014.",
      "Notice is hereby given to the general public that Kaveri Agritech Private Limited (CIN U01100MH2018PTC309911) proposes to make an application to the Regional Director seeking confirmation of the alteration of its Memorandum of Association, as per the special resolution passed at the Extraordinary General Meeting held on 28 October 2026, to enable the company to change its registered office from the State of Maharashtra to the State of Karnataka.",
      "Any person whose interest is likely to be affected by the proposed change may deliver, or cause to be delivered, or send by registered post, their objections supported by an affidavit stating the nature of their interest and grounds of opposition to the Regional Director within 14 days of the date of publication of this notice, with a copy to the company at its registered office.",
    ],
    city: "Pune",
    state: "Maharashtra",
    publishedAt: "2026-11-10",
    objectionDays: 14,
    publisher: {
      name: "Kaveri Agritech Private Limited",
      type: "company",
      detail: "CIN U01100MH2018PTC309911",
      address: "Office 5B, Baner Business Bay, Baner, Pune 411045",
    },
    verification: "Company verified on MCA records",
  },
  {
    id: "LNB-2026-004742",
    category: "change-of-name",
    title: "Change of name — Priya Kumari to Priya Sharma",
    summary: "Declaration of change of name following marriage, for all future purposes.",
    body: [
      "I, Priya Kumari, daughter of Shri Ramesh Prasad, residing at Flat 3C, Kankarbagh Colony, Patna, have changed my name to PRIYA SHARMA upon my marriage to Shri Abhishek Sharma.",
      "All concerned are requested to take note that I shall henceforth be known as Priya Sharma for all purposes.",
    ],
    city: "Patna",
    state: "Bihar",
    publishedAt: "2026-11-08",
    publisher: {
      name: "Priya Sharma",
      type: "individual",
      detail: "Declarant",
      address: "Flat 3C, Kankarbagh Colony, Patna 800020",
    },
    verification: "Identity verified (Aadhaar e-KYC)",
  },
  {
    id: "LNB-2026-004725",
    category: "bank-auctions",
    title: "E-auction sale notice under SARFAESI Act — residential villa, Kakkanad, Kochi",
    summary:
      "Sale of secured asset on 'as is where is' basis. E-auction on 22 December 2026; reserve price ₹1,12,00,000.",
    body: [
      "E-auction sale notice for sale of immovable assets under the Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002, read with Rule 8(6) of the Security Interest (Enforcement) Rules, 2002.",
      "Notice is hereby given to the public in general, and to the borrower and guarantors in particular, that the immovable property described below, mortgaged to the secured creditor, the physical possession of which has been taken by the Authorised Officer, will be sold on 'as is where is', 'as is what is' and 'whatever there is' basis on 22 December 2026.",
      "For detailed terms and conditions of the sale, intending bidders may contact the Authorised Officer at the branch address below.",
    ],
    schedule: [
      { label: "Borrower", value: "M/s. Sea Breeze Interiors and Mr. Thomas Varghese" },
      { label: "Property", value: "Villa No. 9, Green Meadows, Kakkanad, Ernakulam District" },
      { label: "Reserve price", value: "₹1,12,00,000" },
      { label: "Earnest money", value: "₹11,20,000" },
      { label: "E-auction date", value: "22 December 2026, 11:00 a.m. to 1:00 p.m." },
    ],
    city: "Kochi",
    state: "Kerala",
    publishedAt: "2026-11-05",
    objectionDays: 30,
    publisher: {
      name: "Malabar Cooperative Urban Bank Ltd.",
      type: "institution",
      detail: "Authorised Officer, Kakkanad Branch",
      address: "Civil Station Road, Kakkanad, Kochi 682030",
    },
    verification: "Institution verified",
  },
  {
    id: "LNB-2026-004703",
    category: "insolvency",
    title: "Public announcement — corporate insolvency resolution process of Sunrise Textiles Private Limited",
    summary:
      "Creditors are called upon to submit proof of claims to the Interim Resolution Professional by 19 November 2026.",
    body: [
      "Public announcement under Regulation 6 of the Insolvency and Bankruptcy Board of India (Insolvency Resolution Process for Corporate Persons) Regulations, 2016, for the attention of the creditors of Sunrise Textiles Private Limited.",
      "The National Company Law Tribunal, Ahmedabad Bench, has ordered the commencement of a corporate insolvency resolution process against Sunrise Textiles Private Limited on 26 October 2026.",
      "The creditors of the company are hereby called upon to submit their claims with proof on or before 19 November 2026 to the Interim Resolution Professional at the address below. Financial creditors shall submit their claims with proof by electronic means only.",
    ],
    city: "Surat",
    state: "Gujarat",
    publishedAt: "2026-11-05",
    objectionDays: 14,
    publisher: {
      name: "CA Deepa Mehta, Interim Resolution Professional",
      type: "institution",
      detail: "IBBI Reg. No. IBBI/IPA-001/IP-P01882/2020-21",
      address: "8th Floor, Rajhans Platinum, Adajan, Surat 395009",
    },
    verification: "Insolvency professional verified",
  },
  {
    id: "LNB-2026-004688",
    category: "property-title",
    title: "Title investigation — agricultural land, Survey No. 41/2, Hinjewadi, Pune",
    summary:
      "My clients propose to acquire development rights in the land below. Claims are invited within 15 days.",
    body: [
      "Notice is hereby given that my clients are negotiating to acquire the development rights in respect of the land more particularly described in the Schedule below from the owners thereof, namely Mr. Dattatray Ganpat Sakhare and others.",
      "All persons having any claim in respect of the said land, or any part thereof, by way of inheritance, share, sale, mortgage, lease, lien, licence, gift, possession, easement or otherwise, are hereby required to make the same known in writing to the undersigned, with supporting documents, within 15 days from the date hereof, failing which the claims, if any, shall be deemed to have been waived.",
    ],
    schedule: [
      { label: "Land", value: "Survey No. 41, Hissa No. 2, admeasuring 1 Hectare 20 Ares" },
      { label: "Village", value: "Hinjewadi, Taluka Mulshi, District Pune" },
    ],
    city: "Pune",
    state: "Maharashtra",
    publishedAt: "2026-10-29",
    objectionDays: 15,
    publisher: {
      name: "Adv. Rohan Kulkarni",
      type: "advocate",
      detail: "Enrolment No. MAH/4410/2011",
      address: "Office No. 12, Shivaji Nagar, Pune 411005",
    },
    verification: "Bar Council enrolment verified",
  },
  {
    id: "LNB-2026-004650",
    category: "lost-documents",
    title: "Loss of original share certificates — Deccan Polymers Limited, Folio No. DPL004417",
    summary:
      "Application made to the company for issue of duplicate certificates. Objections within 15 days.",
    body: [
      "Notice is hereby given that the share certificates mentioned below, issued by Deccan Polymers Limited, standing in the name of Smt. Lakshmi Narayanan, have been lost or misplaced, and the holder has applied to the company for the issue of duplicate share certificates.",
      "Any person who has a claim in respect of the said shares should lodge such claim with the company at its registered office within 15 days from the date of publication of this notice, after which the company will proceed to issue duplicate share certificates.",
    ],
    schedule: [
      { label: "Folio", value: "DPL004417" },
      { label: "Certificate Nos.", value: "11842 to 11845" },
      { label: "Distinctive Nos.", value: "2104401 to 2104800" },
      { label: "No. of shares", value: "400" },
    ],
    city: "Chennai",
    state: "Tamil Nadu",
    publishedAt: "2026-10-22",
    objectionDays: 15,
    publisher: {
      name: "Lakshmi Narayanan",
      type: "individual",
      detail: "Registered shareholder",
      address: "12, Third Cross Street, Adyar, Chennai 600020",
    },
    verification: "Identity verified (Aadhaar e-KYC)",
  },
  {
    id: "LNB-2026-004611",
    category: "succession-probate",
    title: "Probate petition — estate of Late Smt. Anjali Bose, High Court at Calcutta",
    summary:
      "Citation to all relatives and persons interested in the estate. Objections may be filed before the court within 30 days.",
    body: [
      "IN THE HIGH COURT AT CALCUTTA, ORDINARY ORIGINAL CIVIL JURISDICTION, TESTAMENTARY AND INTESTATE JURISDICTION. In the goods of Smt. Anjali Bose, deceased.",
      "Application has been made by Mr. Arindam Bose, the executor named in the last Will and Testament of the deceased dated 14 February 2019, for grant of probate. All relatives of the deceased and all persons claiming any interest in the estate are hereby cited to show cause, if any, against the grant of probate within 30 days from the date of publication of this notice.",
    ],
    city: "Kolkata",
    state: "West Bengal",
    publishedAt: "2026-10-15",
    objectionDays: 30,
    publisher: {
      name: "Adv. Sourav Mitra",
      type: "advocate",
      detail: "Advocate for the Petitioner · Enrolment No. WB/1389/2006",
      address: "10, Old Post Office Street, Kolkata 700001",
    },
    verification: "Bar Council enrolment verified",
  },
  {
    id: "LNB-2026-004590",
    category: "power-of-attorney",
    title: "Revocation of General Power of Attorney — property at Banjara Hills, Hyderabad",
    summary:
      "The General Power of Attorney executed in favour of Mr. K. Srinivas Rao stands revoked with immediate effect.",
    body: [
      "Notice is hereby given that my client, Mrs. Padmaja Reddy, had executed a General Power of Attorney registered as Document No. 3311 of 2022 at the office of the Sub-Registrar, Banjara Hills, in favour of Mr. K. Srinivas Rao, in respect of House No. 8-2-293, Road No. 12, Banjara Hills, Hyderabad.",
      "My client has revoked the said General Power of Attorney with effect from 06 October 2026. The public is cautioned not to deal with the said attorney in respect of the said property. Any dealing after this date shall not be binding on my client.",
    ],
    city: "Hyderabad",
    state: "Telangana",
    publishedAt: "2026-10-08",
    publisher: {
      name: "Adv. Farhan Ali",
      type: "advocate",
      detail: "Enrolment No. TS/877/2014",
      address: "6-3-1109, Raj Bhavan Road, Somajiguda, Hyderabad 500082",
    },
    verification: "Bar Council enrolment verified",
  },
  {
    id: "LNB-2026-004544",
    category: "corporate-filings",
    title: "Voluntary liquidation — Indus Bright Exports LLP",
    summary:
      "Partners have resolved to wind up the LLP voluntarily. Stakeholders are invited to submit claims to the liquidator.",
    body: [
      "Public announcement under Regulation 14 of the Insolvency and Bankruptcy Board of India (Voluntary Liquidation Process) Regulations, 2017, for the attention of the stakeholders of Indus Bright Exports LLP (LLPIN AAB-4471).",
      "The partners of the LLP have resolved to commence voluntary liquidation on 20 September 2026. Stakeholders are hereby called upon to submit proof of their claims on or before 20 October 2026 to the liquidator at the address below.",
    ],
    city: "Jaipur",
    state: "Rajasthan",
    publishedAt: "2026-09-25",
    objectionDays: 25,
    publisher: {
      name: "Indus Bright Exports LLP",
      type: "company",
      detail: "LLPIN AAB-4471",
      address: "B-17, Malviya Industrial Area, Jaipur 302017",
    },
    verification: "LLP verified on MCA records",
  },
  {
    id: "LNB-2026-004502",
    category: "lost-documents",
    title: "Loss of original allotment letter — DDA flat, Sector 7, Dwarka, New Delhi",
    summary: "Original allotment letter and possession slip lost. Finder may return to the address below.",
    body: [
      "It is hereby notified that the original allotment letter and possession slip issued by the Delhi Development Authority in respect of Flat No. 214, Pocket 3, Sector 7, Dwarka, New Delhi, in the name of Shri Harbans Lal Arora, have been lost.",
      "Any person finding the same is requested to return them to the undersigned. The public is cautioned against dealing with any person on the basis of the said documents.",
    ],
    city: "New Delhi",
    state: "Delhi",
    publishedAt: "2026-09-12",
    publisher: {
      name: "Harbans Lal Arora",
      type: "individual",
      detail: "Allottee",
      address: "Flat No. 214, Pocket 3, Sector 7, Dwarka, New Delhi 110075",
    },
    verification: "Identity verified (Aadhaar e-KYC)",
  },
  {
    id: "LNB-2026-004467",
    category: "court-dispute",
    title: "Proclamation — Execution Petition No. 92 of 2026, Civil Judge (Senior Division), Lucknow",
    summary:
      "Judgment debtor Mr. Vikas Tandon is informed of the execution proceedings listed for 30 November 2026.",
    body: [
      "IN THE COURT OF THE CIVIL JUDGE (SENIOR DIVISION), LUCKNOW. Execution Petition No. 92 of 2026. Gomti Finance Ltd., Decree Holder, versus Mr. Vikas Tandon, Judgment Debtor.",
      "Whereas the Decree Holder has filed the above execution petition for execution of the decree dated 12 January 2026, notice is hereby given to the Judgment Debtor to appear before this Court on 30 November 2026 and show cause why the decree should not be executed against him.",
    ],
    city: "Lucknow",
    state: "Uttar Pradesh",
    publishedAt: "2026-08-28",
    publisher: {
      name: "Adv. Shalini Verma",
      type: "advocate",
      detail: "Advocate for the Decree Holder · Enrolment No. UP/6620/2010",
      address: "Chamber 41, Civil Court Compound, Lucknow 226001",
    },
    verification: "Bar Council enrolment verified",
  },
];

export function getCategory(slug: CategorySlug) {
  return CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0];
}

export function getNotice(id: string): Notice | undefined {
  return NOTICES.find((n) => n.id.toLowerCase() === id.toLowerCase());
}

const DAY_MS = 86_400_000;

/** Publication date as a moment in India time (midnight IST). */
export function publishedDate(n: Pick<Notice, "publishedAt">): Date {
  return new Date(`${n.publishedAt}T00:00:00+05:30`);
}

/** Last day on which objections or claims may be made, or null when none are invited. */
export function objectionDeadline(n: Pick<Notice, "publishedAt" | "objectionDays">): Date | null {
  if (!n.objectionDays) return null;
  return new Date(publishedDate(n).getTime() + n.objectionDays * DAY_MS);
}

export function isObjectionOpen(n: Notice, now: Date = new Date()): boolean {
  const d = objectionDeadline(n);
  return d !== null && d.getTime() + DAY_MS > now.getTime();
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export function formatDate(d: Date): string {
  return dateFormatter.format(d);
}

export const PERIODS = {
  "7d": { label: "Last 7 days", days: 7 },
  "30d": { label: "Last 30 days", days: 30 },
  "90d": { label: "Last 90 days", days: 90 },
} as const;
export type Period = keyof typeof PERIODS;

export const SORTS = {
  newest: "Newest first",
  oldest: "Oldest first",
  deadline: "Objection deadline soonest",
} as const;
export type Sort = keyof typeof SORTS;

export type NoticeFilters = {
  q?: string;
  category?: CategorySlug;
  state?: string;
  publisher?: PublisherType;
  period?: Period;
  sort?: Sort;
};

function haystack(n: Notice): string {
  return [
    n.id,
    n.title,
    n.summary,
    n.city,
    n.state,
    n.publisher.name,
    n.publisher.detail,
    getCategory(n.category).name,
    ...n.body,
    ...(n.schedule ?? []).map((s) => s.value),
  ]
    .join(" ")
    .toLowerCase();
}

export function filterNotices(
  list: Notice[],
  filters: NoticeFilters,
  now: Date = new Date(),
): Notice[] {
  const terms = (filters.q ?? "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  const out = list.filter((n) => {
    if (filters.category && n.category !== filters.category) return false;
    if (filters.state && n.state !== filters.state) return false;
    if (filters.publisher && n.publisher.type !== filters.publisher) return false;
    if (filters.period) {
      const age = now.getTime() - publishedDate(n).getTime();
      if (age > PERIODS[filters.period].days * DAY_MS) return false;
    }
    if (terms.length) {
      const h = haystack(n);
      if (!terms.every((t) => h.includes(t))) return false;
    }
    return true;
  });

  const sort = filters.sort ?? "newest";
  return out.sort((a, b) => {
    if (sort === "oldest") return publishedDate(a).getTime() - publishedDate(b).getTime();
    if (sort === "deadline") {
      const da = isObjectionOpen(a, now) ? objectionDeadline(a)!.getTime() : Infinity;
      const db = isObjectionOpen(b, now) ? objectionDeadline(b)!.getTime() : Infinity;
      if (da !== db) return da - db;
    }
    return publishedDate(b).getTime() - publishedDate(a).getTime();
  });
}

function isCategory(v: unknown): v is CategorySlug {
  return CATEGORIES.some((c) => c.slug === v);
}

/** Parses untrusted URL search params into filters, dropping anything unknown. */
export function parseNoticeFilters(search: Record<string, unknown>): NoticeFilters {
  const out: NoticeFilters = {};
  if (typeof search["q"] === "string" && search["q"].trim()) out.q = search["q"].slice(0, 120);
  if (isCategory(search["category"])) out.category = search["category"];
  const state = search["state"];
  if (typeof state === "string" && (INDIAN_STATES as readonly string[]).includes(state))
    out.state = state;
  const publisher = search["publisher"];
  if (typeof publisher === "string" && publisher in PUBLISHER_TYPES)
    out.publisher = publisher as PublisherType;
  const period = search["period"];
  if (typeof period === "string" && period in PERIODS) out.period = period as Period;
  const sort = search["sort"];
  if (typeof sort === "string" && sort in SORTS && sort !== "newest") out.sort = sort as Sort;
  return out;
}
