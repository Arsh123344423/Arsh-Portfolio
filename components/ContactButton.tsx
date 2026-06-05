export default function ContactButton() {
  return (
    <button
      type="button"
      className="rounded-full font-medium uppercase tracking-widest text-white
        px-[28px] py-[16px] sm:px-[34px] sm:py-[18px] md:px-[40px] md:py-[20px]
        min-w-[170px] sm:min-w-[210px] text-sm sm:text-base md:text-lg
        cursor-pointer transition-all duration-300 ease-out hover:scale-[1.05] hover:shadow-lg active:scale-[0.98]"
      style={{
        background: 'linear-gradient(135deg, #7621B0 0%, #B600A8 50%, #BE4C00 100%)',
        boxShadow: '0px 8px 24px rgba(182, 0, 168, 0.35), inset 1px 1px 0px rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      Contact Me
    </button>
  );
}
