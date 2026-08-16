function EstadoVacioSector({ mensaje }) {
  return (
    <div className="bg-surface-alt border border-line rounded-3xl p-10 text-center max-w-md">
      <p className="font-display text-lg font-semibold text-green-deep mb-2">
        ¿Dónde te encuentras?
      </p>
      <p className="text-sm text-text-soft">{mensaje}</p>
    </div>
  );
}

export default EstadoVacioSector;
