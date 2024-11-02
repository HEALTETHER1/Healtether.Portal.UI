// import React from 'react'
// export default function Toast() {
//   return (
//     <div>
//       <Toaster  position="bottom-right"
//   reverseOrder={false}
//   toastOptions={{
//     // Define default options
//     className: '',
//     duration: 6000,
//     style: {
//       background: '#f7f4fa',
//       color: 'black',
//     }
//   }}>
//   {(t) => (
//     <ToastBar toast={t} >
//       {({ icon, message }) => (
//         <>
//           {icon}
//           {message}
//           {t.type !== 'loading' && (
//             <button onClick={() => toast.dismiss(t.id)} ><span className='icon-[icon-park-outline--preview-close-one] text-lg'></span></button>
//           )}
//         </>
//       )}
//     </ToastBar>
//   )}
// </Toaster>
//     </div>
//   )
// }