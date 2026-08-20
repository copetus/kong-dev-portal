import React, { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './styles.css'

// SVG paths below are from Kong/icons (svg/solid), kept inline so this React
// prototype can use the official assets without pulling in the Vue-only package.
const Icon = ({ name, size = 20, className = '' }) => {
  if (name === 'sparkles' && size === 40) return <DotLottieReact autoplay className={`icon editor-chat-sparkles ${className}`} loop renderConfig={{ autoResize: true }} speed={0.75} src="/sparkles-icon.lottie" style={{ height: 44, width: 44 }} />
  const paths = {
    search: <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" />,
    help: <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm-.95-7.85h1.85c0-1.1.42-1.93 1.25-2.6.83-.72 1.25-1.6 1.25-2.65 0-.93-.34-1.65-1.03-2.15-.68-.5-1.48-.75-2.42-.75-.95 0-1.72.25-2.32.75-.59.5-1 1.1-1.23 1.8l1.65.65c.08-.3.27-.63.56-.98.3-.35.74-.52 1.34-.52.53 0 .93.15 1.2.44.27.29.4.61.4.96 0 .33-.1.65-.3.94-.2.29-.45.56-.75.81-.73.65-1.18 1.14-1.35 1.48-.17.33-.25.94-.25 1.82ZM12 18c.35 0 .65-.12.9-.36.24-.24.36-.54.36-.89s-.12-.65-.36-.89a1.22 1.22 0 0 0-.9-.36c-.35 0-.65.12-.9.36-.24.24-.36.54-.36.89s.12.65.36.89c.25.24.55.36.9.36Z" />,
    bell: <path d="M5 19a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1v-7c0-1.38.42-2.61 1.25-3.69A6.5 6.5 0 0 1 10.5 4.2v-.7c0-.42.15-.77.44-1.06.29-.3.65-.44 1.06-.44s.77.15 1.06.44c.3.29.44.64.44 1.06v.7a6.5 6.5 0 0 1 3.25 2.11A5.9 5.9 0 0 1 18 10v7h1a1 1 0 0 1 1 1 1 1 0 0 1-1 1H5Zm7 3c-.55 0-1.02-.2-1.41-.59A1.93 1.93 0 0 1 10 20h4c0 .55-.2 1.02-.59 1.41-.39.39-.86.59-1.41.59Z" />,
    overview: <path fillRule="evenodd" d="m9.924 2.4-4.164 7.2h12.48L12 20.4 5.76 9.6l-4.248 7.368L3.672 20.4H21.24l1.608-2.808L14.088 2.4H9.912h.012Z" />,
    gateway: <path d="M12 21v-2h7V5h-7V3h7c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-7Zm-2-4-1.375-1.45L11.175 13H3v-2h8.175L8.625 8.45 10 7l5 5-5 5Z" />,
    event: <path fillRule="evenodd" d="M21 12h-9V3h9v9ZM9.534 15.534V9H3v6.534h6.534ZM16.997 15v5.199h-5.199V15h5.199Z" />,
    ai: <path d="M4 15c-1.67 0-3-1.33-3-3s1.33-3 3-3V7c0-1.1.9-2 2-2h3c0-1.67 1.33-3 3-3s3 1.33 3 3h3c1.1 0 2 .9 2 2v2c1.67 0 3 1.33 3 3s-1.33 3-3 3v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-4Zm5-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8 17h8v-2H8v2Z" />,
    mesh: <path d="M6 20a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm12 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm-6-10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />,
    portal: <path fillRule="evenodd" d="M12 2.4h6.732L21.6 5.676v13.056L18.324 21.6H5.268L2.4 18.324V5.268L5.676 2.4H12Zm4.272 9.6a4.27 4.27 0 1 0-8.532 0 4.27 4.27 0 0 0 8.532 0Z" />,
    web: <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H14.5V14.5H4V18ZM16.5 18H20V9H16.5V18ZM4 12.5H14.5V9H4V12.5Z" />,
    personalVideo: <path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z" />,
    tablet: <path d="M12 20.5C12.2833 20.5 12.5208 20.4042 12.7125 20.2125C12.9042 20.0208 13 19.7833 13 19.5C13 19.2167 12.9042 18.9792 12.7125 18.7875C12.5208 18.5958 12.2833 18.5 12 18.5C11.7167 18.5 11.4792 18.5958 11.2875 18.7875C11.0958 18.9792 11 19.2167 11 19.5C11 19.7833 11.0958 20.0208 11.2875 20.2125C11.4792 20.4042 11.7167 20.5 12 20.5ZM5 23C4.45 23 3.97917 22.8042 3.5875 22.4125C3.19583 22.0208 3 21.55 3 21V3C3 2.45 3.19583 1.97917 3.5875 1.5875C3.97917 1.19583 4.45 1 5 1H19C19.55 1 20.0208 1.19583 20.4125 1.5875C20.8042 1.97917 21 2.45 21 3V21C21 21.55 20.8042 22.0208 20.4125 22.4125C20.0208 22.8042 19.55 23 19 23H5ZM5 18V21H19V18H5ZM5 16H19V6H5V16ZM5 4H19V3H5V4Z" />,
    phone: <path d="M7 23C6.45 23 5.97917 22.8042 5.5875 22.4125C5.19583 22.0208 5 21.55 5 21V3C5 2.45 5.19583 1.97917 5.5875 1.5875C5.97917 1.19583 6.45 1 7 1H17C17.55 1 18.0208 1.19583 18.4125 1.5875C18.8042 1.97917 19 2.45 19 3V21C19 21.55 18.8042 22.0208 18.4125 22.4125C18.0208 22.8042 17.55 23 17 23H7ZM7 18V21H17V18H7ZM12 20.5C12.2833 20.5 12.5208 20.4042 12.7125 20.2125C12.9042 20.0208 13 19.7833 13 19.5C13 19.2167 12.9042 18.9792 12.7125 18.7875C12.5208 18.5958 12.2833 18.5 12 18.5C11.7167 18.5 11.4792 18.5958 11.2875 18.7875C11.0958 18.9792 11 19.2167 11 19.5C11 19.7833 11.0958 20.0208 11.2875 20.2125C11.4792 20.4042 11.7167 20.5 12 20.5ZM7 16H17V6H7V16ZM7 4H17V3H7V4Z" />,
    dollar: <path d="M12.025 21a1 1 0 0 1-1-1v-1.15c-.75-.17-1.408-.46-1.975-.875a4.03 4.03 0 0 1-1.375-1.75.9.9 0 0 1 .575-1.3.96.96 0 0 1 1.3.55c.28.5.64.88 1.075 1.14.43.25.97.38 1.6.38.68 0 1.26-.15 1.74-.46.47-.31.71-.79.71-1.44 0-.58-.18-1.05-.55-1.39-.37-.34-1.22-.73-2.55-1.16-1.43-.45-2.42-.99-2.95-1.61a3.4 3.4 0 0 1-.8-2.29c0-1.08.35-1.92 1.05-2.52.7-.6 1.42-.95 2.15-1.03V4a1 1 0 1 1 2 0v1.1c1.14.18 2.07.76 2.8 1.75.15.22.18.46.09.73a.94.94 0 0 1-.56.57.91.91 0 0 1-.73.01 1.65 1.65 0 0 1-.7-.49 2.6 2.6 0 0 0-1.85-.72c-.73 0-1.29.16-1.67.49-.38.32-.58.73-.58 1.21 0 .55.25.98.75 1.3.5.31 1.37.65 2.6 1 1.15.33 2.02.86 2.61 1.59.59.72.89 1.56.89 2.51 0 1.18-.35 2.08-1.05 2.7-.7.61-1.57 1-2.6 1.15V20a1 1 0 0 1-1 1Z" />,
    chart: <path d="M7 17h2v-5H7v5Zm8 0h2V7h-2v10Zm-4 0h2v-3h-2v3Zm0-5h2v-2h-2v2ZM5 21c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5Zm0-2h14V5H5v14Z" />,
    identity: <path d="M7 18a6 6 0 1 1 5.2-9h8.8l3 3-4.5 4.5-2-1.5-2 1.5-2.125-1.5H12.2A6 6 0 0 1 7 18Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />,
    organization: <path d="M2 21V3h10v4h10v14H2Zm2-2h6v-2H4v2Zm0-4h6v-2H4v2Zm0-4h6V9H4v2Zm0-4h6V5H4v2Zm8 12h8V9h-8v10Zm2-6v-2h4v2h-4Zm0 4v-2h4v2h-4Z" />,
    chevron: <path d="m12 15.4-6-6L7.4 8l4.6 4.6L16.6 8 18 9.4l-6 6Z" />,
    chevronLeft: <path d="M14 18L8 12L14 6L15.4 7.4L10.8 12L15.4 16.6L14 18Z" />,
    chevronRight: <path d="M9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12L9.4 18Z" />,
    code: <path d="M4.82499 12.025L8.69999 15.9C8.88332 16.0833 8.97499 16.3167 8.97499 16.6C8.97499 16.8833 8.88332 17.1167 8.69999 17.3C8.51665 17.4833 8.28332 17.575 7.99999 17.575C7.71665 17.575 7.48332 17.4833 7.29999 17.3L2.69999 12.7C2.59999 12.6 2.52915 12.4917 2.48749 12.375C2.44582 12.2583 2.42499 12.1333 2.42499 12C2.42499 11.8667 2.44582 11.7417 2.48749 11.625C2.52915 11.5083 2.59999 11.4 2.69999 11.3L7.29999 6.7C7.49999 6.5 7.73749 6.4 8.01249 6.4C8.28749 6.4 8.52499 6.5 8.72499 6.7C8.92499 6.9 9.02499 7.1375 9.02499 7.4125C9.02499 7.6875 8.92499 7.925 8.72499 8.125L4.82499 12.025ZM19.175 11.975L15.3 8.1C15.1167 7.91667 15.025 7.68333 15.025 7.4C15.025 7.11667 15.1167 6.88333 15.3 6.7C15.4833 6.51667 15.7167 6.425 16 6.425C16.2833 6.425 16.5167 6.51667 16.7 6.7L21.3 11.3C21.4 11.4 21.4708 11.5083 21.5125 11.625C21.5542 11.7417 21.575 11.8667 21.575 12C21.575 12.1333 21.5542 12.2583 21.5125 12.375C21.4708 12.4917 21.4 12.6 21.3 12.7L16.7 17.3C16.5 17.5 16.2667 17.5958 16 17.5875C15.7333 17.5792 15.5 17.475 15.3 17.275C15.1 17.075 15 16.8375 15 16.5625C15 16.2875 15.1 16.05 15.3 15.85L19.175 11.975Z" />,
    sparkles: <path d="M20 12.0884V12.4355C15.7128 12.4355 14.5598 16.2296 14.5598 19.3252H14.2229C14.2229 16.2296 12.8732 12.4355 8.78272 12.4355V12.0884C13.497 12.0884 14.2229 8.29432 14.2229 5.19878H14.5598C14.5598 8.29432 15.2977 12.0884 20 12.0884ZM7.28629 11.0361C7.28629 9.27503 7.94267 7.11656 10.3813 7.11656V6.91952C7.70577 6.91952 7.28629 4.76104 7.28629 3H7.09502C7.09502 4.76104 6.68206 6.91952 4 6.91952V7.11656C6.32779 7.11656 7.09502 9.27503 7.09502 11.0361H7.28629ZM9.21089 14.1529H9.04788C9.04788 15.6531 8.69578 17.4925 6.41038 17.4925V17.6604C8.39367 17.6604 9.04788 19.4998 9.04788 21H9.21089C9.21089 19.4998 9.76948 17.6604 11.8484 17.6604V17.4925C9.56843 17.4925 9.21089 15.6531 9.21089 14.1529Z" />,
    visibility: <path d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19Z" />,
    add: <path d="M11 19V13H5V11H11V5H13V11H19V13H13V19H11Z" />,
    copy: <path d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6H5V20H16V22H5ZM9 18C8.45 18 7.97917 17.8042 7.5875 17.4125C7.19583 17.0208 7 16.55 7 16V4C7 3.45 7.19583 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H9ZM9 16H18V4H9V16Z" />,
    close: <path d="m6.4 19-1.4-1.4 5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19Z" />,
    clear: <path d="m8.4 17 3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6L17 8.4 15.6 7 12 10.6 8.4 7 7 8.4l3.6 3.6L7 15.6 8.4 17ZM12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" />,
    external: <path d="M5 21c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h7v2H5v14h14v-7h2v7c0 1.1-.9 2-2 2H5Zm4.7-5.3-1.4-1.4L17.6 5H14V3h7v7h-2V6.4l-9.3 9.3Z" />,
    info: <path d="M11 17h2v-6h-2v6Zm1-8c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71s-.1-.52-.29-.71A.97.97 0 0 0 12 7c-.28 0-.52.1-.71.29A.97.97 0 0 0 11 8c0 .28.1.52.29.71.19.2.43.29.71.29Zm0 13a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" />,
    filter: <path d="M10 18v-2h4v2h-4ZM6 13v-2h12v2H6ZM3 8V6h18v2H3Z" />,
    more: <path d="M12 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />,
    check: <path d="m9.7 18.025-5.7-5.7L5.425 10.9 9.7 15.175 18.875 6 20.3 7.425 9.7 18.025Z" />,
    checkCircle: <path d="m10.6 16.6 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4 4.25 4.25ZM12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" />,
    warning: <path d="M12.025 22.05c-.267 0-.521-.05-.763-.15a2.4 2.4 0 0 1-.662-.425L2.575 13.45a2.4 2.4 0 0 1-.425-.663A1.9 1.9 0 0 1 2 12.025c0-.267.05-.525.15-.775.1-.25.242-.467.425-.65L10.6 2.575c.2-.2.42-.346.663-.438A1.9 1.9 0 0 1 12.025 2c.267 0 .525.046.775.138.25.092.467.237.65.437l8.025 8.025c.2.183.346.4.438.65.091.25.137.508.137.775 0 .267-.046.52-.138.763a2.4 2.4 0 0 1-.437.662l-8.025 8.025c-.183.183-.4.325-.65.425-.25.1-.508.15-.775.15Zm-1-9.025h2v-6h-2v6Zm1 3c.283 0 .52-.096.712-.288a.97.97 0 0 0 .288-.712.97.97 0 0 0-.288-.712.97.97 0 0 0-.712-.288.97.97 0 0 0-.712.288.97.97 0 0 0-.288.712c0 .283.096.52.288.712.192.192.429.288.712.288Z" />,
  }
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{paths[name]}</svg>
}

// The Teams page and IDP mapping use this same source of available portal teams.
const portalTeams = [
  { name: 'Design', description: 'Design system and product experience.', developers: 5 },
  { name: 'Engineering', description: 'Builds and operates the platform capabilities that power Kong Air and its developer experience.', developers: 7 },
  { name: 'Marketing team', description: 'Campaigns and product storytelling.', developers: 18 },
  { name: 'Sales team', description: 'Partners with prospective customers to understand their technical needs, coordinate evaluations, and guide successful Kong Air adoption across their organization.', developers: 4 },
]

function Toggle({ active, disabled = false, onClick }) {
  return <button aria-disabled={disabled} aria-pressed={active} className={`toggle ${active ? 'toggle--active' : ''} ${disabled ? 'toggle--disabled' : ''}`} onClick={onClick}><span /></button>
}

function SideItem({ icon, children, active, badge }) {
  return <div className={`side-item ${active ? 'side-item--active' : ''}`}><Icon name={icon} size={24} /><span>{children}</span>{badge && <b>{badge}</b>}</div>
}

function CompactSelect({ ariaLabel, items, onChange, value }) {
  const [open, setOpen] = useState(false)
  const selectRef = useRef(null)
  const selectedItem = items.find((item) => item.value === value) ?? items[0]

  useEffect(() => {
    const closeOnOutsidePress = (event) => {
      if (!selectRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsidePress)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsidePress)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return <div className="compact-select" ref={selectRef}>
    <button aria-expanded={open} aria-haspopup="listbox" aria-label={ariaLabel} className="compact-select-trigger" onClick={() => setOpen((current) => !current)} type="button"><span>{selectedItem.label}</span><Icon className={open ? 'chevron-open' : ''} name="chevron" size={18} /></button>
    {open && <div aria-label={ariaLabel} className="compact-select-options" role="listbox">{items.map((item) => <button aria-selected={item.value === value} className={item.value === value ? 'selected' : ''} key={item.value} onClick={() => { onChange(item.value); setOpen(false) }} role="option" type="button">{item.label}</button>)}</div>}
  </div>
}

function TeamDetailActions({ showToast }) {
  const [actionsOpen, setActionsOpen] = useState(false)
  return <div className="team-detail-actions"><button aria-expanded={actionsOpen} className="new-team-button" onClick={() => setActionsOpen((open) => !open)} type="button">Actions <Icon className={actionsOpen ? 'chevron-open' : ''} name="chevron" size={18} /></button>{actionsOpen && <div className="team-detail-actions-menu"><button onClick={() => { setActionsOpen(false); showToast('Edit team action selected') }} type="button">Edit team</button><button className="clear-mapping-menu-item" onClick={() => { setActionsOpen(false); showToast('Delete team action selected') }} type="button">Delete team</button></div>}</div>
}

function DevelopersContent({ mappedGroups, onSelectTeam, showToast, teams, view }) {
  const [teamFilter, setTeamFilter] = useState('')
  const [mappingFilter, setMappingFilter] = useState('all')
  const developers = [
    { name: 'Avery Chen', email: 'avery.chen@kongair.com', team: 'Engineering' },
    { name: 'Jordan Lee', email: 'jordan.lee@kongair.com', team: 'Design' },
    { name: 'Mina Patel', email: 'mina.patel@kongair.com', team: 'Marketing team' },
  ]
  const filteredTeams = teams.filter((team) => {
    const isMapped = Boolean(mappedGroups[team.name]?.length)
    return team.name.toLowerCase().includes(teamFilter.toLowerCase()) && (mappingFilter === 'all' || (mappingFilter === 'mapped' ? isMapped : !isMapped))
  })

  return <section className="developers-table-card">
    {view === 'teams' ? <>
    <div className="developers-toolbar">
      <div className="developers-search"><Icon name="search" size={20} /><input aria-label="Search teams or developers by name" onChange={(event) => setTeamFilter(event.target.value)} placeholder="Search by name" value={teamFilter} /></div>
      <div className="developers-filter"><span>Identity provider mapped</span><CompactSelect ariaLabel="Filter by identity provider mapping" items={[{ label: 'All', value: 'all' }, { label: 'Mapped', value: 'mapped' }, { label: 'Not mapped', value: 'unmapped' }]} onChange={setMappingFilter} value={mappingFilter} /></div>
      <button className="new-team-button" onClick={() => showToast('New team action selected')} type="button"><Icon name="add" size={18} />New team</button>
    </div>
    <div className="developers-data-table" role="table">
      <div className="developers-data-header" role="row">{['Team name', 'Description', 'Developers', 'Identity provider mapped', ''].map((heading) => <span key={heading} role="columnheader">{heading}</span>)}</div>
      {filteredTeams.map((team) => {
        const isMapped = Boolean(mappedGroups[team.name]?.length)
        return <div className="developers-data-row developers-data-row--interactive" key={team.name} onClick={() => onSelectTeam(team)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelectTeam(team) } }} role="button" tabIndex="0"><strong>{team.name}</strong><span>{team.description}</span><span>{team.developers}</span><span className={isMapped ? 'mapping-status mapping-status--mapped' : 'mapping-status'}>{isMapped ? <Icon name="check" size={18} /> : '—'}</span><button aria-label={`Actions for ${team.name}`} className="team-more-button" onClick={(event) => { event.stopPropagation(); showToast(`${team.name} actions selected`) }} type="button"><Icon name="more" size={20} /></button></div>
      })}
    </div>
    <div className="developers-pagination"><span><strong>1 to {filteredTeams.length}</strong> of {filteredTeams.length}</span><div className="page-controls"><button aria-label="Previous page" disabled type="button"><Icon name="chevronLeft" size={18} /></button><button className="current-page" type="button">1</button><button aria-label="Next page" disabled type="button"><Icon name="chevronRight" size={18} /></button></div><span>10 items per page</span></div>
    </> : <div className="developers-list" aria-label="Developers list"><div className="developers-list-header"><div className="developers-search"><Icon name="search" size={20} /><input aria-label="Search developers by name" placeholder="Search by name" /></div><button className="new-team-button" onClick={() => showToast('Invite developer action selected')} type="button"><Icon name="add" size={18} />Invite developer</button></div><div className="developers-people-header"><span>Name</span><span>Email</span><span>Team</span></div>{developers.map((developer) => <div className="developers-person-row" key={developer.email}><strong>{developer.name}</strong><span>{developer.email}</span><span>{developer.team}</span></div>)}</div>}
  </section>
}

function TeamDetailContent({ detailTab, onDetailTabChange, showToast, team }) {
  const [developerFilter, setDeveloperFilter] = useState('')
  const teamDevelopers = [
    { name: 'Salomon Onyegbulem (you)', email: 'salomon.onyegbulem@konghq.com' },
    { name: 'Travis Terwilligar', email: 'travis@konghq.com' },
    { name: 'Ally Christensen', email: 'ally.christensen@konghq.com' },
    { name: 'Missy Turco', email: 'missy.turco@konghq.com' },
    { name: 'András Hajgató', email: 'andras.hajgato@konghq.com' },
    { name: 'Nadia Brooks', email: 'nadia.brooks@konghq.com' },
  ].filter((developer) => developer.name.toLowerCase().includes(developerFilter.toLowerCase()))
  const teamId = '3124123911231321'

  return <div className="team-detail-content">
    <section className="team-about-card"><div><h2>About this team</h2><p>{team.description}</p><div className="team-id">Team ID: <code>{teamId}</code><button aria-label="Copy team ID" onClick={() => { navigator.clipboard?.writeText(teamId); showToast('Team ID copied') }} type="button"><Icon name="copy" size={16} /></button></div></div><span>Created: Aug 2, 2023, 9:19 AM</span></section>
    <nav className="tabs team-detail-tabs">{['Developers', 'APIs', 'Applications', 'Settings'].map((tab) => <button className={detailTab === tab.toLowerCase() ? 'active' : ''} key={tab} onClick={() => onDetailTabChange(tab.toLowerCase())} type="button"><span>{tab}</span></button>)}</nav>
    {detailTab === 'developers' ? <section className="developers-table-card team-developers-card"><div className="developers-toolbar"><div className="developers-search"><Icon name="search" size={20} /><input aria-label="Search developers by name" onChange={(event) => setDeveloperFilter(event.target.value)} placeholder="Search by name" value={developerFilter} /></div><label className="developers-filter"><span>Filters</span><select aria-label="Filter developers by email"><option>Email</option></select></label><button className="new-team-button new-developer-button" onClick={() => showToast('Add developer action selected')} type="button"><Icon name="add" size={18} />Add developer</button></div><div className="team-developers-table"><div className="team-developers-header"><span>Name</span><span>Email</span><span /></div>{teamDevelopers.map((developer) => <div className="team-developer-row" key={developer.email}><strong>{developer.name}</strong><span>{developer.email}</span><button aria-label={`Actions for ${developer.name}`} className="team-more-button" onClick={() => showToast(`${developer.name} actions selected`)} type="button"><Icon name="more" size={20} /></button></div>)}</div><div className="developers-pagination"><span><strong>1 to {teamDevelopers.length}</strong> of {teamDevelopers.length}</span><div className="page-controls"><button aria-label="Previous page" disabled type="button"><Icon name="chevronLeft" size={18} /></button><button className="current-page" type="button">1</button><button aria-label="Next page" disabled type="button"><Icon name="chevronRight" size={18} /></button></div><span>10 items per page</span></div></section> : <section className="team-detail-empty"><h2>{detailTab[0].toUpperCase() + detailTab.slice(1)}</h2><p>This section is ready for its team-specific prototype content.</p></section>}
  </div>
}

const initialPortalMarkdown = `---
title: Company
description: Build and innovate with our APIs
---

::page-section
---
full-width: true
---

  ::page-hero
  ---
  title: Kong API Developer Portal
  description: A customizable, unified API portal for developers to browse APIs, reference documentation, test endpoints, and register applications.
  ---

  # Get started

  Build, publish, and share APIs with a portal designed for your developers.

  - Browse API documentation
  - Test endpoints
  - Register applications
`

const readEditorFields = (source) => Object.fromEntries(source.split('\n').map((line) => {
  const separator = line.indexOf(':')
  return separator > -1 ? [line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^['\"]|['\"]$/g, '')] : []
}).filter(([key]) => key))

const parsePortalMarkdown = (source) => {
  const frontMatter = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/)
  const root = { body: [], children: [], fields: frontMatter ? readEditorFields(frontMatter[1]) : {}, indent: -1, type: 'root' }
  const stack = [root]
  const lines = source.replace(frontMatter?.[0] ?? '', '').split('\n')
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const component = line.match(/^(\s*)::([\w-]+)\s*$/)
    if (component) {
      const indent = component[1].replace(/\t/g, '  ').length
      while (stack.length > 1 && stack.at(-1).indent >= indent) stack.pop()
      const node = { body: [], children: [], fields: {}, indent, type: component[2] }
      let cursor = index + 1
      if (lines[cursor]?.trim() === '---') {
        const configuration = []
        cursor += 1
        while (cursor < lines.length && lines[cursor].trim() !== '---') {
          configuration.push(lines[cursor])
          cursor += 1
        }
        if (cursor < lines.length) cursor += 1
        node.fields = readEditorFields(configuration.join('\n'))
      }
      stack.at(-1).children.push(node)
      stack.push(node)
      index = cursor - 1
      continue
    }
    if (line.trim()) {
      const indent = line.match(/^\s*/)[0].replace(/\t/g, '  ').length
      while (stack.length > 1 && indent <= stack.at(-1).indent) stack.pop()
    }
    stack.at(-1).body.push(line.trimStart())
  }
  return { root }
}

const renderInlineMarkdown = (text, keyPrefix) => text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^\s)]+\)|\*[^*]+\*)/g).filter(Boolean).map((part, index) => {
  const key = `${keyPrefix}-${index}`
  if (part.startsWith('**')) return <strong key={key}>{part.slice(2, -2)}</strong>
  if (part.startsWith('`')) return <code key={key}>{part.slice(1, -1)}</code>
  if (part.startsWith('[')) {
    const [, label, href] = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/) ?? []
    return <a href={href} key={key} rel="noreferrer" target="_blank">{label}</a>
  }
  if (part.startsWith('*')) return <em key={key}>{part.slice(1, -1)}</em>
  return part
})

const renderMarkdownPreview = (markdown) => {
  const lines = markdown.split('\n')
  const blocks = []
  let index = 0
  while (index < lines.length) {
    const line = lines[index].trim()
    if (!line) { index += 1; continue }
    const heading = line.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      const Heading = `h${heading[1].length}`
      blocks.push(<Heading key={`heading-${index}`}>{renderInlineMarkdown(heading[2], `heading-${index}`)}</Heading>)
      index += 1
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      const items = []
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(<li key={`item-${index}`}>{renderInlineMarkdown(lines[index].trim().replace(/^[-*]\s+/, ''), `item-${index}`)}</li>)
        index += 1
      }
      blocks.push(<ul key={`list-${index}`}>{items}</ul>)
      continue
    }
    if (/^>\s?/.test(line)) {
      blocks.push(<blockquote key={`quote-${index}`}>{renderInlineMarkdown(line.replace(/^>\s?/, ''), `quote-${index}`)}</blockquote>)
      index += 1
      continue
    }
    if (/^---+$/.test(line)) { blocks.push(<hr key={`rule-${index}`} />); index += 1; continue }
    const paragraph = [line]
    index += 1
    while (index < lines.length && lines[index].trim() && !/^(#{1,3})\s|^[-*]\s+|^>\s?|^---+$/.test(lines[index].trim())) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    blocks.push(<p key={`paragraph-${index}`}>{renderInlineMarkdown(paragraph.join(' '), `paragraph-${index}`)}</p>)
  }
  return blocks
}

const renderPortalNode = (node, key) => {
  const body = node.body.join('\n').trim()
  const children = node.children.map((child, index) => renderPortalNode(child, `${key}-${index}`))
  const markdown = body ? <article className="preview-markdown">{renderMarkdownPreview(body)}</article> : null
  if (node.type === 'root') return <>{children}{markdown}</>
  if (node.type === 'page-hero') return <section className="preview-hero" key={key}>{node.fields.title && <h2>{node.fields.title}</h2>}{node.fields.description && <p>{node.fields.description}</p>}{children}{markdown}</section>
  if (node.type === 'page-section') return <section className={`preview-page-section ${node.fields['full-width'] === 'true' ? 'preview-page-section--full' : ''}`} key={key}>{children}{markdown}</section>
  return <section className="preview-component" key={key}>{children}{markdown}</section>
}

const renderSyntaxHighlightedMarkdown = (source) => source.split('\n').map((line, index) => {
  if (/^\s*::/.test(line)) return <span className="editor-code-token editor-code-token--directive" key={index}>{line || ' '}{'\n'}</span>
  if (/^---+$/.test(line.trim())) return <span className="editor-code-token editor-code-token--divider" key={index}>{line || ' '}{'\n'}</span>
  const property = line.match(/^(\s*)([\w-]+)(:\s*)(.*)$/)
  if (property) return <span className="editor-code-token" key={index}>{property[1]}<span className="editor-code-token--property">{property[2]}</span>{property[3]}<span className={/^(true|false|null|\d+(\.\d+)?)$/.test(property[4]) ? 'editor-code-token--value' : ''}>{property[4]}</span>{'\n'}</span>
  if (/^\s*#{1,3}\s/.test(line)) return <span className="editor-code-token editor-code-token--heading" key={index}>{line || ' '}{'\n'}</span>
  if (/^\s*[-*]\s/.test(line)) return <span className="editor-code-token editor-code-token--list" key={index}>{line || ' '}{'\n'}</span>
  return <span className="editor-code-token" key={index}>{line || ' '}{'\n'}</span>
})

const renderEditorLineNumbers = (source) => source.split('\n').map((_, index) => <li key={index}>{index + 1}</li>)

const editorAutocompleteItems = {
  blocks: [
    { description: 'A container for page content.', insert: '::page-section\n---\nfull-width: true\n---\n', label: '::page-section' },
    { description: 'A title and description hero component.', insert: '::page-hero\n---\ntitle: \ndescription: \n---\n', label: '::page-hero' },
  ],
  fields: [
    { description: 'A page or component title.', insert: 'title: ', label: 'title' },
    { description: 'Supporting page or component copy.', insert: 'description: ', label: 'description' },
    { description: 'Expands a page section to full width.', insert: 'full-width: true', label: 'full-width' },
  ],
  markdown: [
    { description: 'Heading level one.', insert: '# ', label: '# Heading' },
    { description: 'Heading level two.', insert: '## ', label: '## Heading' },
    { description: 'Bulleted list item.', insert: '- ', label: '- List item' },
    { description: 'Block quote.', insert: '> ', label: '> Quote' },
    { description: 'Horizontal divider.', insert: '---', label: '--- Divider' },
  ],
}

const getEditorAutocomplete = (source, cursor) => {
  const beforeCursor = source.slice(0, cursor)
  const line = beforeCursor.slice(beforeCursor.lastIndexOf('\n') + 1)
  const componentMatch = line.match(/^(\s*)::([\w-]*)$/)
  if (componentMatch) {
    const query = componentMatch[2].toLowerCase()
    return { items: editorAutocompleteItems.blocks.filter((item) => item.label.slice(2).startsWith(query)), replaceStart: cursor - componentMatch[2].length - 2 }
  }
  const delimiters = (beforeCursor.match(/^\s*---\s*$/gm) ?? []).length
  const inConfiguration = delimiters % 2 === 1
  const fieldMatch = line.match(/^(\s*)([\w-]*)$/)
  if (inConfiguration && fieldMatch) {
    const query = fieldMatch[2].toLowerCase()
    return { items: editorAutocompleteItems.fields.filter((item) => item.label.includes(query)), replaceStart: cursor - fieldMatch[2].length }
  }
  if (/^\s*(#{0,2}|-|>|---)?$/.test(line)) {
    const query = line.trim()
    const matchingItems = editorAutocompleteItems.markdown.filter((item) => !query || item.label.startsWith(query))
    if (matchingItems.length) return { items: matchingItems, replaceStart: cursor - query.length }
  }
  return null
}

const getEditorCaretPosition = (textarea) => {
  const computed = window.getComputedStyle(textarea)
  const mirror = document.createElement('div')
  for (const property of ['border', 'boxSizing', 'fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'padding', 'tabSize', 'whiteSpace', 'wordBreak', 'wordSpacing', 'overflowWrap']) mirror.style[property] = computed[property]
  mirror.style.height = 'auto'
  mirror.style.left = '-9999px'
  mirror.style.position = 'absolute'
  mirror.style.top = '0'
  mirror.style.visibility = 'hidden'
  mirror.style.width = `${textarea.clientWidth}px`
  mirror.textContent = textarea.value.slice(0, textarea.selectionStart)
  const marker = document.createElement('span')
  marker.textContent = '\u200b'
  mirror.appendChild(marker)
  document.body.appendChild(mirror)
  const position = { left: marker.offsetLeft - textarea.scrollLeft, top: marker.offsetTop - textarea.scrollTop + parseFloat(computed.lineHeight) }
  mirror.remove()
  return position
}

const getSyntaxHoverDescription = (line) => {
  const syntax = line.trim()
  if (syntax.startsWith('::page-section')) return 'Page section container. Indent child blocks to nest them inside this section.'
  if (syntax.startsWith('::page-hero')) return 'Hero component. Configure it with title and description fields.'
  if (/^title\s*:/.test(syntax)) return 'Sets the title for a page or component.'
  if (/^description\s*:/.test(syntax)) return 'Sets supporting copy for a page or component.'
  if (/^full-width\s*:/.test(syntax)) return 'Makes a page section span the available preview width.'
  if (/^#{1,3}\s/.test(syntax)) return 'Markdown heading. Use one to three # characters for heading levels.'
  if (/^[-*]\s/.test(syntax)) return 'Markdown bulleted list item.'
  if (/^>\s?/.test(syntax)) return 'Markdown block quote.'
  if (/^---+$/.test(syntax)) return 'Configuration delimiter, or a Markdown divider outside a configuration block.'
  return null
}

const initialEditorPages = [
  { id: 'home', name: 'home', children: [] },
  { id: 'pricing', name: 'pricing', children: [{ id: 'custom', name: 'custom', children: [] }, { id: 'enterprise', name: 'enterprise', children: [] }, { id: 'startups', name: 'startups', children: [] }] },
  { id: 'contact-us', name: 'contact-us', children: [{ id: 'contact-form', name: 'contact form', children: [] }, { id: 'support', name: 'support', children: [] }] },
  { id: 'guides', name: 'guides', children: [] },
]

const findEditorPage = (pages, pageId) => {
  for (const page of pages) {
    if (page.id === pageId) return page
    const child = findEditorPage(page.children, pageId)
    if (child) return child
  }
  return null
}

const pageContains = (page, pageId) => page.id === pageId || page.children.some((child) => pageContains(child, pageId))

const removeEditorPage = (pages, pageId) => {
  let removed = null
  const nextPages = pages.reduce((result, page) => {
    if (page.id === pageId) {
      removed = page
      return result
    }
    const nested = removeEditorPage(page.children, pageId)
    if (nested.removed) {
      removed = nested.removed
      result.push({ ...page, children: nested.pages })
      return result
    }
    result.push(page)
    return result
  }, [])
  return { pages: nextPages, removed }
}

const insertEditorPage = (pages, pageId, newPage, placement) => {
  for (let index = 0; index < pages.length; index += 1) {
    const page = pages[index]
    if (page.id === pageId) {
      if (placement === 'before') return { inserted: true, pages: [...pages.slice(0, index), newPage, ...pages.slice(index)] }
      if (placement === 'after') return { inserted: true, pages: [...pages.slice(0, index + 1), newPage, ...pages.slice(index + 1)] }
      return { inserted: true, pages: pages.map((current) => current.id === pageId ? { ...current, children: [...current.children, newPage] } : current) }
    }
    const nested = insertEditorPage(page.children, pageId, newPage, placement)
    if (nested.inserted) return { inserted: true, pages: pages.map((current) => current.id === page.id ? { ...current, children: nested.pages } : current) }
  }
  return { inserted: false, pages }
}

function PortalEditorContent({ onExit, showToast }) {
  const [paneWidths, setPaneWidths] = useState({ chat: 360, code: 480, preview: 480 })
  const [resizingPane, setResizingPane] = useState(null)
  const [visiblePanes, setVisiblePanes] = useState({ chat: true, code: true, preview: true })
  const storedEditorMarkdown = window.localStorage.getItem('kong-portal-editor-markdown') || initialPortalMarkdown
  const [editorMarkdown, setEditorMarkdown] = useState(storedEditorMarkdown)
  const [syntaxHelpOpen, setSyntaxHelpOpen] = useState(false)
  const [syntaxGuideTab, setSyntaxGuideTab] = useState('general')
  const [editorAutocomplete, setEditorAutocomplete] = useState(null)
  const [activeAutocompleteIndex, setActiveAutocompleteIndex] = useState(0)
  const [hoveredCodeSyntax, setHoveredCodeSyntax] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [chatThinking, setChatThinking] = useState(false)
  const [pageTree, setPageTree] = useState(initialEditorPages)
  const [expandedPageIds, setExpandedPageIds] = useState(() => new Set(['pricing', 'contact-us']))
  const [selectedPageId, setSelectedPageId] = useState('home')
  const [draggedPageId, setDraggedPageId] = useState(null)
  const [dropTarget, setDropTarget] = useState(null)
  const [pageActionsOpen, setPageActionsOpen] = useState(null)
  const [editingPageId, setEditingPageId] = useState(null)
  const [editedPageName, setEditedPageName] = useState('')
  const [newPageName, setNewPageName] = useState('')
  const [newPageInputOpen, setNewPageInputOpen] = useState(false)
  const chatPaneRef = useRef(null)
  const codePaneRef = useRef(null)
  const codeHighlightRef = useRef(null)
  const codeGutterRef = useRef(null)
  const codeInputRef = useRef(null)
  const newPageInputRef = useRef(null)
  const editPageInputRef = useRef(null)
  const newPageSequenceRef = useRef(0)
  const chatResponseTimerRef = useRef(null)
  const syntaxHoverTimerRef = useRef(null)
  const syntaxHoverTargetRef = useRef(null)
  const hoveredCodeSyntaxRef = useRef(null)
  const editorHistoryRef = useRef({ entries: [storedEditorMarkdown], index: 0 })
  const editorMarkdownRef = useRef(editorMarkdown)
  const autocompleteTypingRef = useRef(false)
  editorMarkdownRef.current = editorMarkdown
  hoveredCodeSyntaxRef.current = hoveredCodeSyntax
  const previewPaneRef = useRef(null)
  const portalDocument = parsePortalMarkdown(editorMarkdown)
  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') setSyntaxHelpOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])
  useEffect(() => () => {
    window.clearTimeout(chatResponseTimerRef.current)
    window.clearTimeout(syntaxHoverTimerRef.current)
  }, [])
  useEffect(() => {
    const input = codeInputRef.current
    if (!input) return undefined
    const markTyping = () => { autocompleteTypingRef.current = true }
    const clearAutocompleteForPointer = () => { autocompleteTypingRef.current = false; setEditorAutocomplete(null) }
    const clearAutocompleteForNavigation = (event) => {
      if (['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Escape', 'Home', 'End'].includes(event.key)) autocompleteTypingRef.current = false
    }
    const showSyntaxDescription = (event) => {
      const bounds = input.getBoundingClientRect()
      const lineHeight = parseFloat(window.getComputedStyle(input).lineHeight)
      const paddingTop = parseFloat(window.getComputedStyle(input).paddingTop)
      const lineIndex = Math.floor((event.clientY - bounds.top + input.scrollTop - paddingTop) / lineHeight)
      const description = getSyntaxHoverDescription(editorMarkdownRef.current.split('\n')[lineIndex] ?? '')
      const target = description ? `${lineIndex}:${description}` : null
      const tooltip = description ? { description, left: event.clientX + 12, top: event.clientY + 12 } : null
      if (!target) {
        window.clearTimeout(syntaxHoverTimerRef.current)
        syntaxHoverTimerRef.current = null
        syntaxHoverTargetRef.current = null
        setHoveredCodeSyntax(null)
        return
      }
      if (syntaxHoverTargetRef.current === target) {
        if (hoveredCodeSyntaxRef.current) setHoveredCodeSyntax(tooltip)
        return
      }
      window.clearTimeout(syntaxHoverTimerRef.current)
      syntaxHoverTargetRef.current = target
      setHoveredCodeSyntax(null)
      syntaxHoverTimerRef.current = window.setTimeout(() => {
        if (syntaxHoverTargetRef.current === target) setHoveredCodeSyntax(tooltip)
        syntaxHoverTimerRef.current = null
      }, 300)
    }
    const clearSyntaxDescription = () => {
      window.clearTimeout(syntaxHoverTimerRef.current)
      syntaxHoverTimerRef.current = null
      syntaxHoverTargetRef.current = null
      setHoveredCodeSyntax(null)
    }
    input.addEventListener('input', markTyping, true)
    input.addEventListener('pointerdown', clearAutocompleteForPointer, true)
    input.addEventListener('keydown', clearAutocompleteForNavigation, true)
    input.addEventListener('mousemove', showSyntaxDescription)
    input.addEventListener('mouseleave', clearSyntaxDescription)
    return () => {
      input.removeEventListener('input', markTyping, true)
      input.removeEventListener('pointerdown', clearAutocompleteForPointer, true)
      input.removeEventListener('keydown', clearAutocompleteForNavigation, true)
      input.removeEventListener('mousemove', showSyntaxDescription)
      input.removeEventListener('mouseleave', clearSyntaxDescription)
      window.clearTimeout(syntaxHoverTimerRef.current)
    }
  }, [])
  useEffect(() => {
    const codeClose = codePaneRef.current?.querySelector('.editor-code-toolbar > button')
    const dismissCode = () => setVisiblePanes((current) => ({ ...current, code: false }))
    const applyKongCloseIcon = (button) => button?.querySelector('path')?.setAttribute('d', 'm6.4 19-1.4-1.4 5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19Z')
    codeClose?.setAttribute('aria-label', 'Hide code pane')
    applyKongCloseIcon(codeClose)
    codeClose?.addEventListener('click', dismissCode)
    return () => {
      codeClose?.removeEventListener('click', dismissCode)
    }
  }, [])
  const startPaneResize = (boundary, event) => {
    event.preventDefault()
    const startX = event.clientX
    const startChatWidth = chatPaneRef.current?.getBoundingClientRect().width ?? paneWidths.chat
    const startCodeWidth = codePaneRef.current?.getBoundingClientRect().width ?? paneWidths.code
    const startPreviewWidth = previewPaneRef.current?.getBoundingClientRect().width ?? 300
    const chatAdjacentPane = visiblePanes.code ? 'code' : 'preview'
    const startChatAdjacentWidth = chatAdjacentPane === 'code' ? startCodeWidth : startPreviewWidth
    const minimumWidth = 300
    setResizingPane(boundary)
    const updateWidth = (moveEvent) => {
      const delta = moveEvent.clientX - startX
      if (boundary === 'chat') {
        const nextChatWidth = Math.max(minimumWidth, Math.min(startChatWidth + delta, startChatWidth + startChatAdjacentWidth - minimumWidth))
        setPaneWidths((current) => ({ ...current, chat: nextChatWidth, [chatAdjacentPane]: startChatAdjacentWidth - (nextChatWidth - startChatWidth) }))
        return
      }
      const nextCodeWidth = Math.max(minimumWidth, Math.min(startCodeWidth + delta, startCodeWidth + startPreviewWidth - minimumWidth))
      setPaneWidths((current) => ({ ...current, code: nextCodeWidth, preview: startPreviewWidth - (nextCodeWidth - startCodeWidth) }))
    }
    const finishResize = () => {
      setResizingPane(null)
      window.removeEventListener('pointermove', updateWidth)
      window.removeEventListener('pointerup', finishResize)
    }
    window.addEventListener('pointermove', updateWidth)
    window.addEventListener('pointerup', finishResize, { once: true })
  }
  const togglePane = (pane) => {
    setPaneWidths((current) => ({
      chat: visiblePanes.chat ? chatPaneRef.current?.getBoundingClientRect().width ?? current.chat : current.chat,
      code: visiblePanes.code ? codePaneRef.current?.getBoundingClientRect().width ?? current.code : current.code,
      preview: visiblePanes.preview ? previewPaneRef.current?.getBoundingClientRect().width ?? current.preview : current.preview,
    }))
    setVisiblePanes((current) => ({ ...current, [pane]: !current[pane] }))
  }
  const paneStyle = (pane) => ({ flex: `${paneWidths[pane]} 1 0px` })
  const updateEditorAutocomplete = (value, textarea) => {
    if (!autocompleteTypingRef.current) { setEditorAutocomplete(null); return }
    const suggestion = getEditorAutocomplete(value, textarea.selectionStart)
    if (!suggestion?.items.length) { setEditorAutocomplete(null); return }
    setActiveAutocompleteIndex(0)
    setEditorAutocomplete({ ...suggestion, position: getEditorCaretPosition(textarea) })
  }
  const commitEditorMarkdown = (nextValue) => {
    const history = editorHistoryRef.current
    if (history.entries[history.index] === nextValue) return
    const entries = [...history.entries.slice(0, history.index + 1), nextValue].slice(-100)
    editorHistoryRef.current = { entries, index: entries.length - 1 }
    setEditorMarkdown(nextValue)
  }
  const restoreEditorHistory = (direction) => {
    const history = editorHistoryRef.current
    const nextIndex = Math.max(0, Math.min(history.entries.length - 1, history.index + direction))
    if (nextIndex === history.index) return
    editorHistoryRef.current = { ...history, index: nextIndex }
    setEditorMarkdown(history.entries[nextIndex])
    setEditorAutocomplete(null)
  }
  const applyEditorSuggestion = (suggestion) => {
    if (!editorAutocomplete || !codeInputRef.current) return
    const nextValue = `${editorMarkdown.slice(0, editorAutocomplete.replaceStart)}${suggestion.insert}${editorMarkdown.slice(codeInputRef.current.selectionStart)}`
    const nextCursor = editorAutocomplete.replaceStart + suggestion.insert.length
    commitEditorMarkdown(nextValue)
    setEditorAutocomplete(null)
    requestAnimationFrame(() => {
      codeInputRef.current?.focus()
      codeInputRef.current?.setSelectionRange(nextCursor, nextCursor)
    })
  }
  const sendChatMessage = (suggestedMessage = chatInput) => {
    const message = suggestedMessage.trim()
    if (!message) return
    setChatMessages((messages) => [...messages, { role: 'user', text: message }])
    setChatInput('')
    setChatThinking(true)
    window.clearTimeout(chatResponseTimerRef.current)
    chatResponseTimerRef.current = window.setTimeout(() => {
      setChatMessages((messages) => [...messages, { role: 'assistant', text: 'Got it! Let me explore the current implementation and then polish the page to make it look more professional and on-brand for Kong.' }])
      setChatThinking(false)
    }, 700)
  }
  const openNewPageInput = () => {
    setNewPageName('')
    setNewPageInputOpen(true)
    window.requestAnimationFrame(() => newPageInputRef.current?.focus())
  }
  const createPage = () => {
    const name = newPageName.trim()
    if (!name) return
    const id = `page-${Date.now()}-${newPageSequenceRef.current++}`
    setPageTree((pages) => [...pages, { id, name, children: [] }])
    setSelectedPageId(id)
    setNewPageName('')
    setNewPageInputOpen(false)
    showToast(`Page “${name}” created`)
  }
  const togglePageExpanded = (pageId) => setExpandedPageIds((current) => {
    const next = new Set(current)
    if (next.has(pageId)) next.delete(pageId)
    else next.add(pageId)
    return next
  })
  const pageDropPlacement = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const relativeY = (event.clientY - bounds.top) / bounds.height
    if (relativeY < 0.25) return 'before'
    if (relativeY > 0.75) return 'after'
    return 'inside'
  }
  const canMovePage = (movingId, targetId) => {
    const movingPage = findEditorPage(pageTree, movingId)
    return Boolean(movingPage && movingId !== targetId && !pageContains(movingPage, targetId))
  }
  const handlePageDragStart = (event, pageId) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', pageId)
    setDraggedPageId(pageId)
  }
  const handlePageDragOver = (event, targetId) => {
    const movingId = draggedPageId || event.dataTransfer.getData('text/plain')
    if (!canMovePage(movingId, targetId)) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setDropTarget({ id: targetId, placement: pageDropPlacement(event) })
  }
  const handlePageDrop = (event, targetId) => {
    event.preventDefault()
    const movingId = draggedPageId || event.dataTransfer.getData('text/plain')
    const placement = pageDropPlacement(event)
    if (canMovePage(movingId, targetId)) {
      setPageTree((pages) => {
        const { pages: withoutPage, removed } = removeEditorPage(pages, movingId)
        return removed ? insertEditorPage(withoutPage, targetId, removed, placement).pages : pages
      })
      if (placement === 'inside') setExpandedPageIds((current) => new Set(current).add(targetId))
    }
    setDraggedPageId(null)
    setDropTarget(null)
  }
  const updatePageName = (pages, pageId, name) => pages.map((page) => page.id === pageId ? { ...page, name } : { ...page, children: updatePageName(page.children, pageId, name) })
  const beginPageRename = (page) => {
    setPageActionsOpen(null)
    setEditedPageName(page.name)
    setEditingPageId(page.id)
    window.requestAnimationFrame(() => editPageInputRef.current?.focus())
  }
  const savePageRename = (pageId) => {
    const name = editedPageName.trim()
    if (!name) return
    setPageTree((pages) => updatePageName(pages, pageId, name))
    setEditingPageId(null)
    showToast('Page name updated')
  }
  const deletePage = (page) => {
    setPageTree((pages) => removeEditorPage(pages, page.id).pages)
    setPageActionsOpen(null)
    setEditingPageId(null)
    if (selectedPageId === page.id) setSelectedPageId('home')
    showToast(`Page “${page.name}” deleted`)
  }
  const renderPageItem = (page) => {
    const hasChildren = page.children.length > 0
    const isExpanded = expandedPageIds.has(page.id)
    const dropClass = dropTarget?.id === page.id ? `is-drop-${dropTarget.placement}` : ''
    return <div className="editor-page-node" key={page.id}>
      <div className={`editor-page-row ${selectedPageId === page.id ? 'active' : ''} ${draggedPageId === page.id ? 'is-dragging' : ''} ${dropClass}`} onDragOver={(event) => handlePageDragOver(event, page.id)} onDrop={(event) => handlePageDrop(event, page.id)}>
        {editingPageId === page.id ? <form className="editor-page-rename-form" onSubmit={(event) => { event.preventDefault(); savePageRename(page.id) }}><input aria-label={`Rename ${page.name}`} onBlur={() => setEditingPageId(null)} onChange={(event) => setEditedPageName(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setEditingPageId(null) }} ref={editPageInputRef} value={editedPageName} /></form> : <button aria-expanded={hasChildren ? isExpanded : undefined} className="editor-page-row-main" draggable onClick={() => { setSelectedPageId(page.id); if (hasChildren) togglePageExpanded(page.id) }} onDragEnd={() => { setDraggedPageId(null); setDropTarget(null) }} onDragStart={(event) => handlePageDragStart(event, page.id)} type="button"><span className="editor-page-row-label" title={page.name}>{page.name}</span>{hasChildren && <Icon className={`editor-page-chevron ${isExpanded ? 'is-expanded' : 'is-collapsed'}`} name="chevron" size={16} />}</button>}
        {editingPageId !== page.id && <div className="team-actions-menu editor-page-actions"><button aria-expanded={pageActionsOpen === page.id} aria-label={`Actions for ${page.name}`} className="team-more-button" onClick={() => setPageActionsOpen((open) => open === page.id ? null : page.id)} type="button"><Icon name="more" size={18} /></button>{pageActionsOpen === page.id && <div className="team-actions-dropdown"><button onClick={() => beginPageRename(page)} type="button">Rename</button><button className="clear-mapping-menu-item" onClick={() => deletePage(page)} type="button">Delete</button></div>}</div>}
      </div>
      {hasChildren && isExpanded && <div className="editor-tree-children">{page.children.map(renderPageItem)}</div>}
    </div>
  }
  return <section className="portal-editor-workspace">
    <header className="editor-topbar"><button aria-label="Exit portal editor" className="editor-exit-button" onClick={onExit} type="button"><Icon name="chevronLeft" size={24} /></button>
      <div className="editor-page-status"><strong>home</strong><span>Draft <Icon name="info" size={14} /></span><span>Public <Icon name="info" size={14} /></span></div>
      <div aria-label="Toggle editor panes" className="editor-pane-toggles"><span className="editor-pane-toggle-tooltip"><button aria-label="Toggle AI pane" aria-pressed={visiblePanes.chat} className={visiblePanes.chat ? 'active' : ''} onClick={() => togglePane('chat')} type="button"><Icon name="sparkles" size={20} /></button><span role="tooltip">Ask Kai</span></span><span className="editor-pane-toggle-tooltip"><button aria-label="Toggle code pane" aria-pressed={visiblePanes.code} className={visiblePanes.code ? 'active' : ''} onClick={() => togglePane('code')} type="button"><Icon name="code" size={20} /></button><span role="tooltip">Code</span></span><span className="editor-pane-toggle-tooltip"><button aria-label="Toggle preview pane" aria-pressed={visiblePanes.preview} className={visiblePanes.preview ? 'active' : ''} onClick={() => togglePane('preview')} type="button"><Icon name="visibility" size={20} /></button><span role="tooltip">Preview</span></span></div>
      <div className="editor-topbar-actions"><button className="editor-utility-button" onClick={() => showToast('Changes panel opened')} type="button"><Icon name="copy" size={18} />View changes</button><button aria-label="Editor help" className="editor-icon-button" onClick={() => setSyntaxHelpOpen(true)} type="button"><Icon name="help" size={20} /></button><button aria-label="More editor actions" className="editor-icon-button" type="button"><Icon name="more" size={20} /></button><button className="editor-publish-button" onClick={() => showToast('Portal published')} type="button">Publish</button><button className="editor-save-button" onClick={() => { window.localStorage.setItem('kong-portal-editor-markdown', editorMarkdown); showToast('Portal saved') }} type="button">Save</button></div>
    </header>
    <div className="editor-body">
      <nav aria-label="Portal editor tools" className="editor-rail"><button aria-label="Pages" className="active" type="button"><Icon name="portal" size={22} /></button><button aria-label="Appearance" type="button"><Icon name="identity" size={22} /></button><button aria-label="Integrations" type="button"><Icon name="organization" size={22} /></button></nav>
      <aside className="editor-page-tree"><div className="editor-tree-tabs"><button className="active" type="button">Pages</button><button type="button">Snippets</button></div><button className="tertiary-button editor-new-page" onClick={openNewPageInput} type="button"><Icon name="add" size={18} />New page</button><label className="editor-tree-search"><Icon name="search" size={18} /><input aria-label="Search portal pages" placeholder="Search pages" /></label><div className="editor-tree-list">{pageTree.map(renderPageItem)}{newPageInputOpen && <form className="editor-page-create-form" onSubmit={(event) => { event.preventDefault(); createPage() }}><input aria-label="New page name" onBlur={() => { if (!newPageName.trim()) setNewPageInputOpen(false) }} onChange={(event) => setNewPageName(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') { setNewPageName(''); setNewPageInputOpen(false) } }} placeholder="Page name" ref={newPageInputRef} value={newPageName} /></form>}</div></aside>
      <div className={`editor-pane-area ${resizingPane ? `is-resizing is-resizing-${resizingPane}` : ''} ${visiblePanes.chat ? '' : 'chat-hidden'} ${visiblePanes.code ? '' : 'code-hidden'} ${visiblePanes.preview ? '' : 'preview-hidden'}`}>
        <section className="editor-chat-pane editor-resizable-pane" ref={chatPaneRef} style={paneStyle('chat')}><div className="editor-pane-toolbar"><button aria-label="Open chat menu" type="button"><Icon name="more" size={20} /></button><strong>New Chat</strong><Icon name="chevron" size={16} /><button aria-label="Hide AI pane" className="editor-toolbar-action" onClick={() => togglePane('chat')} type="button"><Icon name="close" size={20} /></button></div><div aria-live="polite" className="editor-chat-content">{chatMessages.length === 0 && !chatThinking ? <div className="editor-chat-empty"><div className="editor-chat-kai-mark"><Icon name="sparkles" size={40} /></div><h2>How can I help, Salomon?</h2><p>Get help creating, editing, and improving portal content.</p><div className="editor-chat-suggestions"><button onClick={() => sendChatMessage('Fix errors and improve this page')} type="button"><span className="editor-chat-suggestion-icon"><Icon name="code" size={20} /></span><span><strong>Fix errors and improve this page</strong><em>Improve formatting and readability</em></span><Icon name="chevronRight" size={22} /></button><button onClick={() => sendChatMessage('Make this page look polished and on-brand')} type="button"><span className="editor-chat-suggestion-icon"><Icon name="code" size={20} /></span><span><strong>Make this page look polished and on-brand</strong><em>Enhance layout, structure, and visual consistency.</em></span><Icon name="chevronRight" size={22} /></button><button onClick={() => sendChatMessage('Improve writing on this page')} type="button"><span className="editor-chat-suggestion-icon"><Icon name="code" size={20} /></span><span><strong>Improve writing on this page</strong><em>Make content clearer, more readable, and more developer-friendly.</em></span><Icon name="chevronRight" size={22} /></button></div></div> : <>{chatMessages.map((message, index) => message.role === 'user' ? <div className="editor-chat-prompt" key={`${message.role}-${index}`}>{message.text}</div> : <div className="editor-chat-response" key={`${message.role}-${index}`}><p>{message.text}</p><div className="editor-chat-feedback"><span>Was this helpful?</span><button type="button">Yes</button><button type="button">No</button></div></div>)}{chatThinking && <div className="editor-chat-working"><Icon name="sparkles" size={18} /><strong>Working on it...</strong><span aria-hidden="true" /></div>}</>}</div><div className="editor-chat-input"><textarea aria-label="Ask Kai a question" onChange={(event) => setChatInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendChatMessage() } }} placeholder="Ask a question, or use # for contexts" value={chatInput} /><button aria-label="Send message" disabled={!chatInput.trim() || chatThinking} onClick={sendChatMessage} type="button">↑</button></div><p className="editor-chat-note">KAI is an AI-driven beta feature and can make mistakes. <a href="#learn">Learn more</a></p></section>
        {hoveredCodeSyntax && <div className="editor-syntax-hover" role="tooltip" style={{ left: `${hoveredCodeSyntax.left}px`, top: `${hoveredCodeSyntax.top}px` }}>{hoveredCodeSyntax.description}</div>}
        <div aria-label="Resize chat and code panes" className="editor-pane-resizer editor-pane-resizer--chat" onPointerDown={(event) => startPaneResize('chat', event)} role="separator" />
        <section className="editor-code-pane editor-resizable-pane" ref={codePaneRef} style={paneStyle('code')}><div className="editor-pane-toolbar editor-code-toolbar"><span>Markdown</span><button aria-label="Code settings" type="button"><Icon name="more" size={20} /></button></div><div className="editor-code-editor"><ol aria-hidden="true" className="editor-code-gutter" ref={codeGutterRef}>{renderEditorLineNumbers(editorMarkdown)}</ol><pre aria-hidden="true" className="editor-code-highlight" ref={codeHighlightRef}>{renderSyntaxHighlightedMarkdown(editorMarkdown)}</pre><textarea aria-autocomplete="list" aria-controls="editor-autocomplete" aria-expanded={Boolean(editorAutocomplete)} aria-label="Portal markdown editor" className="editor-code-input" onChange={(event) => { commitEditorMarkdown(event.target.value); updateEditorAutocomplete(event.target.value, event.currentTarget) }} onClick={(event) => updateEditorAutocomplete(event.currentTarget.value, event.currentTarget)} onKeyDown={(event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); restoreEditorHistory(event.shiftKey ? 1 : -1); return } if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'y') { event.preventDefault(); restoreEditorHistory(1); return } if (!editorAutocomplete) return; if (event.key === 'ArrowDown') { event.preventDefault(); setActiveAutocompleteIndex((index) => (index + 1) % editorAutocomplete.items.length) } else if (event.key === 'ArrowUp') { event.preventDefault(); setActiveAutocompleteIndex((index) => (index - 1 + editorAutocomplete.items.length) % editorAutocomplete.items.length) } else if (event.key === 'Enter' || event.key === 'Tab') { event.preventDefault(); applyEditorSuggestion(editorAutocomplete.items[activeAutocompleteIndex]) } else if (event.key === 'Escape') { event.preventDefault(); setEditorAutocomplete(null) } }} onScroll={(event) => { if (codeHighlightRef.current) { codeHighlightRef.current.scrollTop = event.currentTarget.scrollTop; codeHighlightRef.current.scrollLeft = event.currentTarget.scrollLeft } if (codeGutterRef.current) codeGutterRef.current.scrollTop = event.currentTarget.scrollTop; if (editorAutocomplete) updateEditorAutocomplete(event.currentTarget.value, event.currentTarget) }} onSelect={(event) => updateEditorAutocomplete(event.currentTarget.value, event.currentTarget)} placeholder={'---\ntitle: My developer portal\ndescription: Introduce your APIs\n---\n\n::page-hero\n---\ntitle: Welcome\ndescription: Tell developers what they can do here\n---\n\n# Get started'} ref={codeInputRef} spellCheck="false" value={editorMarkdown} />{editorAutocomplete && <div className="editor-autocomplete" id="editor-autocomplete" role="listbox" style={{ left: `${Math.max(48, editorAutocomplete.position.left)}px`, top: `${editorAutocomplete.position.top + 4}px` }}>{editorAutocomplete.items.map((item, index) => <button aria-selected={index === activeAutocompleteIndex} className={index === activeAutocompleteIndex ? 'active' : ''} key={item.label} onMouseDown={(event) => { event.preventDefault(); applyEditorSuggestion(item) }} role="option" type="button"><code>{item.label}</code><span>{item.description}</span></button>)}</div>}</div></section>
        <div aria-label="Resize code and preview panes" className="editor-pane-resizer editor-pane-resizer--code" onPointerDown={(event) => startPaneResize('code', event)} role="separator" />
        <section className="editor-preview-pane" ref={previewPaneRef} style={paneStyle('preview')}><div className="editor-pane-toolbar editor-preview-toolbar"><div aria-label="Preview device" className="editor-device-tabs"><button className="active" aria-label="Desktop preview" type="button"><Icon name="personalVideo" size={20} /></button><button aria-label="Tablet preview" type="button"><Icon name="tablet" size={20} /></button><button aria-label="Mobile preview" type="button"><Icon name="phone" size={20} /></button></div><button aria-label="Open preview in new window" className="editor-preview-external" type="button"><Icon name="external" size={20} /></button></div><div className="editor-preview-canvas">{renderPortalNode(portalDocument.root, 'root')}</div><div className="editor-preview-footer"><span>◎ /</span><div><button aria-label="Refresh preview" type="button">↻</button><button aria-label="Copy preview URL" type="button"><Icon name="copy" size={18} /></button></div></div></section>
      </div>
    </div>
    {syntaxHelpOpen && <div className="modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSyntaxHelpOpen(false) }}>
      <section aria-labelledby="editor-syntax-title" aria-modal="true" className="map-groups-modal editor-syntax-modal" role="dialog">
        <header className="map-groups-header"><h2 id="editor-syntax-title">Markdown syntax guide</h2><button aria-label="Close syntax guide" className="map-groups-close" onClick={() => setSyntaxHelpOpen(false)} type="button"><Icon name="close" size={20} /></button></header>
        <div className="editor-syntax-body">
          <div aria-label="Syntax guide sections" className="tabs editor-syntax-tabs" role="tablist"><button aria-selected={syntaxGuideTab === 'general'} className={syntaxGuideTab === 'general' ? 'active' : ''} onClick={() => setSyntaxGuideTab('general')} role="tab" type="button"><span>General rules</span></button><button aria-selected={syntaxGuideTab === 'components'} className={syntaxGuideTab === 'components' ? 'active' : ''} onClick={() => setSyntaxGuideTab('components')} role="tab" type="button"><span>Components</span></button></div>
          <p>Write Markdown in the code pane to update the preview immediately. Portal metadata and page components use the extended syntax below.</p>
          <section className="editor-syntax-reference">
            {syntaxGuideTab === 'general' ? <div aria-live="polite" className="editor-syntax-tab-panel" role="tabpanel"><section><h3>Page metadata</h3><p>Start with front matter. Its fields are available to page components.</p><pre>{`---\ntitle: My developer portal\ndescription: Introduce your APIs\n---`}</pre></section><section><h3>Markdown content</h3><div className="editor-syntax-grid"><span><code># Heading</code><small>Headings levels 1–3</small></span><span><code>Paragraph text</code><small>Consecutive lines become a paragraph</small></span><span><code>**bold**</code><small>Bold text</small></span><span><code>*italic*</code><small>Italic text</small></span><span><code>- List item</code><small>Bulleted list</small></span><span><code>[Link](https://example.com)</code><small>External link</small></span><span><code>`inline code`</code><small>Inline code</small></span><span><code>&gt; Quote</code><small>Block quote</small></span></div></section><section><h3>Rules</h3><ul><li>Use a line containing only <code>---</code> to open or close configuration blocks.</li><li>Configuration entries must use <code>key: value</code> format.</li><li>Markdown content belongs outside configuration blocks.</li><li>Raw HTML is treated as text for safety.</li></ul></section></div> : <div aria-live="polite" className="editor-syntax-tab-panel" role="tabpanel"><section><h3>Structure content with blocks</h3><p>Use a <code>::block-name</code> line to begin a layout container. Its configuration always goes in a <code>---</code>-delimited block directly below it. Indent a child block by two spaces to nest it inside its parent.</p><pre>{`::page-section\n---\nfull-width: true\n---\n\n  ::page-hero\n  ---\n  title: Welcome\n  description: Help developers get started\n  ---\n\n  ## Explore our APIs\n\n  Add the content for this section here.`}</pre><p>Keep sibling blocks aligned at the same indentation level. Markdown at a deeper indentation belongs to the current container.</p></section><section><h3>Available components</h3><div className="editor-syntax-element"><code>::page-section</code><span>Creates a page-width content section. Supports <code>full-width: true</code>.</span></div><div className="editor-syntax-element"><code>::page-hero</code><span>Creates a hero from <code>title</code> and <code>description</code> fields.</span></div></section><section><h3>Hero component</h3><p>Use <code>::page-hero</code> to render a hero from its configured fields.</p><pre>{`::page-hero\n---\ntitle: Welcome\ndescription: Help developers get started\n---`}</pre></section><section><h3>Valid component fields</h3><div className="editor-syntax-element"><code>title: My portal</code><span>Sets a page or hero title.</span></div><div className="editor-syntax-element"><code>description: Welcome</code><span>Sets supporting page or hero copy.</span></div><div className="editor-syntax-element"><code>full-width: true</code><span>Marks a page section as full width.</span></div></section></div>}</section>
        </div>
        <footer className="map-groups-footer"><button className="map-groups-save" onClick={() => setSyntaxHelpOpen(false)} type="button">Got it</button></footer>
      </section>
    </div>}
  </section>
}

function App() {
  const [konnectMapping, setKonnectMapping] = useState(true)
  const [connectivityOpen, setConnectivityOpen] = useState(true)
  const [activePortalPage, setActivePortalPage] = useState('settings')
  const [developerView, setDeveloperView] = useState('teams')
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamDetailTab, setTeamDetailTab] = useState('developers')
  const [editorReturnState, setEditorReturnState] = useState({ developerView: 'teams', page: 'settings', selectedTeam: null, teamDetailTab: 'developers' })
  const [providerOpen, setProviderOpen] = useState(false)
  const [provider, setProvider] = useState(null)
  const [idpMappingEnabled, setIdpMappingEnabled] = useState(true)
  const [mappingAlertVisible, setMappingAlertVisible] = useState(false)
  const [teamFilter, setTeamFilter] = useState('')
  const [mapGroupsTeam, setMapGroupsTeam] = useState(null)
  const [selectedGroups, setSelectedGroups] = useState([])
  const [groupQuery, setGroupQuery] = useState('')
  const [availableGroups, setAvailableGroups] = useState([])
  const groupPickerRef = useRef(null)
  const groupInputRef = useRef(null)
  const [groupPickerOpen, setGroupPickerOpen] = useState(false)
  const [mappedGroups, setMappedGroups] = useState({})
  const [teamActionsOpen, setTeamActionsOpen] = useState(null)
  const [clearMappingTeam, setClearMappingTeam] = useState(null)
  const [oidcSlideoutOpen, setOidcSlideoutOpen] = useState(false)
  const [oidcSlideoutClosing, setOidcSlideoutClosing] = useState(false)
  const [providerToConfigure, setProviderToConfigure] = useState('OIDC')
  const [advancedOpen, setAdvancedOpen] = useState(true)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const toastTimerRef = useRef(null)
  const [oidcForm, setOidcForm] = useState({
    issuerUri: '',
    clientId: '',
    clientSecret: '',
    organizationLoginPath: '',
    scopes: '',
    nameClaim: 'name',
    emailClaim: 'email',
    groupsClaim: 'groups',
  })
  const oidcReady = ['issuerUri', 'clientId', 'clientSecret', 'organizationLoginPath'].every((field) => oidcForm[field].trim())
  const filteredTeams = portalTeams.filter((team) => team.name.toLowerCase().includes(teamFilter.toLowerCase()))
  const hasMappedTeams = Object.values(mappedGroups).some((groups) => groups.length > 0)
  const isLastTeamMapping = Boolean(clearMappingTeam) && Object.values(mappedGroups).filter((groups) => groups.length > 0).length === 1
  const updateOidcField = (field, value) => setOidcForm((form) => ({ ...form, [field]: value }))
  const showToast = (message) => {
    window.clearTimeout(toastTimerRef.current)
    setToast({ visible: true, message })
    toastTimerRef.current = window.setTimeout(() => setToast((currentToast) => ({ ...currentToast, visible: false })), 5000)
  }
  const openOidcSlideout = () => {
    setOidcSlideoutClosing(false)
    setOidcSlideoutOpen(true)
  }
  const closeOidcSlideout = () => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setOidcSlideoutOpen(false)
      setOidcSlideoutClosing(false)
      return
    }
    setOidcSlideoutClosing(true)
  }
  const saveOidc = () => {
    setProvider('OIDC')
    setIdpMappingEnabled(false)
    setMappingAlertVisible(false)
    closeOidcSlideout()
    showToast('OIDC configured')
  }
  const autofillOidc = () => {
    setOidcForm({
      issuerUri: 'https://dev-123456789.okta.com/oauth2/default',
      clientId: '0oa123exampleABC456',
      clientSecret: 'testing-client-secret',
      organizationLoginPath: 'kong-air',
      scopes: 'openid',
      nameClaim: 'name',
      emailClaim: 'email',
      groupsClaim: 'groups',
    })
    setAdvancedOpen(true)
  }
  const openMapGroups = (team) => {
    setMapGroupsTeam(team)
    setSelectedGroups(mappedGroups[team.name] || [])
    setGroupQuery('')
    setGroupPickerOpen(false)
  }
  const saveGroups = () => {
    if (!mapGroupsTeam || selectedGroups.length === 0) return
    setMappedGroups((groups) => ({ ...groups, [mapGroupsTeam.name]: selectedGroups }))
    setMappingAlertVisible(false)
    setMapGroupsTeam(null)
    showToast('Team mapped')
  }
  const addGroup = (group) => {
    const value = group.trim()
    if (!value) return
    setAvailableGroups((groups) => groups.includes(value) ? groups : [...groups, value])
    setSelectedGroups((groups) => groups.includes(value) ? groups : [...groups, value])
    setGroupQuery('')
    setGroupPickerOpen(true)
    window.requestAnimationFrame(() => groupInputRef.current?.focus())
  }
  const clearMapping = (teamName) => {
    const updatedGroups = { ...mappedGroups }
    delete updatedGroups[teamName]
    setMappedGroups(updatedGroups)
    setIdpMappingEnabled(Object.values(updatedGroups).some((groups) => groups.length > 0))
    setTeamActionsOpen(null)
    showToast('Team mapping cleared')
  }
  const openGroupPicker = () => {
    setGroupPickerOpen(true)
    window.requestAnimationFrame(() => groupInputRef.current?.focus())
  }
  const toggleGroupPicker = () => setGroupPickerOpen((open) => !open)
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        closeOidcSlideout()
        setMapGroupsTeam(null)
        setClearMappingTeam(null)
      }
    }
    if (oidcSlideoutOpen || mapGroupsTeam) window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [oidcSlideoutOpen, mapGroupsTeam, clearMappingTeam])
  useEffect(() => {
    if (!groupPickerOpen) return undefined
    const closeOnOutsideClick = (event) => {
      if (!groupPickerRef.current?.contains(event.target)) setGroupPickerOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [groupPickerOpen])
  useEffect(() => () => window.clearTimeout(toastTimerRef.current), [])
  const navItems = ['Overview', 'Published APIs', 'Portal editor', 'Developers', 'Applications', 'Settings']

  return <div className={activePortalPage === 'portal editor' ? 'app-shell app-shell--editor' : 'app-shell'}>
    <header className="topbar">
      <div className="brand"><span className="brand-mark">◆</span><span>KONNECT</span></div>
      <div className="search"><Icon name="search" size={25} /><span>Quick search...</span><kbd>⌘K</kbd></div>
      <div className="header-actions"><Icon name="help" size={27} /><div className="notification"><Icon name="bell" size={27} /><i /></div><div className="avatar">ww</div></div>
    </header>
    <aside className="sidebar">
      <div className="sidebar-scroll">
        <SideItem icon="overview">Overview</SideItem>
        <button aria-expanded={connectivityOpen} className="nav-section connectivity-toggle" onClick={() => setConnectivityOpen((open) => !open)} type="button">CONNECTIVITY <Icon className={connectivityOpen ? 'chevron-open' : ''} name="chevron" size={18} /></button>
        {connectivityOpen && <><SideItem icon="gateway">API Gateway</SideItem><SideItem icon="event">Event Gateway</SideItem><SideItem icon="ai">AI Gateway</SideItem><SideItem icon="mesh">Service Mesh</SideItem></>}
        <div className="nav-section applications">APPLICATIONS</div>
        <div className="portal-nav">
          <div className="portal-title"><Icon name="portal" size={25} /><div><strong>Dev Portal</strong><span>Kong Air</span></div></div>
          <div className="portal-links">{navItems.map(item => <button className={`portal-link ${activePortalPage === item.toLowerCase() ? 'selected' : ''}`} key={item} onClick={() => { if (item === 'Developers') { setActivePortalPage('developers'); setDeveloperView('teams'); setSelectedTeam(null) } if (item === 'Settings') { setActivePortalPage('settings'); setSelectedTeam(null) } if (item === 'Portal editor') { setEditorReturnState({ developerView, page: activePortalPage, selectedTeam, teamDetailTab }); setActivePortalPage('portal editor'); setSelectedTeam(null) } }} type="button">{item}{item === 'Developers' && <b>1</b>}{item === 'Applications' && <b>4</b>}</button>)}</div>
        </div>
        <SideItem icon="dollar">Metering &amp; Billing</SideItem>
        <SideItem icon="chart">Observability</SideItem>
        <SideItem icon="identity">Identity</SideItem>
        <div className="sidebar-divider" />
        <SideItem icon="organization">Organization</SideItem>
      </div>
      <div className="sidebar-bottom"><div className="sidebar-footer-item"><span className="org-avatar">A</span> Acme Inc.<Icon name="chevron" size={20} /></div><div className="sidebar-footer-item"><span className="flag">🇺🇸</span> US (North America)<Icon name="chevron" size={20} /></div></div>
    </aside>
    <main className={activePortalPage === 'portal editor' ? 'main-content portal-editor-main' : 'main-content'}>
      {activePortalPage !== 'portal editor' && <div className="page-header"><div className="breadcrumbs"><Icon className="crumb-icon" name="portal" size={18} /><a href="#dev-portal">Dev Portal</a><span>/</span><a href="#portals">KongAir</a><span>/</span>{selectedTeam && <><button className="breadcrumb-button" onClick={() => setSelectedTeam(null)} type="button">Developers</button><span>/</span><button className="breadcrumb-button" onClick={() => setSelectedTeam(null)} type="button">Teams</button><span>/</span></>}</div><h1>{selectedTeam ? selectedTeam.name : activePortalPage === 'developers' ? 'Developers' : 'Settings'}</h1>{selectedTeam && <TeamDetailActions showToast={showToast} />}<nav className="tabs">{selectedTeam ? null : activePortalPage === 'developers' ? <><button className={developerView === 'developers' ? 'active' : ''} onClick={() => setDeveloperView('developers')} type="button"><span>Developers <b>1</b></span></button><button className={developerView === 'teams' ? 'active' : ''} onClick={() => setDeveloperView('teams')} type="button"><span>Teams</span></button></> : ['General', 'Custom domain', 'Security', 'Integrations', 'Team mapping', 'Audit logs'].map(tab => <button className={tab === 'Team mapping' ? 'active' : ''} key={tab}><span>{tab}</span></button>)}</nav></div>}
      <div className={activePortalPage === 'portal editor' ? 'content portal-editor-content' : 'content'}>
        {activePortalPage === 'portal editor' ? <PortalEditorContent onExit={() => { setActivePortalPage(editorReturnState.page); setDeveloperView(editorReturnState.developerView); setSelectedTeam(editorReturnState.selectedTeam); setTeamDetailTab(editorReturnState.teamDetailTab) }} showToast={showToast} /> : selectedTeam ? <TeamDetailContent detailTab={teamDetailTab} onDetailTabChange={setTeamDetailTab} showToast={showToast} team={selectedTeam} /> : activePortalPage === 'developers' ? <DevelopersContent mappedGroups={mappedGroups} onSelectTeam={(team) => { setSelectedTeam(team); setTeamDetailTab('developers') }} showToast={showToast} teams={portalTeams} view={developerView} /> : <>
        <section className="tile simple-tile"><div><h2>Konnect mapping</h2><p>Manage Developer Portal team memberships with Konnect.</p></div><Toggle active={konnectMapping} onClick={() => setKonnectMapping(!konnectMapping)} /></section>
        <section className="tile idp-tile">
          <div className="tile-heading idp-heading">
            <div><h2>Identity provider mapping</h2><p>Manage Developer Portal team memberships with your identity provider. Team memberships are assigned on SSO login.</p></div>
            {provider && <Toggle active={idpMappingEnabled} disabled={!hasMappedTeams} onClick={() => {
              if (!hasMappedTeams) {
                setMappingAlertVisible(true)
                return
              }
              const nextEnabled = !idpMappingEnabled
              setIdpMappingEnabled(nextEnabled)
              showToast(`Identity provider mapping ${nextEnabled ? 'enabled' : 'disabled'}`)
            }} />}
          </div>
          <div className="idp-body">
            {provider === 'OIDC' && mappingAlertVisible && !hasMappedTeams && <div className="mapping-required-alert" role="alert"><Icon name="clear" size={20} /><span>At least one team mapping group is required.</span><button aria-label="Dismiss mapping requirement" onClick={() => setMappingAlertVisible(false)} type="button"><Icon name="close" size={20} /></button></div>}
            {provider === 'OIDC' ? <div className="team-mapping-table">
              <div className="team-filter"><Icon name="filter" size={24} /><input aria-label="Filter by Dev Portal team name" onChange={(event) => setTeamFilter(event.target.value)} placeholder="Filter by Dev Portal team name" value={teamFilter} /></div>
              <div className="team-table-header"><span>Team</span><span>Identity provider groups</span></div>
              <div className="team-table-rows">
                {filteredTeams.map((team) => <div className="team-table-row" key={team.name}>
                  <div><strong>{team.name}</strong>{team.description && <p title={team.description}>{team.description}</p>}</div>
                  {mappedGroups[team.name]?.length ? <div className="mapped-group-cell">
                    <div className="mapped-group-list">{mappedGroups[team.name].map((group) => <span key={group}>{group}</span>)}</div>
                    <div className="team-actions-menu">
                      <button aria-expanded={teamActionsOpen === team.name} aria-label={`Actions for ${team.name}`} className="team-more-button" onClick={() => setTeamActionsOpen((open) => open === team.name ? null : team.name)} type="button"><Icon name="more" size={20} /></button>
                      {teamActionsOpen === team.name && <div className="team-actions-dropdown">
                        <button onClick={() => { openMapGroups(team); setTeamActionsOpen(null) }} type="button">Edit mapping</button>
                        <button className="clear-mapping-menu-item" onClick={() => { setClearMappingTeam(team); setTeamActionsOpen(null) }} type="button">Clear mapping</button>
                      </div>}
                    </div>
                  </div> : <button className="tertiary-button" onClick={() => openMapGroups(team)} type="button">Map groups</button>}
                </div>)}
              </div>
            </div> : <div className="setup-card">
              <h3>{provider ? `${provider} identity provider` : 'Set up an identity provider'}</h3>
              <p>{provider ? 'Identity provider configuration is ready for team mapping.' : 'Configure an OIDC or SAML provider to enable team mapping.'}</p>
              <div className="provider-control">
                <button onClick={() => setProviderOpen(!providerOpen)}>{provider ? `Configure ${provider}` : 'Configure an identity provider'} <Icon className={providerOpen ? 'chevron-open' : ''} name="chevron" size={20} /></button>
                {providerOpen && <div className="provider-menu"><button onClick={() => { setProviderToConfigure('OIDC'); setProviderOpen(false); openOidcSlideout() }}>OIDC</button><button onClick={() => { setProviderToConfigure('SAML'); setProviderOpen(false); openOidcSlideout() }}>SAML</button></div>}
              </div>
            </div>}
            {provider === 'OIDC' && <div className="team-pagination"><span><strong>1 to {filteredTeams.length}</strong> of {filteredTeams.length}</span><div className="page-controls"><button disabled>←</button><button className="current-page">1</button><button disabled>→</button></div><button className="page-size">15 items per page <Icon name="chevron" size={20} /></button></div>}
          </div>
        </section>
        </>}
      </div>
    </main>
    {oidcSlideoutOpen && <div className="slideout-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closeOidcSlideout() }}>
      {providerToConfigure === 'OIDC' && !oidcSlideoutClosing && <button className="autofill-button" onClick={autofillOidc} type="button">Autofill</button>}
      <aside className={`oidc-slideout ${oidcSlideoutClosing ? 'oidc-slideout--closing' : ''}`} aria-labelledby="oidc-slideout-title" aria-modal="true" onAnimationEnd={(event) => { if (event.target === event.currentTarget && oidcSlideoutClosing) { setOidcSlideoutOpen(false); setOidcSlideoutClosing(false) } }} role="dialog">
        <header className="slideout-header"><h2 id="oidc-slideout-title">{providerToConfigure === 'OIDC' ? 'Configure OAuth2.0 and OpenID Connect' : 'Configure SAML'}</h2><button aria-label="Close slideout" className="slideout-close" onClick={closeOidcSlideout}><Icon name="close" size={24} /></button></header>
        <div className="slideout-body">
          <p className="slideout-intro">Manage the identity provider used for authenticating users with {providerToConfigure}. <a href="#oidc-documentation" onClick={(event) => event.preventDefault()}>Learn more <Icon name="external" size={18} /></a></p>
          {providerToConfigure === 'OIDC' ? <><label className="slideout-field required"><span>Issuer URI</span><input value={oidcForm.issuerUri} onChange={(event) => updateOidcField('issuerUri', event.target.value)} placeholder="https://dev-123456789.okta.com/oauth2/default" /><small>Enter the base URL for your OIDC authorization server.</small></label>
          <label className="slideout-field required"><span>Client ID</span><input value={oidcForm.clientId} onChange={(event) => updateOidcField('clientId', event.target.value)} placeholder="0oa123exampleABC456" /><small>Use the client ID issued for this application by your identity provider.</small></label>
          <label className="slideout-field required"><span>Client secret</span><input type="password" value={oidcForm.clientSecret} onChange={(event) => updateOidcField('clientSecret', event.target.value)} placeholder="Enter client secret" /><small>Use the client secret associated with this OIDC application.</small></label>
          <label className="slideout-field required"><span>Organization login path</span><input value={oidcForm.organizationLoginPath} onChange={(event) => updateOidcField('organizationLoginPath', event.target.value)} placeholder="kong-air" /><small>The path users visit to sign in to this organization.</small></label>
          <section className="advanced-settings">
            <button aria-expanded={advancedOpen} className="advanced-toggle" onClick={() => setAdvancedOpen(!advancedOpen)}><span>Advanced settings</span><Icon className={advancedOpen ? 'chevron-open' : ''} name="chevron" size={20} /></button>
            {advancedOpen && <div className="advanced-content">
              <label className="slideout-field"><span>Scopes <Icon name="info" size={18} /></span><select value={oidcForm.scopes} onChange={(event) => updateOidcField('scopes', event.target.value)}><option value="">Select scopes</option><option value="openid">openid</option><option value="email">email</option><option value="profile">profile</option></select></label>
              <div className="claim-mappings"><span>Claim mappings <Icon name="info" size={18} /></span><div className="claim-fields"><label className="slideout-field"><span>Name</span><input value={oidcForm.nameClaim} onChange={(event) => updateOidcField('nameClaim', event.target.value)} /></label><label className="slideout-field"><span>Email</span><input value={oidcForm.emailClaim} onChange={(event) => updateOidcField('emailClaim', event.target.value)} /></label><label className="slideout-field"><span>Groups</span><input value={oidcForm.groupsClaim} onChange={(event) => updateOidcField('groupsClaim', event.target.value)} /></label></div></div>
            </div>}
          </section></> : <p className="slideout-intro">SAML configuration will be available in this slideout.</p>}
        </div>
        <footer className="slideout-footer">{providerToConfigure === 'OIDC' && <button className="slideout-save" disabled={!oidcReady} onClick={saveOidc}>Save</button>}<button className="slideout-cancel" onClick={closeOidcSlideout}>Cancel</button></footer>
      </aside>
    </div>}
    {mapGroupsTeam && <div className="modal-overlay">
      <section aria-labelledby="map-groups-title" aria-modal="true" className="map-groups-modal" role="dialog">
        <header className="map-groups-header"><h2 id="map-groups-title">Map groups</h2><button aria-label="Close map groups" className="map-groups-close" onClick={() => setMapGroupsTeam(null)}><Icon name="close" size={20} /></button></header>
        <div className="map-groups-body">
          <p>Map your identity provider groups to <strong>{mapGroupsTeam.name}</strong></p>
          <div className="map-groups-field">
            <span id="identity-provider-group-label">Identity provider group name(s)</span>
            <div className="group-picker" ref={groupPickerRef}>
              <div
                aria-expanded={groupPickerOpen}
                aria-labelledby="identity-provider-group-label"
                className="group-multiselect"
                onClick={(event) => {
                  if (!event.target.closest('.selected-group-chip button, .group-picker-toggle')) openGroupPicker()
                }}
                role="combobox"
              >
                {selectedGroups.map((group) => <span className="selected-group-chip" key={group}>{group}<button aria-label={`Remove ${group}`} onClick={(event) => { event.stopPropagation(); setSelectedGroups((groups) => groups.filter((item) => item !== group)) }} type="button"><Icon name="close" size={16} /></button></span>)}
                <input
                  aria-label="Filter or enter an identity provider group"
                  className="group-search"
                  onChange={(event) => setGroupQuery(event.target.value)}
                  onFocus={openGroupPicker}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && groupQuery.trim()) {
                      event.preventDefault()
                      addGroup(groupQuery)
                    }
                    if (event.key === 'Escape') setGroupPickerOpen(false)
                  }}
                  placeholder={selectedGroups.length === 0 ? 'Enter or select a group' : ''}
                  ref={groupInputRef}
                  value={groupQuery}
                />
                <button aria-label="Select an identity provider group" className="group-picker-toggle" onClick={(event) => { event.stopPropagation(); toggleGroupPicker() }} type="button"><Icon className={groupPickerOpen ? 'chevron-open' : ''} name="chevron" size={20} /></button>
              </div>
              {groupPickerOpen && <div className="group-options">
                {availableGroups.filter((group) => group.toLowerCase().includes(groupQuery.toLowerCase())).map((group) => <button key={group} onClick={() => addGroup(group)} type="button">{group}</button>)}
                {groupQuery.trim() && !availableGroups.includes(groupQuery.trim()) ? <button onClick={() => addGroup(groupQuery)} type="button">{groupQuery.trim()} (Add new value)</button> : availableGroups.length === 0 && <p className="group-empty">No values found. Enter a new value.</p>}
              </div>}
            </div>
            <small>Enter one or more group names as defined in your identity provider. These are typically sent in the group claim during SSO.</small>
          </div>
        </div>
        <footer className="map-groups-footer"><button className="map-groups-cancel" onClick={() => setMapGroupsTeam(null)} type="button">Cancel</button><button className="map-groups-save" disabled={selectedGroups.length === 0} onClick={saveGroups} type="button">Save</button></footer>
      </section>
    </div>}
    {clearMappingTeam && <div className="modal-overlay">
      <section aria-labelledby="clear-mapping-title" aria-modal="true" className="map-groups-modal clear-mapping-modal" role="dialog">
        <header className="map-groups-header"><h2 id="clear-mapping-title">Clear mapping?</h2><button aria-label="Close clear mapping" className="map-groups-close" onClick={() => setClearMappingTeam(null)}><Icon name="close" size={20} /></button></header>
        <div className="map-groups-body"><p className="clear-mapping-message">Clearing this team’s mapping will remove all associated identity provider groups, unlinking the team from your identity provider.</p>{isLastTeamMapping && <div className="clear-mapping-alert" role="alert"><Icon name="warning" size={20} /><span>Identity provider mapping will be turned off because at least one team must be mapped to keep it enabled.</span></div>}</div>
        <footer className="map-groups-footer"><button className="map-groups-cancel" onClick={() => setClearMappingTeam(null)} type="button">Cancel</button><button className="clear-mapping-button" onClick={() => { clearMapping(clearMappingTeam.name); setClearMappingTeam(null) }} type="button">Clear mapping</button></footer>
      </section>
    </div>}
    {toast.visible && <div className="success-toast" role="status"><span className="success-toast-icon"><Icon name="checkCircle" size={24} /></span><span>{toast.message}</span><button aria-label="Dismiss notification" onClick={() => setToast((currentToast) => ({ ...currentToast, visible: false }))} type="button"><Icon name="close" size={20} /></button></div>}
    <div className="desktop-layout-overlay" role="alert"><div><h2>Desktop layout required</h2><p>This prototype is designed for desktop screens. Resize your window to at least 700px wide to view the layout; it is not optimized or intended for mobile.</p></div></div>
  </div>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
