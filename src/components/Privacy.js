export default function Privacy({ setScreen }) {
  return (
    <section className="flex flex-col bg-[#1e293b] rounded-md w-full h-screen md:w-[280px] md:h-[520px] text-white text-xs p-6 overflow-y-auto">
      <header className="flex items-center gap-2 mb-4">
        <button 
          onClick={() => setScreen('sidebar')}
          className="text-gray-400"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h3 className="font-semibold">Privacy & Terms</h3>
      </header>
      
      <article>
        <h4 className="font-semibold mb-2">Privacy Policy</h4>
        <p className="mb-3 text-gray-400 leading-tight">
          This is a placeholder for your privacy policy. It's where you'll explain
          what information you collect from users, how you use it, and with whom you
          share it.
        </p>
        <p className="mb-6 text-gray-400 leading-tight">
          Key points to cover include: data collection (e.g., email, usage data),
          data usage (e.g., to improve the service), data sharing (e.g., with
          third-party services), and user rights (e.g., accessing or deleting their
          data).
        </p>
        
        <h4 className="font-semibold mb-2">Terms of Service</h4>
        <p className="mb-3 text-gray-400 leading-tight">
          This is a placeholder for your terms of service. This agreement sets the
          rules for using your app. It should cover user responsibilities, acceptable
          use, intellectual property rights, and limitations of liability.
        </p>
        <p className="text-gray-400 leading-tight">
          It's important to have clear terms to protect both you and your users.
        </p>
        <p className="mt-6 text-gray-400 leading-tight">
          Please replace this placeholder text with your actual legal documents.
        </p>
      </article>
    </section>
  );
            }
