import React from 'react';
// import './Stepper.css';
import { CircleCheckBig } from 'lucide-react';

const Stepper = ({ currentStep }) => {
  const steps = ['Informasi', 'Pembayaran', 'Selesai'];

  return (
    <div className="card-stepper">
      <div className="stepper">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isDone = stepNum < currentStep;

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: i < steps.length - 1 ? 1 : 0,
              }}
            >
              <div className="step">
                <div
                  className={`step-circle ${isActive ? 'active' : isDone ? 'done' : ''}`}
                >
                  {isDone ? <CircleCheckBig /> : stepNum}
                </div>
                <span className={`step-label ${isActive ? 'active' : ''}`}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`step-line ${isDone ? 'done' : ''}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
