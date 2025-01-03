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
  const handleReject = (id: string) => {
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

  const handleApprove = (id: string) => {
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
            {dataTransaction.map((item: any, index: number) => {
              const totalTransaction = item.data.reduce(
                (total: number, s: { price: number; quantity: number }) => total + s.price * s.quantity,
                0
              );

              return (
                <tr key={item.idTrx}>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}>
                    {item.data.map((items: any) => (
                      <h5 key={items.name} className="text-dark dark:text-white">
                        {items.name} - {items.packaging} ({items.quantity})
                      </h5>
                    ))}
                  </td>
                  <td className={`border-[#eee] text-center px-4 py-4 dark:border-dark-3 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">
                      {item.usernameData}
                    </p>
                  </td>
                  <td className={`border-[#eee] text-center px-4 py-4 dark:border-dark-3 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalTransaction)}
                    </p>
                  </td>
                  <td className={`border-[#eee] text-center px-4 py-4 dark:border-dark-3 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">
                      {transactionDate}
                    </p>
                  </td>
                  <td className={`border-[#eee] text-center px-4 py-4 dark:border-dark-3 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                      item.status === "Berhasil"
                        ? "bg-[#219653]/[0.08] text-[#219653]"
                        : item.status === "Gagal"
                        ? "bg-[#D34053]/[0.08] text-[#D34053]"
                        : "bg-[#FFA70B]/[0.08] text-[#FFA70B]"
                    }`}>
                      {item.status}
                    </p>
                  </td>
                  {user.role === "admin" && item.status !== "Berhasil" && item.status !== "Gagal" && (
                    <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === dataTransaction.length - 1 ? "border-b-0" : "border-b"}`}>
                      <div className="flex items-center justify-end space-x-3.5">
                        <button onClick={() => handleReject(item.idTrx)} className="text-red hover:text-red">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </button>
                        <button onClick={() => handleApprove(item.idTrx)} className="text-green hover:text-green">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
