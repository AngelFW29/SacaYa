import { useState } from "react";
import { X, ChevronDown, Truck, Bell, Map } from "lucide-react";
import faqData from "../data/faq.json";

const ICONOS_PROXIMAMENTE = { Truck, Bell, Map };

function AcordeonItem({ pregunta, respuesta }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center justify-between gap-3 py-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="text-sm font-semibold text-text">{pregunta}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-text-soft shrink-0 transition-transform ${abierto ? "rotate-180" : ""}`}
        />
      </button>
      {abierto && (
        <p className="text-sm text-text-soft pb-3.5 pr-6 leading-relaxed">
          {respuesta}
        </p>
      )}
    </div>
  );
}

function FaqModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface-alt w-full sm:max-w-xl md:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[80vh] sm:max-h-[75vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-surface-alt flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="font-display text-lg font-semibold text-green-deep">
            Ayuda y preguntas frecuentes
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-bg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
          >
            <X size={16} strokeWidth={2} className="text-text-soft" />
          </button>
        </div>

        <div className="px-6 py-2">
          {faqData.preguntas.map((item, i) => (
            <AcordeonItem key={i} {...item} />
          ))}
        </div>

        <div className="px-6 py-5 border-t border-line">
          <span className="text-xs font-bold uppercase tracking-wide text-text-soft">
            Próximamente
          </span>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {faqData.proximamente.map(({ icono, titulo, descripcion }, i) => {
              const Icono = ICONOS_PROXIMAMENTE[icono];
              return (
                <div
                  key={i}
                  className="flex sm:flex-col items-start gap-3 sm:gap-2"
                >
                  <div className="w-9 h-9 rounded-lg bg-green-pale flex items-center justify-center shrink-0">
                    <Icono
                      size={16}
                      strokeWidth={1.8}
                      className="text-green-deep"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text">
                      {titulo}
                    </div>
                    <div className="text-xs text-text-soft mt-0.5">
                      {descripcion}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-4 bg-bg text-center">
          <p className="text-xs text-text-faint">
            SacaYa es un prototipo desarrollado con fines académicos para la
            asignatura de Diseño centrado en el usuario .
          </p>
        </div>
      </div>
    </div>
  );
}

export default FaqModal;
