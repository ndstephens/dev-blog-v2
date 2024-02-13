import styles from './NeonText.module.css';

export default function NeonText() {
  return (
    <p
      className={`!mt-12 !mb-24 rounded-lg bg-gray-900 py-8 px-12 text-center  !text-5xl !font-light italic tracking-tighter !text-white !transition-none will-change-[text-shadow] xs:!text-6xl sm:!text-7xl ${styles.neon}`}
    >
      Neon Text
    </p>
  );
}
