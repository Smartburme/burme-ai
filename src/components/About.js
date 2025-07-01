export default function About({ setScreen }) {
  return (
    <section className="flex flex-col items-center justify-center bg-[#1e293b] rounded-md w-full h-screen md:w-[280px] md:h-[520px] text-center text-white text-xs px-6">
      <img alt="Logo" className="mb-6" height="40" src="/assets/logo-dark.png" width="40"/>
      <h2 className="font-semibold text-white text-sm mb-2">Burma AI - Chat Bot</h2>
      <p className="mb-6">Version 1.0.0</p>
      <p className="mb-6 text-[10px] leading-tight">
        Burma AI is a powerful assistant designed to help you with writing,
        planning, learning, and creative tasks. Powered by Google's Gemini models,
        it brings state-of-the-art AI to your fingertips.
      </p>
      <p className="mb-1 text-[9px] text-gray-400">Admin: Aung Myo Kyaw</p>
      <p className="mb-6 text-[9px] text-gray-400">
        Contact:{' '}
        <a className="text-pink-600 underline" href="mailto:aung.thuyrain.a449@gmail.com">
          aung.thuyrain.a449@gmail.com
        </a>
      </p>
      <p className="text-[9px] text-gray-400">
        Made with <span className="text-pink-600">❤️</span> and React.
      </p>
      <button 
        onClick={() => setScreen('sidebar')}
        className="mt-6 text-pink-600 text-xs"
      >
        Back to Home
      </button>
    </section>
  );
}
