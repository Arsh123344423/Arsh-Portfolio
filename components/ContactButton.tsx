export default function ContactButton() {
  return (
    <button
      type="button"
      className="rounded-full font-medium uppercase tracking-widest text-white
        px-[28px] py-[16px] sm:px-[34px] sm:py-[18px] md:px-[40px] md:py-[20px]
        min-w-[170px] sm:min-w-[210px] text-sm sm:text-base md:text-lg
        cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.03]"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  );
}
