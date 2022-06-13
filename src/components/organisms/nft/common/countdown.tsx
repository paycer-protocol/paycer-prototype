export function Countdown({ timeLeft }: { timeLeft: number }) {
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const days = Math.floor((timeLeft / 1000 / 60 / 60 / 24));

  return (
    <div className="row d-flex align-items-center justify-content-between">
      <div className="col-4 col-md-3 position-relative">
        <div className="card mb-0 p-3 bg-dark text-center">
          <span className="fw-bold p-1" style={{ fontSize: '22px' }}>{days}D</span>
        </div>
        <div className="d-md-none position-absolute" style={{ right: '-11px', top: '20px' }}>
          <span className="display-4 mx-2">:</span>
        </div>
      </div>

      <div className="col-1 d-none d-md-block">
        <span className="display-4 mx-2">:</span>
      </div>
      <div className="col-4 col-md-3 position-relative">
        <div className="card mb-0 p-3 bg-dark text-center">
          <span className="fw-bold p-1" style={{ fontSize: '22px' }}>{hours}H</span>
        </div>
        <div className="d-md-none position-absolute" style={{ right: '-11px', top: '20px' }}>
          <span className="display-4 mx-2">:</span>
        </div>
      </div>
      <div className="col-1 d-none d-md-block">
        <span className="display-4 mx-2">:</span>
      </div>
      <div className="col-4 col-md-3">
        <div className="card mb-0 p-3 bg-dark text-center">
          <span className="fw-bold p-1" style={{ fontSize: '22px' }}>{minutes}M</span>
        </div>
      </div>
    </div>
  );
}
