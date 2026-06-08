import BorderGlow from './BorderGlow';
import { useRouter } from 'next/navigation';

export default function ContactButton() {
  const router = useRouter();
  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="#120F17"
      borderRadius={9999}
      glowRadius={60}
      glowIntensity={2}
      coneSpread={25}
      animated={false}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
    >
      <button
        type="button"
        className="rounded-full font-medium uppercase tracking-widest text-white
          px-[28px] py-[16px] sm:px-[34px] sm:py-[18px] md:px-[40px] mr-10 md:py-[20px]
          min-w-[170px] sm:min-w-[210px] text-sm sm:text-base md:text-lg
          cursor-pointer transition-colors duration-200 ease-out"
        style={{
          outline: '2px solid white',
          outlineOffset: '-3px',
        }}
        onClick={() => {
          router.push('/contact');
        }}
      >
        Contact Me
      </button>
    </BorderGlow>
  );
}
