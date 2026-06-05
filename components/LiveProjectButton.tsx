import BorderGlow from './BorderGlow';

export default function LiveProjectButton() {
  return (
    <div className="p-20 mr-10 md:mr-20 bg-dark rounded-[40px] sm:rounded-[50px] md:rounded-[60px] px-10 py-12 flex items-center justify-center">
      <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="transparent"
        borderRadius={9999}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={['#c084fc', '#f472b6', '#38bdf8']}
        
      >
        <button
          className="
            min-w-[220px]
            min-h-[60px]
            rounded-full
            border-2 border-[#D7E2EA]
            text-[#D7E2EA]
            font-medium
            uppercase
            tracking-widest
            pr-10
            px-8 py-3 sm:px-10 sm:py-3.5
            text-sm sm:text-base
            hover:bg-[#D7E2EA]/10
            transition-all duration-300
            active:scale-95
            cursor-pointer
          "
        >
          Live Project
        </button>
      </BorderGlow>
    </div>
  );
}