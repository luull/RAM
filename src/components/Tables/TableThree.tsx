'use client'
import useLocalStorage from "@/hooks/useLocalStorage";
import { Package } from "@/types/package";
import { ProductCart, TransactionType } from "@/types/products";
import Swal from "sweetalert2";

const TableThree = () => {
  const [user, setUser] = useLocalStorage<any>("user", "");
  const [dataTransaction, setDataTransaction] = useLocalStorage<TransactionType[]>("transaction", []);
  const today = new Date();
  const transactionDate = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const handleReject = (id:string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to reject this transaction.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = dataTransaction.map((item) => {
          if (item.idTrx === id) {
            return {
              ...item,
              status: "Gagal",
            };
          }
          return item;
        });
        setDataTransaction(updatedData);
        Swal.fire('Rejected!', 'The transaction has been rejected.', 'success');
      }
    });
  };
  
  const handleApprove = (id:string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to approve this transaction.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = dataTransaction.map((item) => {
          if (item.idTrx === id) {
            return {
              ...item,
              status: "Berhasil",
            };
          }
          return item;
        });
        
        setDataTransaction(updatedData);
        Swal.fire('Approved!', 'The transaction has been approved.', 'success');
      }
    });
  };
  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
          <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
            <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
              Produk
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-center text-dark dark:text-white">
              Username
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-center text-dark dark:text-white">
              Total Harga
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-center text-dark dark:text-white">
              Tgl Transaksi
            </th>
            <th className="min-w-[120px] px-4 py-4 font-medium text-center text-dark dark:text-white">
              Status
            </th>
            {user.role === "admin" && (
              <th className="min-w-[120px] px-4 py-4 font-medium text-center text-dark dark:text-white">
                Action
              </th>
            )}
          </tr>

          </thead>
          <tbody>
          {dataTransaction.map((item:any, index: number) => {
              const totalTransaction = item.data.reduce(
                (total: number, s: { price: number; quantity: number }) => total + s.price * s.quantity,
                0
              );
            return(
              
              <tr key={index}>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}
                  >
                    {item.data.map((items:any)=> (

                    <h5 className="text-dark dark:text-white">
                      {items.name} - {items.packaging} ({items.quantity})
                    </h5>
                  ) )}
                 
                </td>
                <td
                  className={`border-[#eee] text-center px-4 py-4 dark:border-dark-3 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                      {item.usernameData}
                  </p>
                </td>
                <td
                  className={`border-[#eee] text-center px-4 py-4 dark:border-dark-3 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalTransaction)}
                  </p>
                </td>
                <td
                  className={`border-[#eee] text-center px-4 py-4 dark:border-dark-3 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {transactionDate}
                  </p>
                </td>
                <td
                  className={`border-[#eee] text-center px-4 py-4 dark:border-dark-3 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p
                    className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                      item.status === "Berhasil"
                        ? "bg-[#219653]/[0.08] text-[#219653]"
                        : item.status === "Gagal"
                          ? "bg-[#D34053]/[0.08] text-[#D34053]"
                          : "bg-[#FFA70B]/[0.08] text-[#FFA70B]"
                    }`}
                  >
                    {item.status}
                  </p>
                </td>
                {user.role === "admin" && item.status !== "Berhasil" && item.status !== "Gagal" && (
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <div className="flex items-center justify-end space-x-3.5">
                    <button onClick={()=>handleReject(item.idTrx)} className="text-red hover:text-red">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    </button>
                    <button onClick={()=>handleApprove(item.idTrx)} className="text-green hover:text-green">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    </button>
                    {/* <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4613 13.7551C10.3429 13.8846 10.1755 13.9583 10 13.9583C9.82453 13.9583 9.65714 13.8846 9.53873 13.7551L6.2054 10.1092C5.97248 9.85448 5.99019 9.45915 6.24494 9.22623C6.49969 8.99332 6.89502 9.01102 7.12794 9.26577L9.375 11.7235V2.5C9.375 2.15482 9.65482 1.875 10 1.875C10.3452 1.875 10.625 2.15482 10.625 2.5V11.7235L12.8721 9.26577C13.105 9.01102 13.5003 8.99332 13.7551 9.22623C14.0098 9.45915 14.0275 9.85448 13.7946 10.1092L10.4613 13.7551Z"
                          fill=""
                        />
                        <path
                          d="M3.125 12.5C3.125 12.1548 2.84518 11.875 2.5 11.875C2.15482 11.875 1.875 12.1548 1.875 12.5V12.5457C1.87498 13.6854 1.87497 14.604 1.9721 15.3265C2.07295 16.0765 2.2887 16.7081 2.79029 17.2097C3.29189 17.7113 3.92345 17.927 4.67354 18.0279C5.39602 18.125 6.31462 18.125 7.45428 18.125H12.5457C13.6854 18.125 14.604 18.125 15.3265 18.0279C16.0766 17.927 16.7081 17.7113 17.2097 17.2097C17.7113 16.7081 17.9271 16.0765 18.0279 15.3265C18.125 14.604 18.125 13.6854 18.125 12.5457V12.5C18.125 12.1548 17.8452 11.875 17.5 11.875C17.1548 11.875 16.875 12.1548 16.875 12.5C16.875 13.6962 16.8737 14.5304 16.789 15.1599C16.7068 15.7714 16.5565 16.0952 16.3258 16.3258C16.0952 16.5565 15.7714 16.7068 15.1599 16.789C14.5304 16.8737 13.6962 16.875 12.5 16.875H7.5C6.30382 16.875 5.46956 16.8737 4.8401 16.789C4.22862 16.7068 3.90481 16.5565 3.67418 16.3258C3.44354 16.0952 3.29317 15.7714 3.21096 15.1599C3.12633 14.5304 3.125 13.6962 3.125 12.5Z"
                          fill=""
                        />
                      </svg>
                    </button> */}
                  </div>
                </td>
                )}
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
