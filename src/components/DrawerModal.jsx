import { useRef, useState } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  type = "center",
}) {
  const drawerRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  const startX = useRef(0);
  const isDragging = useRef(false);

  if (!isOpen) return null;

  // START SWIPE
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  // MOVE SWIPE
  const handleTouchMove = (e) => {
    if (!isDragging.current || type !== "right") return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;

    // only allow dragging right drawer to right (closing direction)
    if (diff > 0) {
      setTranslateX(diff);
    }
  };

  // END SWIPE
  const handleTouchEnd = () => {
    isDragging.current = false;

    // threshold to close
    if (translateX > 100) {
      onClose();
    }

    setTranslateX(0);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100"
      style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
      onClick={onClose}
    >
      {/* RIGHT DRAWER */}
      {type === "right" && (
        <div
          ref={drawerRef}
          className="position-absolute top-0 end-0 h-100 bg-white shadow-lg p-3"
          style={{
            width: "280px",
            transform: `translateX(${translateX}px)`,
            transition: isDragging.current ? "none" : "transform 0.2s ease",
          }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <h6 className="mb-3">{title}</h6>
          {children}
        </div>
      )}
    </div>
  );
}


// use in another page
// <Modal
//   isOpen={isMenuOpen}
//   onClose={() => setIsMenuOpen(false)}
//   title="Menu"
//   type="right"
// >
//   <div className="d-grid gap-2">
//     <button className="btn btn-outline-secondary">Login</button>
//     <button className="btn btn-primary">Sign Up</button>
//     <button
//       className="btn btn-primary"
//       onClick={() => navigate("/dashboard")}
//     >
//       Dashboard
//     </button>
//   </div>
// </Modal>