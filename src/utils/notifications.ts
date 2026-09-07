import Swal from 'sweetalert2';

export const toast = {
    success: (title: string) => {
        Swal.fire({
            title,
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
        });
    },
    error: (title: string) => {
        Swal.fire({
            title,
            text: 'Kuch masla ho gaya hai!',
            icon: 'error',
            confirmButtonColor: '#3b82f6',
            background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
        });
    }
};