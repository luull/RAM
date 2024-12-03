import { prefix } from "@/utils/prefix";
import Image from "next/image";

export interface PaymentMethod {
  name: string;
  type: string;
  icon: JSX.Element;
}

export const paymentMethods: PaymentMethod[] = [
    { name: "Bank BRI", type: "Bank", icon: <Image width={50} height={50} src={`${prefix}/images/payment/bri.png`} alt="BRI Icon" /> },
    { name: "Bank BCA", type: "Bank", icon: <Image width={50} height={50} src={`${prefix}/images/payment/bca.png`} alt="BCA Icon" /> },
    { name: "Bank Mandiri", type: "Bank", icon: <Image width={50} height={50} src={`${prefix}/images/payment/mandiri.png`} alt="Mandiri Icon" /> },
    { name: "Gopay", type: "E-Wallet", icon: <Image width={50} height={50} src={`${prefix}/images/payment/gopay.png`} alt="Gopay Icon" /> },
    { name: "OVO", type: "E-Wallet", icon: <Image width={50} height={50} src={`${prefix}/images/payment/ovo.png`} alt="OVO Icon" /> },
    { name: "DANA", type: "E-Wallet", icon: <Image width={50} height={50} src={`${prefix}/images/payment/dana.png`} alt="DANA Icon" /> },
    { name: "ShopeePay", type: "E-Wallet", icon: <Image width={50} height={50} src={`${prefix}/images/payment/shopeepay.png`} alt="ShopeePay Icon" /> },
  ];
export const paymentMethodsSummary: PaymentMethod[] = [
    { name: "Bank BRI", type: "Bank", icon: <Image width={180} height={180} src={`${prefix}/images/payment/bri.png`} alt="BRI Icon" className="text-center" /> },
    { name: "Bank BCA", type: "Bank", icon: <Image width={180} height={180} src={`${prefix}/images/payment/bca.png`} alt="BCA Icon" className="text-center" /> },
    { name: "Bank Mandiri", type: "Bank", icon: <Image width={180} height={180} src={`${prefix}/images/payment/mandiri.png`} alt="Mandiri Icon" className="text-center" /> },
    { name: "Gopay", type: "E-Wallet", icon: <Image width={180} height={180} src={`${prefix}/images/payment/gopay.png`} alt="Gopay Icon" className="text-center" /> },
    { name: "OVO", type: "E-Wallet", icon: <Image width={180} height={180} src={`${prefix}/images/payment/ovo.png`} alt="OVO Icon" className="text-center" /> },
    { name: "DANA", type: "E-Wallet", icon: <Image width={180} height={180} src={`${prefix}/images/payment/dana.png`} alt="DANA Icon" className="text-center" /> },
    { name: "ShopeePay", type: "E-Wallet", icon: <Image width={180} height={180} src={`${prefix}/images/payment/shopeepay.png`} alt="ShopeePay Icon" className="text-center" /> },
  ];