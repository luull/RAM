'use client'
import { prefix } from '@/utils/prefix';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { ArrowLongLeftIcon } from '@heroicons/react/16/solid';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
    const images = [
        `${prefix}/images/product/Oregano.jpg`,
        `${prefix}/images/product/Rosemary.jpg`,
        `${prefix}/images/product/Parsley.jpg`,
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrolling, setScrolling] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
            setMenuOpen(false)
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <Head>
                <title>RAM - Makan Lebih Dari Sekedar Makanan</title>
            </Head>

            <main className="bg-secondary min-h-screen">
                <nav className={`fixed top-0 left-0 right-0 py-4 px-8 flex justify-between items-center transition-all duration-300 z-50 ${scrolling ? 'bg-primary shadow-md' : 'bg-transparent'}`}>
                    <div className="text-2xl font-bold text-secondary"> 
                        <Image
                                     
                                      src={`${prefix}/images/logo/RAM-light.png`}
                                      alt="Logo"
                                      width={40}
                                      height={40}
                                    /></div>
                    <div className="md:hidden cursor-pointer text-white" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </div>
                    <ul className={`absolute md:relative py-5 px-5 top-full left-0 w-full md:w-auto md:flex md:py-2 items-center flex-col md:flex-row bg-primary md:bg-transparent transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'}`}>
                        <li className="md:ml-6"><Link to="hero" smooth duration={500} className="block py-4 px-6 md:p-0 text-white hover:text-secondary cursor-pointer">Beranda</Link></li>
                        <li className="md:ml-6"><Link to="about" smooth duration={500} className="block py-4 px-6 md:p-0 text-white hover:text-secondary cursor-pointer">Tentang Kami</Link></li>
                        <li className="md:ml-6"><Link to="clients" smooth duration={500} className="block py-4 px-6 md:p-0 text-white hover:text-secondary cursor-pointer">Client</Link></li>
                        <li className="md:ml-6"><Link to="contact" smooth duration={500} className="block py-4 px-6 md:p-0 text-white hover:text-secondary cursor-pointer">Kontak</Link></li>
                        <li className="md:ml-6"><a href="/auth/signin" className="block py-4 px-6 md:px-6 md:py-2 bg-secondary hover:bg-gray-400 text-white font-bold rounded-lg">Login</a></li>
                    </ul>
                </nav>

                <header id="hero" className="relative h-screen bg-cover bg-center text-white" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center px-6">
                        <h1 className="text-4xl md:text-6xl font-bold"> <Image
                            src={`${prefix}/images/logo/RAM-light-hor.png`}
                            alt="Logo"
                            width={300}
                            height={300}
                        /></h1>
                        <p className="text-lg md:text-xl mt-4">From Nature to Your Kitchen</p>
                        <a href='/auth/signup' className="mt-6 bg-primary hover:bg-secondary text-white font-bold py-2 px-6 items-center rounded-lg flex flex-row space-x-3 w-50"><span>Beli sekarang</span> <ArrowLongRightIcon className='w-10'/> </a>
                    </div>
                    <button onClick={prevSlide} className="absolute top-1/2 left-4 bg-black bg-opacity-50 text-white p-3 rounded-full">❮</button>
                    <button onClick={nextSlide} className="absolute top-1/2 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full">❯</button>
                </header>

                <section id="about" className="p-16 text-center bg-white">
  <h2 className="text-4xl font-bold text-primary">Tentang Kami</h2>
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="flex justify-center">
      <Image
        src={`${prefix}/images/team/team-01.png`}
        alt="Tentang Kami"
        width={400}
        height={300}
        className='object-cover'
      />
    </div>
    <div className="text-left mt-4 md:mt-0">
      <p className="text-gray-600">
        RAM adalah perusahaan yang berdedikasi untuk menghadirkan pengalaman kuliner yang luar biasa dengan menyediakan bumbu asli dan berkualitas tinggi. Sejak pertama kali berdiri, kami berkomitmen untuk memastikan bahwa setiap produk yang kami tawarkan tidak hanya memberikan rasa yang autentik, tetapi juga kualitas yang terbaik. Kami percaya bahwa bahan-bahan yang tepat adalah kunci untuk menciptakan hidangan yang lezat dan memuaskan, dan itulah mengapa kami memilih hanya yang terbaik dalam setiap langkah produksi.
      </p>
      <p className="mt-4 text-gray-600">
        <strong>Visi dan Misi Kami</strong><br />
        Visi kami adalah menjadi penyedia utama bumbu berkualitas tinggi yang dapat meningkatkan setiap pengalaman makan, baik di rumah maupun di restoran. Misi kami adalah untuk menjembatani tradisi kuliner dengan inovasi modern, membawa rasa asli dari berbagai penjuru dunia ke meja makan Anda.
      </p>
      <p className="mt-4 text-gray-600">
        <strong>Sejarah Kami</strong><br />
        RAM didirikan pada tahun 2010 oleh seorang pengusaha muda bernama Rina Adelia Mustika, yang memiliki hasrat mendalam terhadap dunia kuliner. Sebagai seorang anak yang tumbuh di tengah keluarga yang gemar memasak, Rina sejak kecil sudah mengenal berbagai macam bumbu tradisional yang digunakan dalam masakan rumah tangga. Namun, seiring berjalannya waktu, ia menyadari bahwa banyak bumbu yang diproduksi secara massal tidak memiliki kualitas atau rasa yang memadai.
      </p>
      <p className="mt-4 text-gray-600">
        Dengan tekad untuk membawa cita rasa asli dan berkualitas tinggi, Rina memulai perjalanan RAM dengan misi untuk menawarkan bumbu yang terbuat dari bahan-bahan alami tanpa bahan pengawet atau pewarna buatan. Kami berfokus pada keberlanjutan dan integritas, bekerja sama dengan petani lokal untuk memastikan bahwa bahan baku kami berasal dari sumber yang etis dan berkualitas.
      </p>
      <p className="mt-4 text-gray-600">
        <strong>Komitmen Terhadap Kualitas</strong><br />
        Setiap produk yang kami buat diproses dengan cermat dan penuh perhatian, dimulai dari pemilihan bahan baku terbaik yang telah melewati serangkaian pemeriksaan kualitas ketat. Kami memastikan bahwa setiap rasa yang dihasilkan sesuai dengan standar tinggi yang kami tetapkan, dari bumbu dasar hingga campuran rempah khusus.
      </p>
      <p className="mt-4 text-gray-600">
        <strong>Mengapa RAM?</strong><br />
        Kami memahami bahwa rasa yang otentik adalah hal yang paling penting bagi setiap penggemar kuliner. Itu sebabnya kami tidak pernah berkompromi pada kualitas dan keaslian produk kami. Dengan RAM, Anda tidak hanya membeli bumbu, tetapi juga mengundang sejarah, tradisi, dan cita rasa yang terkandung dalam setiap produk.
      </p>
      <p className="mt-4 text-gray-600">
        Bergabunglah dengan kami dalam menjelajahi dunia rasa dan nikmati keajaiban bumbu yang membawa masakan Anda ke level berikutnya!
      </p>
    </div>
  </div>
</section>


                <section id="clients" className="p-16 text-center bg-gray-100">
                    <h2 className="text-4xl font-bold text-primary">Client Kami</h2>
                    <div className="flex flex-col md:flex-row mt-15 space-y-10 md:space-y-0 items-center md:space-x-10 justify-center">
                        <Image src={`${prefix}/images/payment/bri.png`} alt="BRI" width={120} height={50} />
                        <Image src={`${prefix}/images/payment/bca.png`} alt="BCA" width={120} height={50} />
                        <Image src={`${prefix}/images/payment/mandiri.png`} alt="Mandiri" width={120} height={50} />
                        <Image src={`${prefix}/images/payment/gopay.png`} alt="GoPay" width={120} height={50} />
                        <Image src={`${prefix}/images/payment/dana.png`} alt="Dana" width={120} height={50} />
                        <Image src={`${prefix}/images/payment/shopeepay.png`} alt="ShopeePay" width={120} height={50} />
                    </div>
                    <p className="mt-8 text-gray-600 max-w-3xl mx-auto">
                        Tempat kuliner terhormat ini mempercayakan kami untuk memberikan bahan-bahan berkualitas tinggi dan pengalaman rasa yang luar biasa untuk pelanggan mereka.
                    </p>
                </section>
                <section id="contact" className="p-16 bg-gray-100">
  <h2 className="text-4xl font-bold text-primary text-center">Kontak Kami</h2>
  <div className="mt-8 flex justify-center">
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">Nama</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Masukkan nama Anda"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Masukkan email Anda"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-semibold">Pesan</label>
          <textarea
            id="message"
            name="message"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Tulis pesan Anda"
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Kirim Pesan
          </button>
        </div>
      </form>
    </div>
  </div>
</section>

<footer id="contact" className="bg-primary text-white py-8 text-center">
  <p className="mt-4">Hubungi kami:</p>
  <p>Email: <a href="mailto:info@ram.com" className="underline">info@ram.com</a></p>
  <p>Telp: <a href="tel:+1234567890" className="underline">123-456-7890</a></p>
  <p className="mt-4">
  RAM Company
Jl. Raya No. 123, Komplek Bisnis ABC
Jakarta Selatan, DKI Jakarta
Indonesia
Kode Pos: 12345
  </p>
  <p className="text-lg">&copy; 2025 RAM. All Rights Reserved.</p>
</footer>

            </main>
        </div>
    );
}
