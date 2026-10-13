import path from "node:path";
import { readFile } from "node:fs/promises";

export const renderTemplate = async (
  templateName: string,
  variables: Record<string, string | number>,
): Promise<string> => {
  const emailTempPath = path.join(process.cwd(), "templates", templateName);

  const emailHtml = await readFile(emailTempPath, "utf8");

  return emailHtml.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (match, key: string) => {
    const value = variables[key.trim()];

    if (value == undefined) {
      return match;
    }

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  });
};
