"use client";

import * as RadixAvatar from "@radix-ui/react-avatar";
import React from "react";
import Image from "next/image";

/* Re-export Radix pieces as named exports so your existing imports keep working */
export const Avatar = RadixAvatar.Root;
export const AvatarImage = RadixAvatar.Image;
export const AvatarFallback = RadixAvatar.Fallback;

/* Optional — small wrapper that uses next/image automatically (if you prefer) */
// export function AvatarImageNext({ src, alt, className, ...props }: any) {
//   return (
//     // Radix expects <Avatar.Image> element; you can wrap or use Radix directly
//     <RadixAvatar.Image asChild {...props}>
//       <Image src={src} alt={alt} fill className={className} />
//     </RadixAvatar.Image>
//   );
// }
