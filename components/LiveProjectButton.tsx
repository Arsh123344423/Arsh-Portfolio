import BorderGlow from './BorderGlow';

export default function LiveProjectButton() {
  return (
    <button
      className="
        min-w-[220px]
        min-h-[60px]
        rounded-full
        border-2 border-[#D7E2EA]
        text-[#D7E2EA]
        bg-transparent
        font-medium
        uppercase
        tracking-widest
        px-8 py-3 sm:px-10 sm:py-3.5
        text-sm sm:text-base
        transition-all duration-200
        cursor-pointer
        scale-95

        hover:scale-95
        hover:bg-[#D7E2EA]
        hover:text-[#000000]
        hover:border-[#D7E2EA]
        active:scale-90
        active:bg-[#D7E2EA]
        active:text-[#000000]
      "
    >
      Live Project
    </button>
  );
}