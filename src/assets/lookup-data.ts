export const roleColor = [
  "bg-red-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-highlight",
];

export const role = ["admin", "praeto", "aktivis", "member"] as const;

export const region = [
  "Kemanggisan",
  "Alam Sutera",
  "Bandung",
  "Malang",
] as const;

export const faculty = [
  "School of Computer Science",
  "Scoll of Information System",
  "School of Design",
  "BINUS Business School Undergraduate Programs",
  "School of Accounting",
  "Faculty of Digital Communication and Hotel & Tourism",
  "Faculty of Humanities",
  "Faculty of Engineering",
  "Double Programs",
  "Master Track Programs",
] as const;

const majors = [
  "Artificial Intellegence",
  "Cyber Security",
  "Game Application and Technology",
  "Computer Science",
  "Data Science",
  "Business Analytics",
  "Information Systems Accounting and Auditing",
  "Information Systems",
  "Interior Design",
  "Visual Communication Design - Animation",
  "Visual Communication Design - Creative Advertising",
  "Visual Communication Design - New Media",
  "Film",
  "Fashion",
  "Visual Communication Design",
  "Business Creation",
  "Global Business Marketing",
  "International Business Management",
  "Management",
  "Creativepreneurship",
  "Entrepreneurship - Business Creation",
  "Accounting",
  "Taxation",
  "Finance",
  "Communication - Mass Communication",
  "Communication - Marketing Communication",
  "Hotel Management",
  "Tourism",
  "Communication",
  "Public Relations",
  "Law - Business Law",
  "Psychology",
  "Chinese Literature",
  "Japanese Literature",
  "English Literature",
  "International Relations",
  "Primary Teacher Education",
  "Architecture",
  "Civil Engineering",
  "Industrial Engineering",
  "Computer Engineering",
  "Biotechnology",
  "Food Technology",
  "Computer Science and Mathematics",
  "Computer Science and Statistics",
  "Accounting and Information Systems",
  "Management and Information Systems",
  "Interactive Design and Technology",
  "Digital Business Innovation",
  "Master of Information Systems Management",
  "Master of Information Technology",
  "Master of Management",
] as const;

function createLookup(data: readonly string[]) {
  return (input?: number) => {
    if (!input) return undefined;
    if (input > data.length) return "Unknown";
    return data[input - 1];
  };
}

export const getFaculty = createLookup(faculty);
export const getRegion = createLookup(region);
export const getMajor = createLookup(majors);
export const getRole = createLookup(role);
export const getRoleColor = createLookup(roleColor);
