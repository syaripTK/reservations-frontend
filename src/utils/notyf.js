import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Swal from 'sweetalert2';

const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'right',
    y: 'bottom',
  },
  types: [
    {
      type: 'success',
      background: '#0f172a',
      className: 'notyf-custom-success',
      icon: false,
    },
    {
      type: 'error',
      background: '#0f172a',
      className: 'notyf-custom-error',
      icon: false,
    },
  ],
});

const notyfSuccess = (message) => {
  notyf.success({
    message: `<b style="letter-spacing: 1px">SUCCESS:</b> ${message}`,
  });
};

const notyfError = (message) => {
  notyf.error({
    message: `<b style="letter-spacing: 1px">ERROR:</b> ${message}`,
  });
};

const showSuccessNotification = (message) => {
  Swal.fire({
    title: 'BERHASIL!',
    text: message,
    icon: 'success',
    iconColor: '#10b981',
    background: '#1a1a1a',
    color: '#f8fafc',
    timer: 2500,
    showConfirmButton: false,
    customClass: {
      popup: 'swal-cinematic-popup',
    },
    showClass: {
      popup: 'animate__animated animate__fadeInDown animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp animate__faster',
    },
  });
};

const showErrorNotification = (message = 'Terjadi kesalahan pada server.') => {
  Swal.fire({
    title: `<span style="letter-spacing: 2px;">SYSTEM ERROR</span>`,
    html: `<div style="text-align: center; font-family: 'Courier New', Courier, monospace; color: #94a3b8;">
              ${message}
           </div>`,
    icon: 'error',
    iconColor: '#ef4444',
    color: '#f8fafc',
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      popup: 'swal-error-brutalist',
    },
    showClass: {
      popup: 'animate__animated animate__headShake',
    },
  });
};

export {
  notyfError,
  notyfSuccess,
  showSuccessNotification,
  showErrorNotification,
};
