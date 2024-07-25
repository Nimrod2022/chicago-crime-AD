
const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid #ffffff;
          border-top: 8px solid #7879f1;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <p className="pt-3 italic">Hang tight! We&apos;re getting things ready...</p>
    </div>
  );
};

export default Spinner;
