"use client";

import { MouseEventHandler } from "react";
import Image from "next/image";

type ButtonProps = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  submitting?: boolean;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
}

const Button = (props: ButtonProps) => {
  const {
    title, leftIcon, rightIcon, handleClick,
    submitting, type, bgColor, textColor
  } = props;

  return (
    <button
      type={type || "button"}
      disabled={submitting}
      onClick={handleClick}
      className={`
        flexCenter gap-3 px-4 py-3
        ${textColor ? textColor : 'text-white'} 
        ${submitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full
      `}
    >
      {
        leftIcon ? (
          <Image
            src={leftIcon}
            width={14}
            height={14}
            alt="left icon"
          />
        ) : undefined
      }
      {title}
      {
        rightIcon ? (
          <Image
            src={rightIcon}
            width={14}
            height={14}
            alt="right icon"
          />
        ) : undefined
      }
    </button>
  )
}

export default Button

