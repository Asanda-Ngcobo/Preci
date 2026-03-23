import { DM_Sans, Geist, Geist_Mono, Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { MenuProvider } from "../providers/MenuProvider";
import Nav from "../_components/_auth_components/AuthNav";
import MeetPreci from "../_components/_auth_components/MeetPreci";
import Footer from "../_components/Footer";




const Primaryfont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const HeadingsFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: `Preci | %s`,
    default: `Preci | Make Informed Financial Decisions`,
  }, 

  description: `Preci AI summarizes and highlight potential financial risks, cancellations & renewals, 
  keydates & deadlines, etc. for your phone, lease, car financing, mortgage, or insurance contracts
  for you to make informed decision and prevent being a slave to some service provider. `,
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

 
      <body
        className={`${Primaryfont.variable} ${HeadingsFont.variable} antialiased`}
      >
        <Toaster position="top-center" 
         reverseOrder={false} />
        <MenuProvider>
          <Nav/>
         {children}
   <MeetPreci/>
     <Footer/>
        </MenuProvider>
       
      </body>
      
    </html>
  );
}
