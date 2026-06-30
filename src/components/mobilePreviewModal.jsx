import ShortPreview from "./shortPreview";

export default function MobilePreviewModal({ invoice, onClose, onUpdate }) {
  if (!invoice) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        padding: "12px",
      }}
    >
      {/* MODAL CARD */}
      <div
        className="bg-white rounded-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "520px",
          maxHeight: "92vh",
          overflowY: "auto",
          animation: "slideUp 0.2s ease-out",
        }}
      >
      <div
  className="bg-white rounded-4 shadow-lg position-relative"
  style={{
    width: "100%",
    maxWidth: "520px",
    maxHeight: "92vh",
    overflowY: "auto",
    animation: "slideUp 0.2s ease-out",
  }}
>
  <button
    className="btn-close position-absolute"
    style={{
      top: "16px",
      right: "16px",
      zIndex: 1,
    }}
    onClick={onClose}
    aria-label="Close"
  />

        {/* BODY */}
        <div className="pt-5 px-2">
          <ShortPreview invoice={invoice} onUpdate={onUpdate} />
        </div>
      </div>
</div>
      {/* ANIMATION */}
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
