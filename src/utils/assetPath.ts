﻿const absoluteUrlPattern = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i;

export const resolveAssetPath = (path: string): string => {
  if (!path) {
    return path;
  }

  if (absoluteUrlPattern.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL ?? "/";
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!normalizedBase) {
    return normalizedPath;
  }

  return `${normalizedBase}${normalizedPath}`;
};
