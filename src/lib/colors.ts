export const getContrastTextColor = (hexColor: string): string => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate luminance using WCAG formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

// 50 color palette including various shades
export const colorPalette = [
  // Purple shades
  "#9333EA",
  "#A855F7",
  "#C084FC",
  "#E9D5FF",
  "#F3E8FF",
  // Blue shades
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
  "#DBEAFE",
  // Green shades
  "#16A34A",
  "#22C55E",
  "#4ADE80",
  "#86EFAC",
  "#DCFCE7",
  // Red shades
  "#DC2626",
  "#EF4444",
  "#F87171",
  "#FCA5A5",
  "#FEE2E2",
  // Orange shades
  "#EA580C",
  "#F97316",
  "#FB923C",
  "#FDBA74",
  "#FFEDD5",
  // Yellow shades
  "#CA8A04",
  "#EAB308",
  "#FACC15",
  "#FDE047",
  "#FEF9C3",
  // Pink shades
  "#DB2777",
  "#EC4899",
  "#F472B6",
  "#F9A8D4",
  "#FCE7F3",
  // Teal shades
  "#0D9488",
  "#14B8A6",
  "#2DD4BF",
  "#5EEAD4",
  "#CCFBF1",
  // Indigo shades
  "#4F46E5",
  "#6366F1",
  "#818CF8",
  "#A5B4FC",
  "#E0E7FF",
  // Gray shades
  "#4B5563",
  "#6B7280",
  "#9CA3AF",
  "#D1D5DB",
  "#F3F4F6",
];

type ClassType = "bg" | "text" | "border" | "bg_500";

interface ColorClasses {
  bg: string;
  bg_500: string;
  text: string;
  border: string;
}

const colorMap: Record<string, ColorClasses> = {
  inbox: {
    bg_500: "bg-green-500 dark:bg-green-500",
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-600",
    border: "border-green-500 dark:border-green-500",
  },
  spam: {
    bg_500: "bg-red-500 dark:bg-red-500",
    bg: "bg-red-100 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-600",
    border: "border-red-500 dark:border-red-500",
  },
  unreceived: {
    bg_500: "bg-yellow-500 dark:bg-yellow-500",
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    text: "text-yellow-600 dark:text-yellow-600",
    border: "border-yellow-500 dark:border-yellow-500",
  },
  category_primary: {
    bg_500: "bg-green-500 dark:bg-green-500",
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-600",
    border: "border-green-500 dark:border-green-500",
  },
  category_focused: {
    bg_500: "bg-green-500 dark:bg-green-500",
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-600",
    border: "border-green-500 dark:border-green-500",
  },
  category_promotion: {
    bg_500: "bg-purple-500 dark:bg-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-600",
    border: "border-purple-500 dark:border-purple-500",
  },
  category_newsletter: {
    bg_500: "bg-purple-500 dark:bg-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-600",
    border: "border-purple-500 dark:border-purple-500",
  },
  category_social: {
    bg_500: "bg-fuchsia-500 dark:bg-fuchsia-500",
    bg: "bg-fuchsia-100 dark:bg-fuchsia-900/20",
    text: "text-fuchsia-600 dark:text-fuchsia-600",
    border: "border-fuchsia-500 dark:border-fuchsia-500",
  },
  category_updates: {
    bg_500: "bg-blue-500 dark:bg-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-600",
    border: "border-blue-500 dark:border-blue-500",
  },
  category_notification: {
    bg_500: "bg-blue-500 dark:bg-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-600",
    border: "border-blue-500 dark:border-blue-500",
  },
  category_vip: {
    bg_500: "bg-pink-500 dark:bg-pink-500",
    bg: "bg-pink-100 dark:bg-pink-900/20",
    text: "text-pink-600 dark:text-pink-600",
    border: "border-pink-500 dark:border-pink-500",
  },
  category_inbox: {
    bg_500: "bg-green-500 dark:bg-green-500",
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-600",
    border: "border-green-500 dark:border-green-500",
  },
} as const;

const defaultClasses: ColorClasses = {
  bg: "bg-neutral-100",
  bg_500: "bg-neutral-500",
  text: "text-neutral-600",
  border: "border-neutral-500",
} as const;

// export function mapToColorClasses<T extends ClassType[]>(
//   str: string,
//   classTypes: T
// ): string[] {
//   const classes = colorMap[str.toLowerCase()] || defaultClasses;
//   return classTypes.map((type) => classes[type]);
// }

export function mapToColorClasses<T extends ClassType[]>(
  str: string,
  classTypes: T
): string {
  const classes = colorMap[str.toLowerCase()] ?? defaultClasses;
  return classTypes.map((type) => classes[type]).join(" ");
}
