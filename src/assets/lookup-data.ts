export const roleColor = [
  "bg-red-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-highlight",
];
export function getRoleColor(input: number) {
  return roleColor[input - 1];
}

export const role = ["admin", "praeto", "aktivis", "member"] as const;
export function getRole(input: number) {
  return role[input - 1];
}

export const region = [
  "Kemanggisan",
  "Alam Sutera",
  "Bandung",
  "Malang",
] as const;
export function getRegion(input: number) {
  if (input > region.length) return "Unknown";
  return region[input - 1];
}

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
export function getFaculty(input: number) {
  if (input > faculty.length) return "Unknown";
  return faculty[input - 1];
}
