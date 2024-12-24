import { cn } from '../../lib/utils'
import { SVGProps } from 'react';

interface PropsIcons extends SVGProps<SVGSVGElement> { }

export const AiIcon = ({ className, ...props }: PropsIcons) => {
   return (
      <svg
         width="22"
         height="22"
         viewBox="0 0 22 22"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         className={cn(className)}
         {...props}
      >
         <path d="M18 8L16.75 5.25L14 4L16.75 2.75L18 0L19.25 2.75L22 4L19.25 5.25L18 8ZM18 22L16.75 19.25L14 18L16.75 16.75L18 14L19.25 16.75L22 18L19.25 19.25L18 22ZM8 19L5.5 13.5L0 11L5.5 8.5L8 3L10.5 8.5L16 11L10.5 13.5L8 19Z" fill="currentColor" />
      </svg>

   )
}