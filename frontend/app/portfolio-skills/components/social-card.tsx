"use client";
import { useState } from "react";

import { Save, Trash2, Edit, X } from "lucide-react";

import { getIconUrl } from "@/app/utils/getIconUrl";

interface SocialCardProps {
  link: string;
}

const SocialCard = ({ link }: SocialCardProps) => {
  const [editLink, setEditLink] = useState<{
    prevLink: string;
    newLink: string;
  }>({ prevLink: "", newLink: "" });
  const [isEditSocialLink, setIsEditSocialLink] = useState<boolean>(false);

  const platformName = link.split("/")[2].split(".")[0].toUpperCase();
  const iconUrl = getIconUrl(platformName.toLowerCase());

  return (
    <div className="w-72 flex items-center justify-between gap-3 rounded-lg border border-border-subtle bg-surface-base p-3">
      <div className="min-w-0 flex flex-col gap-1 w-full">
        <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-text-dimmed">
          <img
            src={iconUrl}
            alt={`${platformName} icon`}
            className="h-4 w-4 object-contain"
            loading="lazy"
          />
          {platformName}
        </span>

        {!isEditSocialLink ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="truncate text-sm text-text-muted hover:text-text-secondary transition-all duration-300 underline-offset-2 hover:text-text-brand hover:underline py-1"
          >
            {link}
          </a>
        ) : (
          <input
            type="text"
            value={editLink.newLink}
            className="text-sm outline-none w-full py-1 text-text-primary border-b border-border-subtle"
            onChange={(e) => {
              setEditLink({
                ...editLink,
                newLink: e.target.value,
              });
            }}
          />
        )}
      </div>
      <div className="flex gap-0.5 items-center justify-center">
        {!isEditSocialLink ? (
          <button
            type="button"
            aria-label={`Edit ${platformName} link`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-dimmed hover:bg-surface-elevated hover:text-text-primary duration-300 transition-all cursor-pointer"
            onClick={() => {
              setIsEditSocialLink(true);
              setEditLink({
                prevLink: link,
                newLink: link,
              });
            }}
          >
            <Edit className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            aria-label={`Save edited ${platformName} link`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-dimmed hover:bg-surface-elevated hover:text-text-primary duration-300 transition-all cursor-pointer"
            onClick={() => {
              setIsEditSocialLink(false);
              setEditLink({
                prevLink: "",
                newLink: "",
              });
            }}
          >
            <Save className="h-3.5 w-3.5" />
          </button>
        )}
        {!isEditSocialLink ? (
          <button
            type="button"
            aria-label={`Remove ${platformName} link`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-dimmed hover:bg-surface-elevated hover:text-red-700 duration-300 transition-all cursor-pointer"
            onClick={() => {}}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            aria-label={`Cancel edit ${platformName} link`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-dimmed hover:bg-surface-elevated hover:text-red-700 duration-300 transition-all cursor-pointer"
            onClick={() => {
              setIsEditSocialLink(false);
              setEditLink({
                prevLink: "",
                newLink: "",
              });
            }}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialCard;
